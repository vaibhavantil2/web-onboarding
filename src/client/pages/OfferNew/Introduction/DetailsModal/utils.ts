import * as Yup from 'yup'
import { FetchResult } from '@apollo/client'
import { inputTypes, masks, Mask } from 'components/inputs'
import {
  ApartmentType,
  EditQuoteInput,
  ExtraBuildingType,
  NorwegianHomeContentsType,
  NorwegianTravelDetails,
  SwedishApartmentQuoteDetails,
  SwedishHouseQuoteDetails,
  DanishHomeContentsType,
  QuoteDetails,
  EditQuoteMutation,
  ExtraBuildingInput,
  NorwegianHomeContentsDetails,
  DanishHomeContentsDetails,
  EditDanishAccidentInput,
  EditNorwegianTravelInput,
} from 'data/graphql'
import { OfferQuote, OfferData, OfferPersonInfo } from 'pages/OfferNew/types'
import { LocaleData } from 'l10n/locales'
import { birthDateFormats } from 'l10n/birthDateAndSsnFormats'
import {
  isStudent,
  isSwedishQuote,
  isSwedishApartment,
  isSwedishHouse,
  isNorwegianQuote,
  isNorwegianHomeContents,
  isNorwegianTravel,
  isDanishQuote,
  isDanishHomeContents,
  isDanishTravel,
  isDanishAccident,
  isBundle,
} from '../../utils'
import {
  SwedishApartmentFieldSchema,
  ArrayFieldType,
  FieldSchema,
  FieldType,
  SwedishHouseFieldSchema,
  NorwegianHomeContentFieldSchema,
  NorwegianTravelContentFieldSchema,
  RegularFieldType,
  DanishHomeContentFieldSchema,
  DetailsFieldSchema,
  CommonFieldSchema,
  MarketFields,
} from './types'

export const isDanishHomeContentFieldSchema = (
  fieldSchema: DetailsFieldSchema,
  quote: OfferQuote,
): fieldSchema is DanishHomeContentFieldSchema => {
  return (
    'danishHomeContents' in fieldSchema &&
    isDanishHomeContents(quote.quoteDetails)
  )
}

export const isNorwegianHomeContentFieldSchema = (
  fieldSchema: DetailsFieldSchema,
  quote: OfferQuote,
): fieldSchema is NorwegianHomeContentFieldSchema => {
  return (
    'norwegianHomeContents' in fieldSchema &&
    isNorwegianHomeContents(quote.quoteDetails)
  )
}
export const isNorwegianTravelFieldSchema = (
  fieldSchema: DetailsFieldSchema,
  quote: OfferQuote,
): fieldSchema is NorwegianTravelContentFieldSchema => {
  return (
    'norwegianTravel' in fieldSchema && isNorwegianTravel(quote.quoteDetails)
  )
}

export const isSwedishApartmentFieldSchema = (
  fieldSchema: DetailsFieldSchema,
  quote: OfferQuote,
): fieldSchema is SwedishApartmentFieldSchema => {
  return (
    'swedishApartment' in fieldSchema && isSwedishApartment(quote.quoteDetails)
  )
}

export const isSwedishHouseFieldSchema = (
  fieldSchema: DetailsFieldSchema,
  quote: OfferQuote,
): fieldSchema is SwedishHouseFieldSchema => {
  return 'swedishHouse' in fieldSchema && isSwedishHouse(quote.quoteDetails)
}

type BaseFieldSchema = {
  street: {
    label: string
    placeholder: string
    validation: Yup.StringSchema
  }
  zipCode: {
    label: string
    placeholder: string
    mask: Mask
    type: string
    validation: Yup.StringSchema
  }
}

