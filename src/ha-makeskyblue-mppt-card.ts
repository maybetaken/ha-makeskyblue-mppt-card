import { LitElement, html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { SolarManagerCardConfig } from './types';
import './editor';

console.info(
  `%c HA-MAKESKYBLUE-MPPT-CARD %c v2.0.1 `, // Version bump for the fix
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

const ENTITY_SUFFIX = {
  faultStatus: 'mppt_fault_status',
  batteryVoltage: 'battery_voltage',
  batteryCurrent: 'battery_current',
  pvVoltage: 'pv_voltage',
  chargePower: 'charge_power',
  temperature: 'mppt_temperature',
  dailyGeneration: 'mppt_daily_generation',
  workStatus: 'mppt_work_status',
  batteryType: 'battery_type',
  batteryNumber: 'battery_number',
  chargeCurrent: 'mppt_charge_current',
};

@customElement('ha-makeskyblue-mppt-card')
export class HaMakeskyblueMpptCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('ha-makeskyblue-mppt-card-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return { device: '' };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: SolarManagerCardConfig;
  @state() private _showSettings = false;

  public setConfig(config: SolarManagerCardConfig): void {
    if (!config || !config.device) {
      throw new Error("Invalid configuration: 'device' is a required option.");
    }
    this.config = config;
  }

  public getCardSize(): number {
    return this._showSettings ? 7 : 5;
  }

  private _getEntity(domain: string, suffix: string): HassEntity | undefined {
    const entityId = `${domain}.${this.config.device}_${suffix}`;
    return this.hass.states[entityId];
  }

  private _getEntityState(entity: HassEntity | undefined, fallback: string | number = 'N/A'): string | number {
    return entity ? entity.state : fallback;
  }

  private _getUnit(entity: HassEntity | undefined): string {
    return entity?.attributes.unit_of_measurement || '';
  }

  private _callService(domain: string, service: string, serviceData: object): void {
    this.hass.callService(domain, service, serviceData);
  }

  protected render(): TemplateResult {
    if (!this.config || !this.hass) {
      return html``;
    }

    const pvVoltage = this._getEntity('sensor', ENTITY_SUFFIX.pvVoltage);
    if (!pvVoltage) {
      return html`<ha-card><div class="warning">Entity not found: sensor.${this.config.device}_${ENTITY_SUFFIX.pvVoltage}</div></ha-card>`;
    }

    const chargePower = this._getEntity('sensor', ENTITY_SUFFIX.chargePower);
    const workStatus = this._getEntity('sensor', ENTITY_SUFFIX.workStatus);
    const faultStatus = this._getEntity('sensor', ENTITY_SUFFIX.faultStatus);
    const dailyGeneration = this._getEntity('sensor', ENTITY_SUFFIX.dailyGeneration);
    const batteryVoltage = this._getEntity('sensor', ENTITY_SUFFIX.batteryVoltage);
    const batteryCurrent = this._getEntity('sensor', ENTITY_SUFFIX.batteryCurrent);
    const temperature = this._getEntity('sensor', ENTITY_SUFFIX.temperature);
    const isFault = this._getEntityState(faultStatus) !== 'normal_status';
    
    return html`
      <ha-card .header=${this.config.name || 'Makeskyblue MPPT'}>
        <div class="card-content">
          <div class="hero-section">
            <div class="main-icon"><ha-icon icon="mdi:solar-power-variant"></ha-icon></div>
            <div class="main-value">
              ${this._getEntityState(chargePower, 0)}<span class="unit">${this._getUnit(chargePower)}</span>
            </div>
            <div class="main-status">
              ${isFault 
                ? html`<span class="fault">${this._getEntityState(faultStatus, 'Fault')}</span>`
                : html`<span>${this._getEntityState(workStatus, 'Unknown')}</span>`
              }
            </div>
          </div>
          <div class="data-grid">
            <div class="data-section">
              <div class="section-header"><ha-icon icon="mdi:solar-panel"></ha-icon><span>Photovoltaic</span></div>
              <div class="data-row"><span>Voltage</span><span>${this._getEntityState(pvVoltage, 0)} ${this._getUnit(pvVoltage)}</span></div>
              <div class="data-row"><span>Daily Yield</span><span>${this._getEntityState(dailyGeneration, 0)} ${this._getUnit(dailyGeneration)}</span></div>
            </div>
            <div class="data-section">
              <div class="section-header"><ha-icon icon="mdi:battery-charging"></ha-icon><span>Battery</span></div>
              <div class="data-row"><span>Voltage</span><span>${this._getEntityState(batteryVoltage, 0)} ${this._getUnit(batteryVoltage)}</span></div>
              <div class="data-row"><span>Current</span><span>${this._getEntityState(batteryCurrent, 0)} ${this._getUnit(batteryCurrent)}</span></div>
              <div class="data-row"><span>Temperature</span><span>${this._getEntityState(temperature, 0)} ${this._getUnit(temperature)}</span></div>
            </div>
          </div>
        </div>
        <div class="card-actions">
          <mwc-button @click=${() => (this._showSettings = !this._showSettings)}> Settings </mwc-button>
        </div>
        ${this._showSettings ? this._renderSettings() : ''}
      </ha-card>
    `;
  }

  // ====================================================================================
  // FULLY IMPLEMENTED _renderSettings method to fix the error
  // ====================================================================================
  private _renderSettings(): TemplateResult {
    const batteryType = this._getEntity('select', ENTITY_SUFFIX.batteryType);
    const batteryNumber = this._getEntity('number', ENTITY_SUFFIX.batteryNumber);
    const chargeCurrent = this._getEntity('number', ENTITY_SUFFIX.chargeCurrent);

    return html`
      <div class="settings-content">
        ${batteryType
          ? html`
              <ha-select
                label="Battery Type"
                .value=${batteryType.state}
                @selected=${(ev: Event) => {
                  const select = ev.target as HTMLSelectElement;
                  this._callService('select', 'select_option', {
                    entity_id: batteryType.entity_id,
                    option: select.value,
                  });
                }}
              >
                ${batteryType.attributes.options.map(
                  (option: string) => html`<mwc-list-item .value=${option}>${option}</mwc-list-item>`,
                )}
              </ha-select>
            `
          : ''}
        ${batteryNumber
          ? html`
              <div class="setting-row slider">
                <label for="battnum">Battery Number</label>
                <div class="slider-container">
                  <ha-slider
                    id="battnum"
                    min=${batteryNumber.attributes.min}
                    max=${batteryNumber.attributes.max}
                    step=${batteryNumber.attributes.step}
                    .value=${batteryNumber.state}
                    pin
                    @change=${(ev: Event) =>
                      this._callService('number', 'set_value', {
                        entity_id: batteryNumber.entity_id,
                        value: (ev.target as HTMLInputElement).value,
                      })}
                  ></ha-slider>
                  <span class="slider-value">${batteryNumber.state}</span>
                </div>
              </div>
            `
          : ''}
        ${chargeCurrent
          ? html`
              <div class="setting-row">
                <span>Charge Current (${this._getUnit(chargeCurrent)})</span>
                <ha-textfield
                  type="number"
                  .value=${chargeCurrent.state}
                  .min=${chargeCurrent.attributes.min}
                  .max=${chargeCurrent.attributes.max}
                  .step=${chargeCurrent.attributes.step}
                  @change=${(ev: Event) => {
                    const input = ev.target as HTMLInputElement;
                    this._callService('number', 'set_value', {
                      entity_id: chargeCurrent.entity_id,
                      value: input.value,
                    });
                  }}
                ></ha-textfield>
              </div>
            `
          : ''}
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .warning { padding: 16px; color: var(--error-color); }
      .hero-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid var(--divider-color);
        margin-bottom: 16px;
      }
      .main-icon ha-icon { width: 48px; height: 48px; color: var(--paper-item-icon-color, #44739e); }
      .main-value { font-size: 3em; font-weight: 300; line-height: 1; margin-top: 8px; }
      .main-value .unit { font-size: 0.5em; font-weight: 400; color: var(--secondary-text-color); }
      .main-status { margin-top: 8px; font-size: 1.1em; color: var(--secondary-text-color); }
      .main-status .fault { color: var(--error-color); font-weight: bold; }
      .data-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      .section-header { display: flex; align-items: center; font-size: 1.2em; margin-bottom: 8px; border-bottom: 1px solid var(--divider-color); padding-bottom: 4px; }
      .section-header ha-icon { margin-right: 8px; color: var(--secondary-text-color); }
      .data-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 1em; }
      .data-row span:first-child { color: var(--secondary-text-color); }
      .data-row span:last-child { font-weight: bold; }
      .settings-content { padding: 0 16px 16px; }
      .setting-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
      ha-select, ha-textfield { width: 100%; margin: 8px 0; }
      .setting-row.slider { display: flex; flex-direction: column; padding: 8px 0; }
      .setting-row.slider label { margin-bottom: 8px; color: var(--primary-text-color); }
      .slider-container { display: flex; align-items: center; width: 100%; }
      ha-slider { flex-grow: 1; }
      .slider-value { margin-left: 16px; min-width: 2em; text-align: right; }
    `;
  }
}
