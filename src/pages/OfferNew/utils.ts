import {
  Campaign,
  CompleteApartmentQuoteDetails,
  CompleteHouseQuoteDetails,
  CompleteQuote,
  CompleteQuoteDetails,
  InsuranceType,
  Quote,
} from '../../generated/graphql'
import { CompleteOfferData, OfferData } from './types'

export const isOffer = (offer?: OfferData): offer is CompleteOfferData =>
  (offer && isQuote(offer.quote)) || false

export const isQuote = (quote: Quote): quote is CompleteQuote =>
  quote.__typename === 'CompleteQuote' || false

export const isApartment = (
  details: CompleteQuoteDetails,
): details is CompleteApartmentQuoteDetails =>
  details.__typename === 'CompleteApartmentQuoteDetails' || false

export const isHouse = (
  details: CompleteQuoteDetails,
): details is CompleteHouseQuoteDetails =>
  details.__typename === 'CompleteHouseQuoteDetails' || false

export const isFreeMonths = (campaigns: Campaign[]) =>
  (campaigns.length > 0 &&
    campaigns[0].incentive &&
    campaigns[0].incentive.__typename === 'FreeMonths') ||
  false

export const isMonthlyCostDeduction = (campaigns: Campaign[]) =>
  (campaigns.length > 0 &&
    campaigns[0].incentive &&
    campaigns[0].incentive.__typename === 'MonthlyCostDeduction') ||
  false

export const isNoDiscount = (campaigns: Campaign[]) =>
  (campaigns.length > 0 &&
    campaigns[0].incentive &&
    campaigns[0].incentive.__typename === 'NoDiscount') ||
  false

export const getInsuranceType = (quote: CompleteQuote): InsuranceType => {
  if (isHouse(quote.details)) {
    return InsuranceType.House
  }

  switch (quote.details.type) {
    case 'RENT':
      return InsuranceType.Rent
    case 'BRF':
      return InsuranceType.Brf
    case 'STUDENT_RENT':
      return InsuranceType.StudentRent
    case 'STUDENT_BRF':
      return InsuranceType.StudentBrf
    default:
      return InsuranceType.Rent
  }
}

export const getPrebuyPDFTextKey = (insuranceType: InsuranceType): string => {
  const map = {
    [InsuranceType.Rent]: 'TERMS_PDF_PREBUY_RENT_URL',
    [InsuranceType.Brf]: 'TERMS_PDF_PREBUY_BRF_URL',
    [InsuranceType.StudentRent]: 'TERMS_PDF_PREBUY_STUDENT_RENT_URL',
    [InsuranceType.StudentBrf]: 'TERMS_PDF_PREBUY_STUDENT_BRF_URL',
    [InsuranceType.House]: 'TERMS_PDF_PREBUY_HOUSE_URL',
  }

  if (!map[insuranceType]) {
    throw new Error(`Invalid insurance type ${insuranceType}`)
  }
  return map[insuranceType]
}

export const getInsurancePDFTextKey = (
  insuranceType: InsuranceType,
): string => {
  const map = {
    [InsuranceType.Rent]: 'TERMS_PDF_INSURANCE_RENT_URL',
    [InsuranceType.Brf]: 'TERMS_PDF_INSURANCE_BRF_URL',
    [InsuranceType.StudentRent]: 'TERMS_PDF_INSURANCE_STUDENT_RENT_URL',
    [InsuranceType.StudentBrf]: 'TERMS_PDF_INSURANCE_STUDENT_BRF_URL',
    [InsuranceType.House]: 'TERMS_PDF_INSURANCE_HOUSE_URL',
  }

  if (!map[insuranceType]) {
    throw new Error(`Invalid insurance type ${insuranceType}`)
  }
  return map[insuranceType]
}