const getSwedishSchema = (
  base: BaseFieldSchema,
  offerQuote: OfferQuote,
): DetailsFieldSchema => {
  const swedishBase = {
    ...base,
    householdSize: {
      label: 'DETAILS_MODULE_TABLE_HOUSEHOLD_SIZE_CELL_LABEL',
      placeholder: '',
      type: inputTypes.number,
      validation: Yup.number().required(),
    },
  }
  return isSwedishApartment(offerQuote.quoteDetails)
    ? {
        swedishApartment: {
          ...swedishBase,
          livingSpace: {
            label: 'DETAILS_MODULE_TABLE_SIZE_CELL_LABEL_APARTMENT',
            placeholder: '',
            mask: masks.area,
            type: inputTypes.number,
            validation: Yup.number()
              .min(1)
              .required(),
          },
          type: {
            label: 'DETAILS_MODULE_TABLE_RESIDENCE_TYPE_CELL_LABEL',
            placeholder: '',
            options: [
              ...(isStudent(offerQuote.quoteDetails)
                ? [
                    {
                      label: 'SIDEBAR_INSURANCE_TYPE_BRF',
                      value: ApartmentType.StudentBrf,
                    },
                    {
                      label: 'SIDEBAR_INSURANCE_TYPE_RENT',
                      value: ApartmentType.StudentRent,
                    },
                  ]
                : [
                    {
                      label: 'SIDEBAR_INSURANCE_TYPE_BRF',
                      value: ApartmentType.Brf,
                    },
                    {
                      label: 'SIDEBAR_INSURANCE_TYPE_RENT',
                      value: ApartmentType.Rent,
                    },
                  ]),
            ],
            validation: Yup.string().required(),
          },
        },
      }
    : {
        swedishHouse: {
          ...swedishBase,
          livingSpace: {
            label: 'DETAILS_MODULE_TABLE_LIVINGSPACE_CELL_LABEL_HOUSE',
            placeholder: '',
            mask: masks.area,
            type: inputTypes.number,
            validation: Yup.number()
              .min(1)
              .required(),
          },
          ancillarySpace: {
            label: 'DETAILS_MODULE_TABLE_ANCILLARYAREA_CELL_LABEL_HOUSE',
            placeholder: '',
            mask: masks.area,
            type: inputTypes.number,
            validation: Yup.number()
              .min(1)
              .required(),
          },
          numberOfBathrooms: {
            label: 'DETAILS_MODULE_TABLE_BATHROOMS_CELL_LABEL_HOUSE',
            placeholder: '',
            type: inputTypes.number,
            validation: Yup.number()
              .min(0)
              .required(),
          },
          yearOfConstruction: {
            label: 'DETAILS_MODULE_TABLE_YEARBUILT_CELL_LABEL_HOUSE',
            placeholder: '',
            mask: masks.year,
            type: inputTypes.number,
            validation: Yup.number().required(),
          },
          isSubleted: {
            label: 'DETAILS_MODULE_TABLE_SUBLETTING_CELL_LABEL_HOUSE',
            placeholder: '',
            options: [
              { label: 'YES', value: 'true' },
              { label: 'NO', value: 'false' },
            ],
            validation: Yup.boolean().required(),
          },
          extraBuildings: {
            arrayValidation: Yup.array(),
            type: {
              label:
                'DETAILS_MODULE_EXTRABUILDINGS_TABLE_BUILDINGTYPE_CELL_LABEL_HOUSE',
              placeholder: '',
              options: Object.values(ExtraBuildingType).map((value) => ({
                label: getExtraBuilding(value),
                value,
              })),
              validation: Yup.string().required(),
            },
            area: {
              label:
                'DETAILS_MODULE_EXTRABUILDINGS_TABLE_SIZE_CELL_LABEL_HOUSE',
              placeholder: '',
              mask: masks.area,
              type: inputTypes.number,
              validation: Yup.number()
                .min(1)
                .required(),
            },
            hasWaterConnected: {
              label:
                'DETAILS_MODULE_EXTRABUILDINGS_TABLE_WATER_CELL_LABEL_HOUSE',
              placeholder: '',
              options: [
                { label: 'YES', value: 'true' },
                { label: 'NO', value: 'false' },
              ],
              validation: Yup.boolean().required(),
            },
          },
        },
      }
}

