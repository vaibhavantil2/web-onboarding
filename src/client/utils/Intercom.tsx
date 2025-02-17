import React from 'react'
import { useRouteMatch } from 'react-router'
import { localePathPattern } from 'l10n/localePathPattern'
import { useVariation, Variation } from 'utils/hooks/useVariation'

const createIntercom = () => {
  const script = `
      window.intercomSettings = {
        app_id: "ziqa7goa"
      };

      (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/ziqa7goa';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};l()}})();
    `
  const scriptTag = window.document.createElement('script')
  scriptTag.id = 'intercom-script'
  scriptTag.nonce = window.document.querySelector<HTMLScriptElement>(
    '[nonce]',
  )?.nonce
  scriptTag.innerHTML = script
  window.document.body.append(scriptTag)
}

export const Intercom: React.FC = () => {
  const variation = useVariation()
  const isIntercomMatch = useRouteMatch(
    localePathPattern +
      '/new-member/:place(offer|sign|download|connect-payment)',
  )

  React.useEffect(() => {
    if (
      [Variation.IOS, Variation.ANDROID, Variation.AVY].includes(variation!)
    ) {
      return
    }
    const hasIntercomScript = window.document.getElementById('intercom-script')
    const hasIntercomInstalled = typeof (window as any).Intercom !== 'undefined'

    if (isIntercomMatch && !hasIntercomScript) {
      createIntercom()
    } else if (isIntercomMatch && hasIntercomInstalled) {
      ;(window as any).Intercom('boot')
    } else if (!isIntercomMatch && hasIntercomInstalled) {
      ;(window as any).Intercom('shutdown')
    }
  }, [variation, isIntercomMatch])

  return null
}
