import React from 'react'
import { useRouteMatch } from 'react-router'

export const Intercom: React.FC = () => {
  const match = useRouteMatch('/:locale(no-en|no)/new-member/connect-payment')
  React.useEffect(() => {
    const elementById = window.document.getElementById('intercom-script')
    if (!match && !elementById) {
      const script = `
      window.intercomSettings = {
        app_id: "ziqa7goa"
      };

      (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/ziqa7goa';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
    `
      const scriptTag = window.document.createElement('script')
      scriptTag.id = 'intercom-script'
      scriptTag.nonce = window.document.querySelector<HTMLScriptElement>(
        '[nonce]',
      )?.nonce
      scriptTag.innerHTML = script
      window.document.body.append(scriptTag)
    } else if (!match) {
      ;(window as any).Intercom('boot')
    } else if (match && typeof (window as any).Intercom !== 'undefined') {
      ;(window as any).Intercom('shutdown')
    }
  }, [match?.path])

  return null
}
