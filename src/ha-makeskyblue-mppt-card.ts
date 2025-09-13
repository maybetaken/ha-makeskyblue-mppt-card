import { LitElement, html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { SolarManagerCardConfig } from './types';
import './editor';

console.info(`%c HA-MAKESKYBLUE-MPPT-CARD %c v4.5.3-final `, 'color: orange; font-weight: bold; background: black', 'color: white; font-weight: bold; background: dimgray');

const ENTITY_SUFFIX = {
  // Sensors
  faultStatus: 'mppt_fault_status',
  batteryVoltage: 'battery_voltage',
  batteryCurrent: 'battery_current',
  pvVoltage: 'pv_voltage',
  chargePower: 'mppt_charge_power',
  temperature: 'mppt_temperature',
  cumulativeGeneration: 'mppt_cumulative_generation',
  workStatus: 'mppt_work_status',
  // Settings (Numbers and Selects)
  equalizationVoltage: 'mppt_equalization_voltage',
  floatVoltage: 'mppt_float_voltage',
  chargeCurrent: 'mppt_charge_current',
  batteryLowVoltage: 'battery_low_voltage',
  batteryRecoverVoltage: 'battery_recover_voltage',
  batteryType: 'battery_type',
  batteryNumber: 'battery_number',
} as const;

type SettingKey = 
  | 'equalizationVoltage' | 'floatVoltage' | 'chargeCurrent' | 'batteryLowVoltage'
  | 'batteryRecoverVoltage' | 'batteryType' | 'batteryNumber';

interface SettingConfig { key: SettingKey; domain: 'number' | 'select'; label: string; }

@customElement('ha-makeskyblue-mppt-card')
export class HaMakeskyblueMpptCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> { return document.createElement('ha-makeskyblue-mppt-card-editor'); }
  public static getStubConfig(): Record<string, unknown> { return { device: '' }; }
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: SolarManagerCardConfig;
  @state() private _showSettings = false;
  public setConfig(config: SolarManagerCardConfig): void { if (!config || !config.device) throw new Error("Config 'device is required"); this.config = config; }
  public getCardSize(): number { return 10; }
  
  // MODIFIED: This function now automatically prepends the fixed prefix.
  private _getEntity(suffix: string, domain = 'sensor'): HassEntity | undefined {
    const fullDeviceIdentifier = `makeskyblue_mppt_${this.config.device.toLowerCase()}`;
    const entityId = `${domain}.${fullDeviceIdentifier}_${suffix}`;
    return this.hass.states[entityId];
  }
  
  private _getEntityById(entityId: string): HassEntity | undefined { return this.hass.states[entityId]; }
  private _getState(entity: HassEntity | undefined, fallback = '--'): string { return (entity && entity.state !== 'unavailable' && entity.state !== 'unknown') ? entity.state : fallback; }
  private _getUnit(entity: HassEntity | undefined): string { return entity?.attributes.unit_of_measurement || ''; }
  private _callService(domain: string, service: string, data: object): void { this.hass.callService(domain, service, data); }

  protected render(): TemplateResult {
    if (!this.config || !this.hass) return html``;
    const chargePower = this._getEntity(ENTITY_SUFFIX.chargePower);
    if (!chargePower) return html`<ha-card><div class="warning">Entity not found. Check Serial Number. Expected: sensor.makeskyblue_mppt_${this.config.device.toLowerCase()}_${ENTITY_SUFFIX.chargePower}</div></ha-card>`;
    
    const pvVoltage = this._getEntity(ENTITY_SUFFIX.pvVoltage);
    const batteryVoltage = this._getEntity(ENTITY_SUFFIX.batteryVoltage);
    const batteryCurrent = this._getEntity(ENTITY_SUFFIX.batteryCurrent);
    const workStatus = this._getEntity(ENTITY_SUFFIX.workStatus);
    const cumulativeGeneration = this._getEntity(ENTITY_SUFFIX.cumulativeGeneration);
    const temperature = this._getEntity(ENTITY_SUFFIX.temperature);
    const powerSwitch = this.config.power_switch_entity ? this._getEntityById(this.config.power_switch_entity) : undefined;
    const batterySoc = this.config.battery_soc_entity ? this._getEntityById(this.config.battery_soc_entity) : undefined;
    const powerValue = parseFloat(this._getState(chargePower, '0'));
    const gaugeRotation = Math.min(180, (powerValue / 10000) * 180) - 90;

    return html`
      <ha-card>
        <div class="card-content">
          ${this.config.image ? html`<img class="brand-image" src="${this.config.image}" />` : ''}
          <!-- MODIFIED: The default title is now the serial number. -->
          <div class="title">${this.config.name || this.config.device}</div>
          ${this.renderGaugeAndStats(powerValue, gaugeRotation, pvVoltage, batteryVoltage, batteryCurrent)}
          ${this.renderInfoBoxes(workStatus, cumulativeGeneration)}
          ${powerSwitch ? this.renderSwitchRow(powerSwitch) : ''}
          ${batterySoc ? this.renderBatterySOCRow(batterySoc) : ''}
          ${this.renderTempBar(temperature)}
        </div>
        <div class="card-actions">
          <mwc-button @click=${() => this._showSettings = !this._showSettings}>
            ${this._showSettings ? 'Hide Settings' : 'Show Settings'}
          </mwc-button>
        </div>
        ${this._showSettings ? this.renderSettingsPanel() : ''}
      </ha-card>
    `;
  }
  
  // All the rest of the file (render helpers, settings panel, styles) is completely unchanged.
  private renderGaugeAndStats(powerValue: number, gaugeRotation: number, pvVoltage?: HassEntity, batteryVoltage?: HassEntity, batteryCurrent?: HassEntity): TemplateResult { /* UNCHANGED */
    const labels = [ { value: '0', angle: -90 }, { value: '2500', angle: -45 }, { value: '5000', angle: 0 }, { value: '7500', angle: 45 }, { value: '10000', angle: 90 }, ];
    return html`
      <div class="gauge-wrapper">
        <div class="gauge-container">
          <div class="gauge-background"></div>
          <div class="gauge-ticks">
            ${Array.from({ length: 41 }, (_, i) => {
              const angle = -90 + i * 4.5;
              const isMajorTick = i % 5 === 0;
              return html`<div class="gauge-tick ${isMajorTick ? 'major' : ''}" style="transform: rotate(${angle}deg);"></div>`;
            })}
          </div>
          <div class="gauge-labels">
            ${labels.map(label => html` <div class="gauge-label-wrapper" style="transform: rotate(${label.angle}deg);"> <span class="gauge-label-text" style="transform: rotate(${-label.angle}deg);">${label.value}</span> </div> `)}
          </div>
          <div class="gauge-power-bar" style="transform: rotate(${gaugeRotation}deg);"></div>
        </div>
        <div class="gauge-value-text">${powerValue.toFixed(1)}<span class="unit">W</span></div>
      </div>
      <div class="stats-grid">
        <div class="stat"><ha-icon icon="mdi:solar-power"></ha-icon><div class="label">光伏输入电压</div><div class="value">${this._getState(pvVoltage)}<span class="unit">${this._getUnit(pvVoltage)}</span></div></div>
        <div class="stat"><ha-icon icon="mdi:battery-charging"></ha-icon><div class="label">电池充电电压</div><div class="value">${this._getState(batteryVoltage)}<span class="unit">${this._getUnit(batteryVoltage)}</span></div></div>
        <div class="stat"><ha-icon icon="mdi:current-dc"></ha-icon><div class="label">电池充电电流</div><div class="value">${this._getState(batteryCurrent)}<span class="unit">${this._getUnit(batteryCurrent)}</span></div></div>
      </div>
    `;
  }
  private renderInfoBoxes(workStatus?: HassEntity, cumulativeGeneration?: HassEntity): TemplateResult { /* UNCHANGED */
    return html`
      <div class="info-grid">
        <div class="info-box blue"><ha-icon icon="mdi:cog-transfer"></ha-icon><div class="label">充电模式</div><div class="value">${this._getState(workStatus)}</div></div>
        <div class="info-box blue"><ha-icon icon="mdi:chart-line"></ha-icon><div class="label">累计发电量</div><div class="value">${this._getState(cumulativeGeneration)}<span class="unit">${this._getUnit(cumulativeGeneration)}</span></div></div>
      </div>
    `;
  }
  private renderSwitchRow(powerSwitch: HassEntity): TemplateResult { /* UNCHANGED */
    return html`<div class="row"><ha-icon icon="mdi:power-standby"></ha-icon><div class="label">电源开关</div><ha-switch .checked=${this._getState(powerSwitch) === 'on'} @click=${() => this._callService('switch', 'toggle', { entity_id: powerSwitch.entity_id })}></ha-switch></div>`;
  }
  private renderBatterySOCRow(batterySoc: HassEntity): TemplateResult { /* UNCHANGED */
    return html`<div class="row"><ha-icon icon="mdi:battery"></ha-icon><div class="label">电池电量</div><div class="value">${this._getState(batterySoc)}<span class="unit">${this._getUnit(batterySoc)}</span></div></div>`;
  }
  private renderTempBar(temperature?: HassEntity): TemplateResult { /* UNCHANGED */
    return html`<div class="temp-bar"><ha-icon icon="mdi:thermometer"></ha-icon><div class="label">当前温度</div><div class="value">${this._getState(temperature)}<span class="unit">${this._getUnit(temperature)}</span></div></div>`;
  }
  private renderSettingsPanel(): TemplateResult { /* UNCHANGED */
    const settings: SettingConfig[] = [
      { key: 'equalizationVoltage', domain: 'number', label: '均充电压' }, { key: 'floatVoltage', domain: 'number', label: '浮充电压' },
      { key: 'chargeCurrent', domain: 'number', label: '最大充电电流' }, { key: 'batteryLowVoltage', domain: 'number', label: '电池低压' },
      { key: 'batteryRecoverVoltage', domain: 'number', label: '电池恢复电压' }, { key: 'batteryType', domain: 'select', label: '电池类型' },
      { key: 'batteryNumber', domain: 'number', label: '电池串数' },
    ];
    return html`
      <div class="settings-area">
        ${settings.map(s => {
          const entity = this._getEntity(ENTITY_SUFFIX[s.key], s.domain);
          if (!entity) return '';
          if (s.domain === 'number') {
            if (s.key === 'batteryNumber') { return this.renderSliderSetting(entity, s.label); }
            return this.renderNumberSetting(entity, s.label);
          }
          if (s.domain === 'select') { return this.renderSelectSetting(entity, s.label); }
          return '';
        })}
      </div>
    `;
  }
  private renderNumberSetting(entity: HassEntity, label: string): TemplateResult { /* UNCHANGED */
    return html` <div class="setting-row"> <label>${label}</label> <ha-textfield type="number" .value=${entity.state} .min=${entity.attributes.min} .max=${entity.attributes.max} .step=${entity.attributes.step} suffix=${this._getUnit(entity)} @change=${(e: Event) => this._callService('number', 'set_value', { entity_id: entity.entity_id, value: (e.target as HTMLInputElement).value })}></ha-textfield> </div> `;
  }
  private renderSliderSetting(entity: HassEntity, label: string): TemplateResult { /* UNCHANGED */
    return html` <div class="setting-row slider"> <label>${label}</label> <div class="slider-container"> <ha-slider min=${entity.attributes.min} max=${entity.attributes.max} step=${entity.attributes.step} .value=${entity.state} pin @change=${(e: Event) => this._callService('number', 'set_value', { entity_id: entity.entity_id, value: (e.target as HTMLInputElement).value })}></ha-slider> <span>${entity.state}</span> </div> </div> `;
  }
  private renderSelectSetting(entity: HassEntity, label: string): TemplateResult { /* UNCHANGED */
    return html` <div class="setting-row"> <label>${label}</label> <ha-select .value=${entity.state} @selected=${(e: Event) => { const selectedValue = (e.target as HTMLSelectElement).value; this._callService('select', 'select_option', { entity_id: entity.entity_id, option: selectedValue }); }}> ${entity.attributes.options.map((opt: string) => html`<mwc-list-item .value=${opt}>${opt}</mwc-list-item>`)} </ha-select> </div> `;
  }
  static get styles(): CSSResultGroup {
    return css`
      /* UNCHANGED STYLES */
      ha-card { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
      .card-content { padding: 16px; display: flex; flex-direction: column; align-items: center; gap: 16px; }
      .warning { padding: 16px; color: var(--error-color); }
      .brand-image { max-width: 150px; max-height: 40px; }
      .title { font-size: 1.2em; font-weight: 500; color: var(--primary-text-color); }
      
      /* REFINED GAUGE STYLES */
      .gauge-wrapper { display: flex; flex-direction: column; align-items: center; margin-bottom: 24px; }
      .gauge-container { position: relative; width: 100%; max-width: 300px; height: 150px; }
      .gauge-background { position: absolute; width: 240px; height: 120px; bottom: 0; left: 50%; transform: translateX(-50%); border-top-left-radius: 120px; border-top-right-radius: 120px; background: #f0f3f5; }
      .gauge-ticks, .gauge-labels { position: absolute; width: 240px; height: 120px; bottom: 0; left: 50%; transform: translateX(-50%); }
      .gauge-tick { position: absolute; bottom: 0; left: 50%; width: 1px; height: 120px; transform-origin: bottom center; }
      .gauge-tick::after { content: ''; position: absolute; top: 0; left: 0px; width: 2px; height: 8px; background: #d0d0d0; }
      .gauge-tick.major::after { height: 12px; background: #a0a0a0; }
      .gauge-label-wrapper { position: absolute; width: 1px; height: 145px; bottom: 0; left: 50%; transform-origin: bottom center; }
      .gauge-label-text { position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); font-size: 0.9em; color: var(--secondary-text-color); }

      .gauge-power-bar {
        position: absolute;
        bottom: 12.5px;
        left: 50%;
        width: 6px; 
        height: 75px;
        margin-left: -3px; 
        background-color: #f44336;
        border-radius: 3px;
        transform-origin: bottom center;
        transition: transform 0.5s ease-in-out;
      }

      /* DELETED: The .gauge-pivot css block was here */
      
      .gauge-value-text {
        margin-top: 20px;
        font-size: 2.2em;
        font-weight: bold;
        color: #4CAF50;
        text-align: center;
      }
      .gauge-value-text .unit { font-size: 0.5em; font-weight: normal; color: var(--secondary-text-color); margin-left: 4px; }
      
      .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: 100%; text-align: center; }
      .stat ha-icon { color: var(--state-icon-color); margin-bottom: 4px; }
      .stat .label { font-size: 0.8em; color: var(--secondary-text-color); }
      .stat .value { font-size: 1.5em; font-weight: 500; color: var(--primary-text-color); }
      .stat .value .unit { font-size: 0.6em; }
      
      /* UNCHANGED STYLES */
      .info-grid { display: grid; gap: 8px; width: 100%; grid-template-columns: repeat(2, 1fr); }
      .info-box { background-color: #03a9f4; color: white; border-radius: 12px; padding: 12px; text-align: center; }
      .info-box .label { font-size: 0.9em; opacity: 0.8; }
      .info-box .value { font-size: 1.2em; font-weight: bold; }
      .info-box .value .unit { font-size: 0.7em; }
      .row, .temp-bar { display: flex; align-items: center; width: 100%; padding: 12px; box-sizing: border-box; border-radius: 12px; }
      .row { background: var(--card-background-color); border: 1px solid var(--divider-color); }
      .temp-bar { background-color: #f5f5dc; color: #333; }
      .row .label, .temp-bar .label { flex-grow: 1; margin-left: 12px; font-weight: 500; }
      .row .value, .temp-bar .value { font-size: 1.1em; font-weight: bold; }
      .row .value .unit { font-size: 0.8em; color: var(--secondary-text-color); }
      .settings-area { padding: 0 16px 16px; border-top: 1px solid var(--divider-color); margin-top: 8px; }
      .setting-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
      .setting-row label { flex: 1; }
      .setting-row ha-textfield, .setting-row ha-select { flex: 1; max-width: 150px; }
      .setting-row.slider { flex-direction: column; align-items: stretch; }
      .slider-container { display: flex; align-items: center; gap: 16px; }
      .slider-container ha-slider { flex-grow: 1; }
    `;
  }
}
