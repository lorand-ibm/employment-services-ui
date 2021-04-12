import { useEffect } from 'react';

function ImportReactAndShare(resourceUrl: string) {
  const reactAndShareApiKey = process.env.REACT_APP_REACT_AND_SHARE;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = resourceUrl;
    
    window.rnsData = {
      apiKey: reactAndShareApiKey,
      categories: ['tyollisyyspalvelut'],
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, [resourceUrl]);
};

export default ImportReactAndShare;
