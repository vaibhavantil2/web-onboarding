import { Locale as IsoLocale } from 'data/graphql'
import {
  ssnLengths,
  ssnFormats,
  birthDateFormats,
} from './birthDateAndSsnFormats'

export const LOCALE_URL_PARAMS = [
  'se',
  'se-en',
  'no',
  'no-en',
  'dk',
  'dk-en',
] as const
export type LocaleUrlParams = typeof LOCALE_URL_PARAMS
export type LocaleLabel = LocaleUrlParams[number]

export type LocaleData = {
  path: LocaleLabel
  isoLocale: IsoLocale
  marketLabel: MarketLabel
  htmlLang: 'en' | 'sv' | 'no' | 'da'
  adtractionScriptSrc?: string
  ssn: {
    length: number
    formatExample: string
    formatRegex: RegExp
  }
  birthDate: {
    formatExample: string
    formatRegex: RegExp
    backendFormatExample: string
  }
}

export type MarketLabel = 'SE' | 'NO' | 'DK'

export const locales: Record<LocaleLabel, LocaleData> = {
  se: {
    path: 'se',
    isoLocale: IsoLocale.SvSe,
    marketLabel: 'SE',
    htmlLang: 'sv',
    adtractionScriptSrc: 'https://cdn.adt387.com/jsTag?ap=1412531808',
    ssn: {
      length: ssnLengths.SE,
      formatExample: 'ÅÅÅÅMMDDXXXX',
      formatRegex: ssnFormats.SE,
    },
    birthDate: {
      formatExample: 'ÅÅÅÅ-MM-DD',
      formatRegex: birthDateFormats.SE,
      backendFormatExample: 'ÅÅÅÅ-MM-DD',
    },
  },
  'se-en': {
    path: 'se-en',
    isoLocale: IsoLocale.EnSe,
    marketLabel: 'SE',
    htmlLang: 'en',
    adtractionScriptSrc: 'https://cdn.adt387.com/jsTag?ap=1412531808',
    ssn: {
      length: ssnLengths.SE,
      formatExample: 'YYYYMMDDXXXX',
      formatRegex: ssnFormats.SE,
    },
    birthDate: {
      formatExample: 'YYYY-MM-DD',
      formatRegex: birthDateFormats.SE,
      backendFormatExample: 'YYYY-MM-DD',
    },
  },
  no: {
    path: 'no',
    isoLocale: IsoLocale.NbNo,
    marketLabel: 'NO',
    htmlLang: 'no',
    adtractionScriptSrc: 'https://cdn.adt387.com/jsTag?ap=1492109567',
    ssn: {
      length: ssnLengths.NO,
      formatExample: 'DDMMÅÅXXXXX',
      formatRegex: ssnFormats.NO,
    },
    birthDate: {
      formatExample: 'DD-MM-ÅÅÅÅ',
      formatRegex: birthDateFormats.NO,
      backendFormatExample: 'ÅÅÅÅ-MM-DD',
    },
  },
  'no-en': {
    path: 'no-en',
    isoLocale: IsoLocale.EnNo,
    marketLabel: 'NO',
    htmlLang: 'en',
    adtractionScriptSrc: 'https://cdn.adt387.com/jsTag?ap=1492109567',
    ssn: {
      length: ssnLengths.NO,
      formatExample: 'DDMMYYXXXXX',
      formatRegex: ssnFormats.NO,
    },
    birthDate: {
      formatExample: 'DD-MM-YYYY',
      formatRegex: birthDateFormats.NO,
      backendFormatExample: 'YYYY-MM-DD',
    },
  },
  dk: {
    path: 'dk',
    isoLocale: IsoLocale.DaDk,
    marketLabel: 'DK',
    htmlLang: 'da',
    adtractionScriptSrc: 'https://cdn.adt387.com/jsTag?ap=1589794294',
    ssn: {
      length: ssnLengths.DK,
      formatExample: 'DDMMÅÅSSSS',
      formatRegex: ssnFormats.DK,
    },
    birthDate: {
      formatExample: 'DD-MM-ÅÅÅÅ',
      formatRegex: birthDateFormats.DK,
      backendFormatExample: 'ÅÅÅÅ-MM-DD',
    },
  },
  'dk-en': {
    path: 'dk-en',
    isoLocale: IsoLocale.EnDk,
    marketLabel: 'DK',
    htmlLang: 'en',
    adtractionScriptSrc: 'https://cdn.adt387.com/jsTag?ap=1589794294',
    ssn: {
      length: ssnLengths.DK,
      formatExample: 'DDMMYYSSSS',
      formatRegex: ssnFormats.DK,
    },
    birthDate: {
      formatExample: 'DD-MM-YYYY',
      formatRegex: birthDateFormats.DK,
      backendFormatExample: 'YYYY-MM-DD',
    },
  },
}