const getNorwegianSchema = (
  base: BaseFieldSchema,
  offerQuote: OfferQuote,
): DetailsFieldSchema => {
  const commonAttributes = {
    coInsured: {
      label: 'DETAILS_MODULE_TABLE_COINSURED_CELL_LABEL',
      placeholder: '',
      type: inputTypes.number,
      validation: Yup.number().required(),
    },
    isYouth: {
      label: 'DETAILS_MODULE_TABLE_YOUTH_CELL_LABEL',
      placeholder: '',
      options: [
        { label: 'YES', value: 'true' },
        { label: 'NO', value: 'false' },
      ],
      validation: Yup.boolean().required(),
    },
  }

  return isNorwegianHomeContents(offerQuote.quoteDetails)
    ? {
        norwegianHomeContents: {
          ...base,
          ...commonAttributes,
          livingSpace: {
            label: 'DETAILS_MODULE_TABLE_LIVINGSPACE_CELL_LABEL_HOUSE',
            placeholder: '',
            type: inputTypes.number,
            validation: Yup.number().required(),
          },
          type: {
            label: 'DETAILS_MODULE_TABLE_RESIDENCE_TYPE_CELL_LABEL',
            placeholder: '',
            options: [
              {
                label: 'SIDEBAR_INSURANCE_TYPE_BRF',
                value: NorwegianHomeContentsType.Own,
              },
              {
                label: 'SIDEBAR_INSURANCE_TYPE_RENT',
                value: NorwegianHomeContentsType.Rent,
              },
            ],
            validation: Yup.string().required(),
          },
        },
      }
    : { norwegianTravel: { ...commonAttributes } }
}

const getDanishSchema = (): DetailsFieldSchema => {
  return {
    danishHomeContents: {
      coInsured: {
        label: 'DETAILS_MODULE_TABLE_COINSURED_CELL_LABEL',
        placeholder: '',
        type: inputTypes.number,
        validation: Yup.number().required(),
      },
      isStudent: {
        label: 'DETAILS_MODULE_TABLE_STUDENT_CELL_LABEL',
        placeholder: '',
        options: [
          { label: 'YES', value: 'true' },
          { label: 'NO', value: 'false' },
        ],
        validation: Yup.boolean().required(),
      },
      livingSpace: {
        label: 'DETAILS_MODULE_TABLE_LIVINGSPACE_CELL_LABEL_HOUSE',
        placeholder: '',
        type: inputTypes.number,
        validation: Yup.number().required(),
      },
      type: {
        label: 'DETAILS_MODULE_TABLE_RESIDENCE_TYPE_CELL_LABEL',
        placeholder: '',
        options: [
          {
            label: 'SIDEBAR_INSURANCE_TYPE_BRF',
            value: DanishHomeContentsType.Own,
          },
          {
            label: 'SIDEBAR_INSURANCE_TYPE_RENT',
            value: DanishHomeContentsType.Rent,
          },
        ],
        validation: Yup.string().required(),
      },
    },
  }
}

type GetFieldSchemaParams = {
  offerQuote: OfferQuote
  currentLocaleData: LocaleData
}

