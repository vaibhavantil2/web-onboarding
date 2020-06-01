import * as koaHelmet from 'koa-helmet'
import * as uuidV4 from 'uuid/v4'
import { CONTENT_SERVICE_ENDPOINT, GIRAFFE_WS_ENDPOINT } from '../config'

const defaultSrc = [
  "'self'",
  'hedvig.com',
  'www.hedvig.com',
  'cdn.hedvig.com',
  '*.hotjar.com',
  '*.hotjar.io',
  '*.intercom.io',
  '*.intercomcdn.com',
  '*.intercomassets.com',
  '*.intercomusercontent.com',
  'nexus-websocket-a.intercom.io',
  'app.getsentry.com',
  'sentry.io',
  'www.google-analytics.com',
  'www.googletagmanager.com',
  'https://tagmanager.google.com',
  'www.googleadservices.com',
  'www.gstatic.com',
  'www.google.com',
  'www.google.se',
  'tpc.googlesyndication.com',
  'translate.google.com',
  '*.facebook.net',
  '*.facebook.com',
  'www.studentkortet.se',
  'https://studentkortet.go2cloud.org',
  'track.studentkortet.se',
  'tr.snapchat.com',
  'sc-static.net',
  's.pinimg.com',
  'ct.pinterest.com',
  't.co',
  'analytics.twitter.com',
  'static.ads-twitter.com',
  'online.adservicemedia.dk',
  '*.doubleclick.net',
  'adtr.io',
  'track.adtraction.com',
  'c.adtraction.net',
  'cnv.adt603.net',
  'cnv.adt611.net',
  'cnv.adt623.net',
  'cnv.adt644.net',
  'cnv.adt659.net',
  'cnv.adt662.net',
  'cnv.adt670.net',
  'cnv.adt686.net',
  'cnv.adt690.net',
  'cdn.adt387.com',
  'bnc.lt',
  'app.link',
  'hedvig.app.link',
  'hedvig.test-app.link',
  'trustly.com',
  '*.trustly.com',
  'cdn.mxpnl.com',
  'cdn.segment.com',
  'api.segment.io',
  'https://api-js.mixpanel.com',
  'checkoutshopper-live.adyen.com',
  'checkoutshopper-test.adyen.com',
  GIRAFFE_WS_ENDPOINT,
  CONTENT_SERVICE_ENDPOINT,
]

export const helmet = koaHelmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc,
      scriptSrc: [
        "'unsafe-eval'",
        "'unsafe-inline'",
        'https://browser.sentry-cdn.com',
        ...defaultSrc,
        // tslint:disable-next-line variable-name
        (_request, response) => {
          ;(response as any).cspNonce = uuidV4()
          return `'nonce-${(response as any).cspNonce}'`
        },
      ],
      styleSrc: ["'unsafe-inline'", "'self'", 'checkoutshopper-live.adyen.com'],
      objectSrc: ["'none'"],
      imgSrc: [
        "'self'",
        'data:',
        'hedvig.com',
        '*.hedvig.com',
        CONTENT_SERVICE_ENDPOINT,
        'checkoutshopper-live.adyen.com',
        'checkoutshopper-test.adyen.com',
        't.co',
        'ct.pinterest.com',
        'googleads.g.doubleclick.net',
        'stats.g.doubleclick.net',
        'www.googletagmanager.com',
        'www.google-analytics.com',
        'www.gstatic.com',
        'www.google.com',
        'www.google.se',
        'www.google.no',
        'www.facebook.com',
        'downloads.intercomcdn.com',
        'online.adservicemedia.dk',
        'js.intercomcdn.com',
        'static.intercomassets.com',
        'hedvig.intercom-attachments-5.com',
        'gifs.intercomcdn.com',
        'cnv.adt686.net',
        'cnv.adt387.com',
      ],
      reportUri:
        process.env.CSP_REPORT_ENDPOINT || '/new-member/_report-csp-violation',
      upgradeInsecureRequests: true,
    },
  },
})
