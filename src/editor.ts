import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';
import { SolarManagerCardConfig } from './types';

@customElement('ha-makeskyblue-mppt-card-editor')
export class SolarManagerCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: SolarManagerCardConfig;

  public setConfig(config: SolarManagerCardConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <ha-textfield
          label="Device (Required)"
          .value=${this._config.device || ''}
          .configValue=${'device'}
          @input=${this._valueChanged}
          helper="The unique part of your entity IDs (e.g., makeskyblue_mppt_md1230)"
          required
        ></ha-textfield>
        <ha-textfield
          label="Name (Optional)"
          .value=${this._config.name || ''}
          .configValue=${'name'}
          @input=${this._valueChanged}
          helper="The title of the card"
        ></ha-textfield>
      </div>
    `;
  }

  private _valueChanged(ev: Event): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target as HTMLInputElement & { configValue: keyof SolarManagerCardConfig };
    const configValue = target.configValue;

    if (this._config[configValue] === target.value) {
      return;
    }

    const newConfig = { ...this._config };
    if (target.value === '') {
      delete newConfig[configValue];
    } else {
      newConfig[configValue] = target.value;
    }
    
    fireEvent(this, 'config-changed', { config: newConfig });
  }
}