export const getFieldSchema = ({
  offerQuote,
  currentLocaleData,
}: GetFieldSchemaParams): FieldSchema => {
  const fieldSchemaDetails = getFieldSchemaDetails(offerQuote)
  return {
    firstName: {
      label: 'DETAILS_MODULE_TABLE_FIRSTNAME_CELL_LABEL',
      placeholder: '',
      validation: Yup.string().required(),
    },
    lastName: {
      label: 'DETAILS_MODULE_TABLE_LASTNAME_CELL_LABEL',
      placeholder: '',
      validation: Yup.string().required(),
    },
    birthDate: {
      label: 'DETAILS_MODULE_TABLE_BIRTHDATE_CELL_LABEL',
      placeholder: currentLocaleData.birthDate.backendFormatExample,
      validation: Yup.string().matches(birthDateFormats.backEndDefault),
    },
    ...fieldSchemaDetails,
  }
}
const getFieldSchemaDetails = (offerQuote: OfferQuote): DetailsFieldSchema => {
  const base = {
    street: {
      label: 'DETAILS_MODULE_TABLE_ADDRESS_CELL_LABEL',
      placeholder: '',
      validation: Yup.string().required(),
    },
    zipCode: {
      label: 'DETAILS_MODULE_TABLE_POSTALCODE_CELL_LABEL',
      placeholder: '',
      mask: isSwedishQuote(offerQuote)
        ? masks.fiveDigitZipCode
        : masks.fourDigitZipCode,
      type: inputTypes.string,
      validation: isSwedishQuote(offerQuote)
        ? Yup.string().matches(/^[0-9]{3}[0-9]{2}$/)
        : Yup.string().matches(/^[0-9]{4}$/),
    },
  }
  if (isNorwegianQuote(offerQuote)) {
    return getNorwegianSchema(base, offerQuote)
  }
  if (isDanishQuote(offerQuote)) {
    return getDanishSchema()
  }

  return getSwedishSchema(base, offerQuote)
}

const getMarketFields = (fieldSchema: FieldSchema, offerQuote: OfferQuote) => {
  if (isNorwegianQuote(offerQuote)) {
    const isNorwegianHomeContent = isNorwegianHomeContentFieldSchema(
      fieldSchema,
      offerQuote,
    )
    return {
      marketFields: isNorwegianHomeContent
        ? (fieldSchema as NorwegianHomeContentFieldSchema).norwegianHomeContents
        : (fieldSchema as NorwegianTravelContentFieldSchema).norwegianTravel,
      key: isNorwegianHomeContent ? 'norwegianHomeContents' : 'norwegianTravel',
    }
  }
  if (isDanishQuote(offerQuote)) {
    return {
      marketFields: (fieldSchema as DanishHomeContentFieldSchema)
        .danishHomeContents,
      key: 'danishHomeContents',
    }
  }

  const isSwedishAppartment = isSwedishApartmentFieldSchema(
    fieldSchema,
    offerQuote,
  )
  return {
    marketFields: isSwedishAppartment
      ? (fieldSchema as SwedishApartmentFieldSchema).swedishApartment
      : (fieldSchema as SwedishHouseFieldSchema).swedishHouse,
    key: isSwedishAppartment ? 'swedishApartment' : 'swedishHouse',
  }
}

const validateFields = (fields: MarketFields | CommonFieldSchema) =>
  Object.entries(fields).reduce(
    (acc, fieldKeyValuePair) => ({
      ...acc,
      ...getValidationSchemaHelper(fieldKeyValuePair),
    }),
    {},
  )
export const getValidationSchema = (
  fieldSchema: FieldSchema,
  offerQuote: OfferQuote,
): Yup.ObjectSchema<unknown> => {
  const { firstName, lastName, birthDate } = fieldSchema
  const commonFields = { firstName, lastName, birthDate }
  const { marketFields, key } = getMarketFields(fieldSchema, offerQuote)
  return Yup.object({
    ...validateFields(commonFields),
    [key]: Yup.object({
      ...validateFields(marketFields),
    }),
  })
}

type FieldTuple<T> = [string, FieldType<T>]

const getValidationSchemaHelper = <T>([key, value]: FieldTuple<T>): any => {
  if (isRegularFieldType(value)) {
    return { [key]: value.validation }
  }

  if (isArrayFieldType(value)) {
    return {
      [key]: value.arrayValidation.of(
        Yup.object().shape(
          Object.assign(
            {},
            ...Object.entries(value)
              .filter(([k]) => k !== 'arrayValidation')
              .map((v) =>
                getValidationSchemaHelper(
                  (v as any) as [string, RegularFieldType],
                ),
              ),
          ),
        ),
      ),
    }
  }

  return { [key]: Yup.object().shape({ ...getValidationSchemaHelper(value) }) }
}

