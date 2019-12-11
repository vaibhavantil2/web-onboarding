import * as React from 'react'

export const DownArrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="18px"
    height="11px"
    viewBox="0 0 18 11"
    version="1.1"
    fill="#9B9BAA"
  >
    <g stroke="none" strokeWidth="1" fillRule="evenodd">
      <g transform="translate(-7.000000, -11.000000)">
        <g transform="translate(16.000000, 16.000000) scale(-1, 1) translate(-16.000000, -16.000000) ">
          <path
            d="M20.5616732,22.8759484 C20.8794418,23.189257 20.8794418,23.7019779 20.5616732,24.0152865 L19.9993985,24.5696694 C19.6879189,24.8767772 19.1875312,24.8767772 18.8760516,24.5696694 L11.4383262,17.236336 C11.1205576,16.9230274 11.1205576,16.4103065 11.4383262,16.0969979 L18.8760516,8.76366462 C19.1875312,8.45655675 19.6879189,8.45655675 19.9993985,8.76366462 L20.5616732,9.31804749 C20.8794418,9.63135609 20.8794418,10.144077 20.5616732,10.4573856 L14.2640009,16.666667 L20.5616732,22.8759484 Z"
            fillRule="nonzero"
            transform="translate(16.000000, 16.666667) rotate(-90.000000) translate(-16.000000, -16.666667) "
          ></path>
        </g>
      </g>
    </g>
  </svg>
)
