/* eslint-disable */
import { useEffect } from "react";
import { rnsFi, rnsSv, rnsEn } from "../config";

export const useReactAndShare = (
  cookieConsent: string,
  lang: string,
  pageTitle: string
) => {
  useEffect(() => {
    if (cookieConsent !== "true") {
      return;
    }

    let reactAndShareApiKey = rnsFi;
    if (lang === "en") {
      reactAndShareApiKey = rnsSv;
    } else if (lang === "sv") {
      reactAndShareApiKey = rnsEn;
    }

    const script = document.createElement("script");
    const resourceUrl = "https://cdn.reactandshare.com/plugin/rns.js";
    script.src = resourceUrl;
    script.type = "text/javascript";

    window.rnsData = {
      apiKey: reactAndShareApiKey,
      title: pageTitle || "Työllisyyspalvelut",
      canonicalUrl: window.location.href,
      categories: ["Työllisyyspalvelut"],
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [cookieConsent, lang]);
};

export const useMatomo = (cookieConsent: string) => {
  useEffect(() => {
    if (cookieConsent !== "true") {
      return;
    }
    const script = document.createElement("script");
    const resourceUrl = "//webanalytics.digiaiiris.com/js/";
    script.async = true;
    script.src = `${resourceUrl}piwik.min.js`;
    script.type = "text/javascript";

    const _paq = (window._paq = window._paq || []);
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(["setCookieDomain", "*.tyollisyyspalvelut.hel.fi"]);
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);
    (function () {
      _paq.push(["setTrackerUrl", `${resourceUrl}tracker.php`]);
      _paq.push(["setSiteId", "189"]);
    })();

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [cookieConsent]);
};