const isRegularFieldType = <T>(
  field: FieldType<T>,
): field is RegularFieldType => {
  return {}.hasOwnProperty.call(field, 'validation')
}

const isArrayFieldType = <T>(
  field: FieldType<T>,
): field is ArrayFieldType<T> => {
  return {}.hasOwnProperty.call(field, 'arrayValidation')
}

const getExtraBuilding = (extraBuildingType: ExtraBuildingType): string => {
  const map = {
    [ExtraBuildingType.Attefall]: 'DETAILS_MODULE_EXTRABUILDINGS_ATTEFALL',
    [ExtraBuildingType.Barn]: 'DETAILS_MODULE_EXTRABUILDINGS_BARN',
    [ExtraBuildingType.Boathouse]: 'DETAILS_MODULE_EXTRABUILDINGS_BOATHOUSE',
    [ExtraBuildingType.Carport]: 'DETAILS_MODULE_EXTRABUILDINGS_CARPORT',
    [ExtraBuildingType.Friggebod]: 'DETAILS_MODULE_EXTRABUILDINGS_FRIGGEBOD',
    [ExtraBuildingType.Garage]: 'DETAILS_MODULE_EXTRABUILDINGS_GARAGE',
    [ExtraBuildingType.Gazebo]: 'DETAILS_MODULE_EXTRABUILDINGS_GAZEBO',
    [ExtraBuildingType.Greenhouse]: 'DETAILS_MODULE_EXTRABUILDINGS_GREENHOUSE',
    [ExtraBuildingType.Guesthouse]: 'DETAILS_MODULE_EXTRABUILDINGS_GUESTHOUSE',
    [ExtraBuildingType.Other]: 'DETAILS_MODULE_EXTRABUILDINGS_OTHER',
    [ExtraBuildingType.Outhouse]: 'DETAILS_MODULE_EXTRABUILDINGS_OUTHOUSE',
    [ExtraBuildingType.Sauna]: 'DETAILS_MODULE_EXTRABUILDINGS_SAUNA',
    [ExtraBuildingType.Shed]: 'DETAILS_MODULE_EXTRABUILDINGS_SHED',
    [ExtraBuildingType.Storehouse]: 'DETAILS_MODULE_EXTRABUILDINGS_STOREHOUSE',
  }

  if (!map[extraBuildingType]) {
    throw new Error(`Invalid insurance type ${extraBuildingType}`)
  }

  return map[extraBuildingType]
}

const getInitialSwedishApartmentValues = (
  quoteId: string,
  details: SwedishApartmentQuoteDetails,
): EditQuoteInput => ({
  id: quoteId,
  swedishApartment: {
    street: details.street,
    zipCode: details.zipCode,
    householdSize: details.householdSize,
    livingSpace: details.livingSpace,
    type: details.type,
  },
})

const getInitialSwedishHouseValues = (
  quoteId: string,
  details: SwedishHouseQuoteDetails,
): EditQuoteInput => ({
  id: quoteId,
  swedishHouse: {
    street: details.street,
    zipCode: details.zipCode,
    householdSize: details.householdSize,
    livingSpace: details.livingSpace,
    ancillarySpace: details.ancillarySpace,
    numberOfBathrooms: details.numberOfBathrooms,
    yearOfConstruction: details.yearOfConstruction,
    isSubleted: details.isSubleted,
    extraBuildings: details.extraBuildings.map<ExtraBuildingInput>(
      ({ type, area, hasWaterConnected }) => ({
        type,
        area,
        hasWaterConnected,
      }),
    ),
  },
})

type NorwegianHomeContentsFormDetails = NorwegianHomeContentsDetails & {
  norwegianHomeType: NorwegianHomeContentsType
}

