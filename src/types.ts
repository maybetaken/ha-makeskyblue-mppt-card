import { LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'ha-makeskyblue-mppt-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

export interface SolarManagerCardConfig extends LovelaceCardConfig {
  type: string;
  device: string;
  name?: string;
  image?: string;
  power_switch_entity?: string;
  battery_soc_entity?: string;
}
