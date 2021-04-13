import { useEffect } from 'react';

function ImportReactAndShare(resourceUrl: string, lang: string) {
  const reactAndShareApiKey = lang === 'fi' ? process.env.REACT_APP_REACT_AND_SHARE_FI : lang === 'sv' ? process.env.REACT_APP_REACT_AND_SHARE_SV : process.env.REACT_APP_REACT_AND_SHARE_EN;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = resourceUrl;
    
    window.rnsData = {
      apiKey: reactAndShareApiKey,
      categories: ['Työllisyyspalvelut'],
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, [resourceUrl]);
};

export default ImportReactAndShare;