const getInitialNorwegianHomeContentValues = (
  quoteId: string,
  quoteDetails: NorwegianHomeContentsFormDetails,
): EditQuoteInput => ({
  id: quoteId,
  norwegianHomeContents: {
    type: quoteDetails.norwegianHomeType,
    street: quoteDetails.street,
    zipCode: quoteDetails.zipCode,
    coInsured: quoteDetails.coInsured,
    isYouth: quoteDetails.isYouth,
    livingSpace: quoteDetails.livingSpace,
  },
})

const getInitialNorwegianTravelValues = (
  quoteId: string,
  quoteDetails: NorwegianTravelDetails,
): EditQuoteInput => ({
  id: quoteId,
  norwegianTravel: {
    coInsured: quoteDetails.coInsured,
    isYouth: quoteDetails.isYouth,
  },
})

type DanishHomeContentsFormDetails = DanishHomeContentsDetails & {
  danishHomeType: DanishHomeContentsType
}

const getInitialDanishHomeContentValues = (
  quoteId: string,
  quoteDetails: DanishHomeContentsFormDetails,
): EditQuoteInput => {
  return {
    id: quoteId,
    danishHomeContents: {
      type: quoteDetails.danishHomeType,
      street: quoteDetails.street,
      zipCode: quoteDetails.zipCode,
      coInsured: quoteDetails.coInsured,
      isStudent: quoteDetails.isStudent,
      livingSpace: quoteDetails.livingSpace,
    },
  }
}

export const getInitialInputValues = (
  personalInfo: OfferPersonInfo,
  offerQuote: OfferQuote,
) => {
  const { firstName, lastName, birthDate } = personalInfo
  return {
    firstName,
    lastName,
    birthDate,
    ...getInitialQuoteDetailsInputValues(offerQuote),
  }
}

const getInitialQuoteDetailsInputValues = (offerQuote: OfferQuote) => {
  const { id: quoteId, quoteDetails } = offerQuote

  switch (quoteDetails.__typename) {
    case 'SwedishHouseQuoteDetails':
      return getInitialSwedishHouseValues(quoteId, quoteDetails)
    case 'SwedishApartmentQuoteDetails':
      return getInitialSwedishApartmentValues(quoteId, quoteDetails)
    case 'NorwegianHomeContentsDetails':
      return getInitialNorwegianHomeContentValues(
        quoteId,
        quoteDetails as NorwegianHomeContentsFormDetails,
      )
    case 'NorwegianTravelDetails':
      return getInitialNorwegianTravelValues(quoteId, quoteDetails)
    case 'DanishHomeContentsDetails':
      return getInitialDanishHomeContentValues(
        quoteId,
        quoteDetails as DanishHomeContentsFormDetails,
      )
    default:
      throw new Error(
        `Unknown type of quote details "${quoteDetails.__typename}".`,
      )
  }
}
type GetFormDataParams = {
  form: EditQuoteInput
  quoteDetails: QuoteDetails
  offerData: OfferData
}

