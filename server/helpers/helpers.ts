import axios from "axios";

if (!process.env.REACT_APP_DRUPAL_SSR_URL) {
  throw Error("Drupal URL missing");
}

export const drupalSsrUrl = process.env.REACT_APP_DRUPAL_SSR_URL;

export type Lang = "fi" | "en" | "sv";

export interface NodeAttributes {
  title?: string;
  summary?: string;
  imageUrl?: string | boolean;
}

const appNames: { [l in Lang]: string } = {
  fi: "Työllisyyspalvelut",
  sv: "Arbetstjänster",
  en: "Employment services",
};

export const getAppName = (l: Lang): string => appNames[l];

const appDescription: { [l in Lang]: string } = {
  fi: "Hyviä töitä Helsingissä! Meillä työnhakijat, koulutustarjonta ja työnantajat kohtaavat toisensa paremmin.",
  sv: "Bra arbete i Helsingfors! Hos oss möts arbetssökande, utbildningsutbud och arbetsgivare bättre.",
  en: "Good jobs in Helsinki! We help jobseekers, education providers and employers to find each other more easily.",
};

export const getAppDescription = (l: Lang): string => appDescription[l];

export const strToLang = (langParam: string): Lang => {
  switch (langParam) {
    case "en":
      return "en";
    case "sv":
      return "sv";
    default:
      return "fi";
  }
};

const getPagePath = (lang: string, nid: string|boolean, page: string, includes: string) => {
  const api = "apijson";
  let rest = `/${api}${page}${includes}`;
  if (nid) {
    rest +=`&filter[drupal_internal__nid]=${nid}`;
  }

  if (lang === 'en') {
    return `${drupalSsrUrl}${rest}`
  } else {
    return `${drupalSsrUrl}/${lang}${rest}`
  }
};

export const getNodePath = (type: string, lang: string, nid: string|boolean) =>
  getPagePath(
    lang,
    nid,
    `/node/${type}`,
    "?include=field_page_content",
  );

export const getDrupalNodeDataFromPathAlias = async (
  pathAlias: string,
): Promise<any> => {
  const paths = `${drupalSsrUrl}/apijson/path_alias/path_alias`;
  const exactPath = `${paths}?filter[alias]=/${pathAlias}`;
  const res = await axios.get(exactPath);

  if (!res || !res.data || !res.data.data[0]) {
    return null;
  }

  if (!res.data.data.length) {
    return null;
  }

  return {
    nid: res.data.data[0].attributes.path.substr(6),
  };
};

export const findNodeAttributes = async (json: any, lang: Lang): Promise<NodeAttributes> => {
  let imageUrl = '';

  if (json.included) {
    imageUrl = await findImage(json.included);
  }
  // Event images.
  if (json.data[0].attributes.field_image_url) {
    imageUrl = json.data[0].attributes.field_image_url;
  }

  const data: NodeAttributes = {
    imageUrl: imageUrl || "https://edit.tyollisyyspalvelut.hel.fi/sites/default/files/2021-04/tyollisyyspalvelut-helsinki.png",
    summary: json.data[0].attributes.field_summary || getAppDescription(lang),
    title: `${json.data[0].attributes.title} | ${getAppName(lang)}` || getAppName(lang),
  };

  return data;
}

export const findImage = async (json: any): Promise<string> => {
  const imageParagraph = json.filter((el: any) => el.type === 'paragraph--image');

  if (imageParagraph?.length) {
    const imageField  = await axios.get(imageParagraph[0].relationships.field_image_image.links.related.href + '?include=field_media_image&fields[file--file]=image_style_uri');
    let imageUrl = imageField.data.included[0].attributes.image_style_uri.filter((imgStyle: any) => imgStyle['wide_s'])[0]['wide_s'];
    imageUrl = imageUrl.replace(drupalSsrUrl, process.env.REACT_APP_DRUPAL_URL);
    return imageUrl;
  }

  return '';
}

export const getPageType = (type: string, urlAlias: string) => {
  if (urlAlias === 'fi' || urlAlias === 'sv' || urlAlias === 'en') {
    return 'landing';
  }

  if (urlAlias === type) {
    return 'page';
  }

  let pageType = '';

  switch (type) {
    case 'blogi':
    case 'blogg':
    case 'blog':
      pageType = 'blog';
      break;
    case 'tapahtuma':
    case 'evenemang':
    case 'event': 
      pageType = 'event';
      break;
    case 'uutiset':
    case 'nyheter':
    case 'news':
      pageType = 'news';
      break;
    default:
      pageType = 'page';
  }

  return pageType;
}
