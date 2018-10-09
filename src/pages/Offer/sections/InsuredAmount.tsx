import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { CardWrapper } from '../components/CardWrapper'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'

interface Props {
  title: string
  info: string
}

const Card = styled('div')({
  marginTop: '70px',
  paddingTop: '30px',
  paddingBottom: '30px',
  backgroundColor: colors.WHITE,
  boxShadow: '0px 8px 15px -13px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const Table = styled('div')({
  marginTop: '20px',
})

const Header = styled('h1')({
  color: colors.BLACK,
  marginTop: '30px',
  marginBottom: '30px',
  fontSize: '32px',
})

const Row = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: '20px',
  borderBottom: '1px solid ' + colors.LIGHT_GRAY,
  marginLeft: '40px',
  marginRight: '40px',
})

const Col = styled('div')({
  display: 'flex',
  paddingBottom: '10px',
  flexDirection: 'column',
  color: colors.BLACK,
  fontSize: '14px',
})

const AMOUNTS = [
  {
    key: 0,
    title: 'Bostaden:',
    amount: 'Fullvärde',
  },
  {
    key: 1,
    title: 'Dina prylar totalt:',
    amount: '1 000 000 kr',
  },
  {
    key: 2,
    title: 'Drulle gäller för prylar upp till:',
    amount: '50 000 kr',
  },
  {
    key: 3,
    title: 'Självrisk:',
    amount: '1 500 kr',
  },
]

export const InsuredAmount: React.SFC<Props> = (props) => (
  <Wrapper>
    <InnerWrapper>
      <CardWrapper>
        <Card>
          <HeaderWrapper>
            <Header>{props.title}</Header>
          </HeaderWrapper>
          <Table>
            {AMOUNTS.map((amount) => (
              <Row key={amount.key}>
                <Col>{amount.title}</Col>
                <Col>{amount.amount}</Col>
              </Row>
            ))}
          </Table>
        </Card>
      </CardWrapper>
    </InnerWrapper>
  </Wrapper>
)
