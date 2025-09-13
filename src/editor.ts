import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';
import { SolarManagerCardConfig } from './types';

@customElement('ha-makeskyblue-mppt-card-editor')
export class SolarManagerCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: SolarManagerCardConfig;

  public setConfig(config: SolarManagerCardConfig): void { this._config = config; }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;
    return html`
      <div class="card-config">
        <ha-textfield 
          label="Device Serial Number (Required)" 
          .value=${this._config.device || ''} 
          .configValue=${'device'} 
          @input=${this._valueChanged} 
          helper="The unique serial number part, e.g., m7g6fmpw3" 
          required
        ></ha-textfield>
        <ha-textfield label="Name (Optional)" .value=${this._config.name || ''} .configValue=${'name'} @input=${this._valueChanged} helper="The title of the card"></ha-textfield>
        <ha-textfield label="Brand Image URL (Optional)" .value=${this._config.image || ''} .configValue=${'image'} @input=${this._valueChanged} helper="e.g., /local/makeskyblue-logo.png"></ha-textfield>
        <ha-textfield label="Power Switch Entity (Optional)" .value=${this._config.power_switch_entity || ''} .configValue=${'power_switch_entity'} @input=${this._valueChanged} helper="e.g., switch.your_mppt_power"></ha-textfield>
        <ha-textfield label="Battery SoC Entity (Optional)" .value=${this._config.battery_soc_entity || ''} .configValue=${'battery_soc_entity'} @input=${this._valueChanged} helper="e.g., sensor.your_battery_soc"></ha-textfield>
      </div>
    `;
  }

  private _valueChanged(ev: Event): void {
    if (!this._config || !this.hass) return;
    const target = ev.target as HTMLInputElement & { configValue: keyof SolarManagerCardConfig };
    const configValue = target.configValue;
    if (this._config[configValue] === target.value) return;
    const newConfig = { ...this._config };
    if (target.value === '') { delete newConfig[configValue]; } 
    else { newConfig[configValue] = target.value as string; }
    fireEvent(this, 'config-changed', { config: newConfig });
  }
}
