document.addEventListener('DOMContentLoaded', () => {
  const defaultGAId = 'DEMO_DEFAULT_ID';
  const domainGAIds = {
    'example1.com': 'DEMO_ID_1',  
    'example2.com': 'DEMO_ID_2',  
    'example3.com': 'DEMO_ID_3',  
    'example4.com': 'DEMO_ID_4',  
    'example5.com': 'DEMO_ID_5',  
  };

  const currentDomain = window.location.hostname;

  const loadGA = (gaId) => {
    const fullGAId = gaId.startsWith('G-') ? gaId : `G-${gaId}`;
    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${fullGAId}`;
    document.head.appendChild(scriptTag);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', fullGAId);
  };

  const gaIdSuffix = domainGAIds[currentDomain];
  if (gaIdSuffix) {
    loadGA(gaIdSuffix);
  } else {
    console.warn("No specific GA ID found for this domain:", currentDomain);
  }

  loadGA(defaultGAId);
});