export const getQuoteDetailsFormData = ({
  form,
  quoteDetails,
  offerData,
}: GetFormDataParams) => {
  const {
    swedishApartment: swedishApartmentFormData,
    swedishHouse: swedishHouseFormData,
    danishHomeContents: danishHomeContentsFormData,
    norwegianHomeContents: norwegianHomeContentsFormData,
    norwegianTravel: norwegianTravelFormData,
  } = form

  const danishAccidentOrTravelFormData: EditDanishAccidentInput = {
    coInsured: danishHomeContentsFormData?.coInsured,
    isStudent: danishHomeContentsFormData?.isStudent,
    street: danishHomeContentsFormData?.street,
    zipCode: danishHomeContentsFormData?.zipCode,
  }

  const norwegianBundleTravelFormData: EditNorwegianTravelInput = {
    coInsured: norwegianHomeContentsFormData?.coInsured,
    isYouth: norwegianHomeContentsFormData?.isYouth,
  }

  switch (quoteDetails.__typename) {
    case 'SwedishApartmentQuoteDetails':
      return swedishApartmentFormData

    case 'SwedishHouseQuoteDetails':
      return swedishHouseFormData

    case 'NorwegianHomeContentsDetails':
      return norwegianHomeContentsFormData

    case 'NorwegianTravelDetails':
      if (isBundle(offerData)) {
        return norwegianBundleTravelFormData
      }
      return norwegianTravelFormData

    case 'DanishHomeContentsDetails':
      return danishHomeContentsFormData

    case 'DanishAccidentDetails':
      return danishAccidentOrTravelFormData

    case 'DanishTravelDetails':
      return danishAccidentOrTravelFormData

    default:
      throw new Error(
        `Unknown type of quote details "${quoteDetails.__typename}".`,
      )
  }
}

type GetEditQuoteInputParams = {
  quote: OfferQuote
  form: EditQuoteInput
  offerData: OfferData
}

export const getEditQuoteInput = ({
  quote,
  form,
  offerData,
}: GetEditQuoteInputParams): EditQuoteInput => {
  const { quoteDetails, id } = quote
  const quoteType = getQuoteType(quoteDetails)
  const quoteDetailsFormValues = getQuoteDetailsFormData({
    form,
    quoteDetails,
    offerData,
  })
  const { firstName, lastName, birthDate } = form

  const input: EditQuoteInput = {
    id,
    firstName,
    lastName,
    birthDate,
    [quoteType]: quoteDetailsFormValues,
  }

  return input
}

const isResultUnderwritingLimitsHit = (
  result: FetchResult<EditQuoteMutation>,
) => result.data?.editQuote.__typename === 'UnderwritingLimitsHit'

const isResultBundleUnderwritingLimitsHit = (
  bundleResult: FetchResult<EditQuoteMutation>[],
): boolean =>
  bundleResult.some((result) => isResultUnderwritingLimitsHit(result))

export const isUnderwritingLimitsHit = (
  result: FetchResult<EditQuoteMutation> | FetchResult<EditQuoteMutation>[],
) =>
  Array.isArray(result)
    ? isResultBundleUnderwritingLimitsHit(result)
    : isResultUnderwritingLimitsHit(result)

const hasEditQuoteError = (result: FetchResult<EditQuoteMutation>) =>
  result.errors && result.errors.length > 0

const hasEditQuoteBundleErrors = (
  bundleResult: FetchResult<EditQuoteMutation>[],
): boolean => bundleResult.some((result) => hasEditQuoteError(result))

export const hasEditQuoteErrors = (
  result: FetchResult<EditQuoteMutation> | FetchResult<EditQuoteMutation>[],
) =>
  !result || Array.isArray(result)
    ? hasEditQuoteBundleErrors(result)
    : hasEditQuoteError(result)

type EditQuoteType = keyof Pick<
  EditQuoteInput,
  | 'swedishApartment'
  | 'swedishHouse'
  | 'norwegianHomeContents'
  | 'norwegianTravel'
  | 'danishHomeContents'
  | 'danishAccident'
  | 'danishTravel'
>

const getQuoteType = (quoteDetails: QuoteDetails): EditQuoteType => {
  if (isSwedishApartment(quoteDetails)) return 'swedishApartment'
  if (isSwedishHouse(quoteDetails)) return 'swedishHouse'
  if (isNorwegianHomeContents(quoteDetails)) return 'norwegianHomeContents'
  if (isNorwegianTravel(quoteDetails)) return 'norwegianTravel'
  if (isDanishHomeContents(quoteDetails)) return 'danishHomeContents'
  if (isDanishTravel(quoteDetails)) return 'danishTravel'
  if (isDanishAccident(quoteDetails)) return 'danishAccident'
  throw new Error(`Unknown quote type details, this should never happen`)
}
