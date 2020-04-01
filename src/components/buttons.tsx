import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import color from 'color'
import { Link } from 'react-router-dom'
import { Size } from './types'

interface ButtonProps {
  background?: string
  foreground?: string
  size?: Size
  fullWidth?: boolean
  disabled?: boolean
}

export const Button = styled.button<ButtonProps>`
  font-size: ${(props) => (props.size === 'lg' ? `1rem` : `0.875rem`)};
  line-height: ${(props) => (props.size === 'lg' ? `1rem` : `1.25rem`)};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  padding: ${(props) =>
    props.size === 'lg' ? `1.5rem 2.5rem` : `0.875rem 1.5rem`};
  background: ${(props) =>
    props.disabled
      ? color(props.background ?? colorsV3.gray900)
          .lighten(0.5)
          .toString()
      : props.background ?? colorsV3.gray900};
  color: ${(props) => props.foreground ?? colorsV3.white};
  border-radius: 8px;
  border: none;
  cursor: ${(props) => (props.disabled ? `default` : `pointer`)};
  transition: all 0.15s ease-in-out;
  text-decoration: none;
  text-align: center;

  :focus {
    outline: none;
  }

  ${(props) =>
    !props.disabled &&
    `
    &:hover {
      background: ${color(props.background ?? colorsV3.gray900)
        .darken(0.1)
        .toString()};
      color: ${props.foreground ?? colorsV3.white};
    }
  `}
`

export const LinkButton = Button.withComponent(Link)

interface TextButtonProps {
  color?: string
}

export const TextButton = styled.button<TextButtonProps>`
  background: none;
  padding: 0;
  margin: 0;
  color: ${(props) => props.color || colorsV3.purple500};
  font-size: 0.875rem;
  line-height: 1.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  transition: color 0.1s ease;

  :hover {
    color: ${(props) =>
      color(props.color ?? colorsV3.purple500)
        .darken(0.1)
        .toString()};
  }

  :focus {
    outline: none;
  }
`
