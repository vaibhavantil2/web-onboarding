import * as koaHelmet from 'koa-helmet'
import * as uuidV4 from 'uuid/v4'
import { GIRAFFE_ENDPOINT, GIRAFFE_WS_ENDPOINT } from '../config'

const defaultSrc = [
  "'self'",
  'cdn.hedvig.com',
  'www.googletagmanager.com',
  'https://*.hotjar.com',
  'wss://*.hotjar.com',
  'https://*.intercom.io',
  'https://*.intercomcdn.com',
  'https://*.intercomassets.com',
  'https://*.intercomusercontent.com',
  'wss://*.intercom.io',
  'wss://*.intercomcdn.com',
  'wss://*.intercomassets.com',
  'wss://*.intercomusercontent.com',
  'app.getsentry.com',
  'www.google-analytics.com',
  '*.facebook.net',
  '*.doubleclick.net',
  GIRAFFE_ENDPOINT,
  GIRAFFE_WS_ENDPOINT,
]

export const helmet = koaHelmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc,
      scriptSrc: [
        ...defaultSrc,
        "'unsafe-eval'",
        'browser.sentry-cdn.com',
        'cdn.segment.com',
        'www.googletagmanager.com',
        // tslint:disable-next-line variable-name
        (_request, response) => {
          ;(response as any).cspNonce = uuidV4()
          return `'nonce-${(response as any).cspNonce}'`
        },
      ],
      connectSrc: [
        ...defaultSrc,
        'https://api.segment.io',
        'https://sentry.io',
      ],
      styleSrc: [...defaultSrc, "'unsafe-inline'"],
      upgradeInsecureRequests: true,
      objectSrc: ["'none'"],
      reportUri: '/new-member/_report-csp-violation',
    },
  },
})
