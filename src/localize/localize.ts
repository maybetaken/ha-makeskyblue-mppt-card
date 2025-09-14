import { HomeAssistant } from 'custom-card-helpers';
import * as en from './languages/en.json';
import * as zh_Hans from './languages/zh-Hans.json';

// Define a more specific type for our language packs
type LanguagePack = { [key: string]: any };

const languages: Record<string, LanguagePack> = {
  en: en,
  'zh-Hans': zh_Hans,
};

const DEFAULT_LANG = 'en';

function getTranslatedString(key: string, langPack: LanguagePack): string | undefined {
  const keys = key.split('.');
  let result: any = langPack;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return undefined;
    }
  }
  return typeof result === 'string' ? result : undefined;
}

export function localize(hass: HomeAssistant, key: string): string {
  const lang = hass.locale?.language || DEFAULT_LANG;
  const langPack = languages[lang] || languages[DEFAULT_LANG];
  
  let translated = getTranslatedString(key, langPack);
  if (translated === undefined && lang !== DEFAULT_LANG) {
    translated = getTranslatedString(key, languages[DEFAULT_LANG]);
  }
  
  return translated || key;
}
