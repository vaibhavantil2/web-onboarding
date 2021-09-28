import React from 'react'
import { Selector } from './Selector'

const mockInsurances = [
  {
    id: '1',
    name: 'Inbo, Ulykke & Rejse',
    price: '329 kr/md',
    fullPrice: '369 kr',
    label: '3-in-1',
    selected: true,
  },
  {
    id: '2',
    name: 'Inbo &  Ulykke',
    price: '279 kr/md',
    label: '2-in-1',
    selected: false,
  },
  {
    id: '3',
    name: 'Inbo',
    price: '189 kr/md',
    selected: false,
  },
]

export default {
  title: 'Offer/InsuranceSelector',
  component: Selector,
  parameters: {
    backgrounds: { default: 'gray100' },
  },
}

export const Default = () => {
  const [insurances, setInsurances] = React.useState(mockInsurances)
  return (
    <Selector
      insurances={insurances}
      onChange={(id) =>
        setInsurances((prev) =>
          prev.map((item) => ({ ...item, selected: item.id === id })),
        )
      }
    />
  )
}
