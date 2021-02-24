import { getColor } from "./colorHelper.js";
let _ = require('lodash');

const findSubmenu = (m, uri) => {
  let subs = [];
  let name = uri.substring(10);
  m.data.data.map((item, index) => {
    if ((item.attributes.menu_name.replace('_', '-')) === name.replace('_', '-')) {
      subs.push({
        name: item.attributes.title,
        link: item.attributes.link.uri,
        items: findSubmenu(m, item.attributes.link.uri),
        weight: item.attributes.weight,
      });
    }
    return subs;
  });
  let subs2 = _.orderBy(subs, ['weight'], ['asc']);
  return subs2;
}

export const makeMenu = (m) => {
  let menu = [];
  if (!!!m || !!!m.data) {
    console.log('no menus');
    return menu;
  }
  m.data.data.map((item, index) => {
    if (item.attributes.menu_name === 'main') {
      menu.push({
        name: item.attributes.title,
        link: item.attributes.link.uri,
        items: findSubmenu(m, item.attributes.link.uri),
        weight: item.attributes.weight,
      });
    }
    return menu;
  });
  let menu2 = _.orderBy(menu, ['weight'], ['asc']);
  return menu2;
}

export const findImageUrl = (uid, files, media) => {
  if (!!!files || !!!files.data || !!!media || !!!media.data) {
    return "";
  }
  const mIndex = media.data.data.findIndex(item => item.id === uid);
  const imageUid = media.data.data[mIndex].relationships.field_media_image.data.id;
  const fIndex = files.data.data.findIndex(item => item.id === imageUid);
  return files.data.data[fIndex].attributes.uri.url;
}

export const findImage = (item, field, files, media) => {
  try {
    return findImageUrl(item.relationships[field].data.id, files, media);
  } catch (error) {
    console.log('no pic: ' + field);
  }
  return null;
}

export const findPdfUrl = (uid, files, pdfs) => {
  if (!!!files || !!!files.data || !!!pdfs || !!!pdfs.data) {
    return "";
  }
  const pIndex = pdfs.data.data.findIndex(item => item.id === uid);

  const pdfUid = pdfs.data.data[pIndex].relationships.field_media_document.data.id;
  const fIndex = files.data.data.findIndex(item => item.id === pdfUid);
  return files.data.data[fIndex].attributes.uri.url;
}

const getTextValue = (path) => {
  if (!!!path || !!!path.value) {
    return "";
  }
  return path.value;
}

const getCards = (d, ids) => {
  let cards = [];
  ids.map((item, index) => {
    let id = item.id;
    let card = _.find(d, { id: id });
    card.thisCardIsInList = true;
    cards.push(card);
    return cards;
  });
  return cards;
}

const convertCardsFromDrupal = (drupalCards, includeFromList, files, media, taxonomies) => {
  let cards = [];
  try {
    drupalCards.map((item, index) => {
      if ((includeFromList && item.thisCardIsInList) ||
        (!includeFromList && !item.thisCardIsInList)
      ) {
        cards.push({
          type: 'Card',
          lang: item.attributes.langcode,
          bg_color: getColor(item, 'field_background_color', taxonomies),
          title: item.attributes.field_card_title,
          title_color: getColor(item, 'field_title_color', taxonomies),
          text: getTextValue(item.attributes.field_card_text),
          text_color: getColor(item, 'field_text_color', taxonomies),
          button_text: item.attributes.field_card_button_text,
          button_url: item.attributes.field_card_button_url,
          width: item.attributes.field_card_width,
          height: item.attributes.field_card_height,
          image: findImage(item, 'field_ic_image', files, media),
          button_bg_color: getColor(item, 'field_button_color', taxonomies),
        });
      }
      return cards;
    });
  } catch (error) {
    console.log("card converts");
    console.log(error);
  }

  return cards;
}

export const findData = (lang, json, files, media, doc, taxonomies) => {
  if (!json.data || !json.data[0] || !json.data[0].type || !json.data[0].attributes) {
    console.log('error with event data, no data');
    return [];
  }
  const data = json.data[0];
  if (data.type === 'node--event') {
    const attributes = data.attributes;
    const lang = attributes.langcode

    const infoUrl = attributes.field_info_url;
    const infoUrlText = infoUrl && infoUrl.startsWith("https://teams.microsoft") ? "Avaa Teams-tapahtuma" : "Tapahtuman kotisivut";
    return [
      {
        type: 'Subheading',
        lang,
        title: attributes.field_title,
        title_color: "",
        text: '',
      },
      {
        type: 'Text',
        lang,
        title: '',
        text: attributes.field_short_description.value,
      },
      {
        type: 'Date',
        lang,
        startTime: attributes.field_start_time,
        endTime: attributes.field_end_time,
      },
      {
        type: 'Location',
        lang,
        //TODO:
        location: "Internet",
      },
      {
        type: 'Image',
        lang,
        title: '',
        text: '',
        image: attributes.field_image_url,
        height: -1,
      },
      {
        type: 'Text',
        lang,
        title: '',
        text: attributes.field_text.value,
      },
      {
        type: 'Link',
        url: infoUrl,
        url_text: infoUrlText,
      },
      {
        type: 'EventsList',
        lang,
        title: '',
        text: '',
        bgColor: '#f1f1f1',
      }
    ]
  }
  return findPageData(lang, json, files, media, doc, taxonomies);
}

export const findPageData = (lang, json, files, media, doc, taxonomies) => {
  let data = [];
  if (!json.included) {
    console.log('error with data, no json.included');
    return data;
  }
  json.included.map((item, index) => {
    switch (item.type) {
      case 'paragraph--accordion':
        try {
          data.push({
            type: 'Accordion',
            lang: item.attributes.langcode,
            title: item.attributes.field_accordion_title,
            text: getTextValue(item.attributes.field_accordion_text),
          });
        } catch (error) {
          console.log("accordion");
          console.log(error);
        }
        break;
      case 'paragraph--card':
        const cards = convertCardsFromDrupal([item], false, files, media, taxonomies);
        if (cards.length > 0) {
          data.push(cards[0]);
        }
        break;
      case 'paragraph--card_list':
        try {
          const drupalCards = getCards(json.included, item.relationships.field_cards.data);
          const cards = convertCardsFromDrupal(drupalCards, true, files, media, taxonomies);
          data.push({
            type: 'CardList',
            lang: item.attributes.langcode,
            title: item.attributes.field_card_list_title,
            cards: cards,
            bgColor: getColor(item, 'field_card_list_bg_color', taxonomies),
            isKoro: item.attributes.field_card_list_is_koro ? true : false,
          });
        } catch (error) {
          console.log("card-list");
          console.log(error);
        }
        break;
      case 'paragraph--hero':
        try {
          const url = findImage(item, 'field_hero_image', files, media);
          data.push({
            type: 'Hero',
            lang: item.attributes.langcode,
            title: item.attributes.field_hero_title,
            text: getTextValue(item.attributes.field_hero_text),
            url: url,
          });
        } catch (error) {
          console.log("hero");
          console.log(error);
        }
        break;
      case 'paragraph--info':
        try {
          data.push({
            type: 'Info',
            lang: item.attributes.langcode,
            title: item.attributes.field_info_title,
            text: getTextValue(item.attributes.field_info_text),
          });
        } catch (error) {
          console.log("info");
          console.log(error);
        }
        break;
      case 'paragraph--image_and_card':
        try {
          const drupalCards = getCards(json.included, item.relationships.field_ic_card.data);
          const cards = convertCardsFromDrupal(drupalCards, true, files, media, taxonomies);
          const image = findImage(item, 'field_ic_image', files, media);

          data.push({
            type: 'ImageAndCard',
            lang: item.attributes.langcode,
            card: cards[0],
            image: image,
          });
        } catch (error) {
          console.log("image and card");
          console.log(error);
        }
        break;
      case 'paragraph--image':
        try {
          data.push({
            type: 'Image',
            lang: item.attributes.langcode,
            title: '',
            text: '',
            image: findImage(item, 'field_image_image', files, media),
            height: item.attributes.field_image_height,
          });
        } catch (error) {
          console.log("image");
          console.log(error);
        }
        break;
      case 'paragraph--link_internal':
        try {
          const pdfUrl = findPdfUrl(item.relationships.field_media_document.data.id, files, doc);
          data.push({
            type: 'Pdf',
            lang: lang,
            title: item.attributes.field_doc_title,
            text: '',
            url: pdfUrl,
          });
        } catch (error) {
          console.log("pdf");
          console.log(error);
        }
        break;
      case 'paragraph--mainheading':
        try {
          data.push({
            type: 'Mainheading',
            lang: item.attributes.langcode,
            title: item.attributes.field_title,
            title_color: getColor(item, 'field_title_color', taxonomies),
            text: '',
          });
        } catch (error) {
          console.log("subheading");
          console.log(error);
        }
        break;
      case 'paragraph--subheading':
        try {
          data.push({
            type: 'Subheading',
            lang: item.attributes.langcode,
            title: item.attributes.field_subheading_title,
            title_color: getColor(item, 'field_title_color', taxonomies),
            text: '',
          });
        } catch (error) {
          console.log("subheading");
          console.log(error);
        }
        break;
      case 'paragraph--text':
        try {
          data.push({
            type: 'Text',
            lang: item.attributes.langcode,
            title: '',
            text: getTextValue(item.attributes.field_text_demo),

          });
        } catch (error) {
          console.log("text");
          console.log(error);
        }
        break;
      case 'paragraph--phone_number_box':
        try {
          data.push({
            type: 'PhoneNumberBox',
            lang: item.attributes.langcode,
            title: item.attributes.field_pb_title,
            text: getTextValue(item.attributes.field_pb_text),
          });
        } catch (error) {
          console.log("text");
          console.log(error);
        }
        break;
      case 'paragraph--events_list':
        try {
          data.push({
            type: 'EventsList',
            lang: item.attributes.langcode,
            title: '',
            text: '',
            bgColor: '#f1f1f1',
          })
        } catch (error) {
          console.log('events-list');
          console.log(error);
        }
        break;
      case 'paragraph--link':
        try {
          data.push({
            type: 'Link',
            lang: item.attributes.langcode,
            url_text: item.attributes.field_url_text,
            url: item.attributes.field_url,
          })
        } catch(error) {
          console.log('link');
          console.log(error);
        }
        break;
      case 'taxonomy_term--paragraph_width':
        break;
      default:
        data.push({
          type: 'Unid',
          drupalType: item.type,
          lang: item.attributes.langcode,
        });
    }
    return data;
  });
  return data;
}

export const getFullRelease = (conf) => {
  if (!!!conf || !!!conf.data || !!!conf.data) {
    return false;
  }
  return conf.data.data[0].attributes.field_full_release_content;
}

export const findTaxonomy = (data, field) => {
  try {
    let type = data.data[0].relationships[field].data.type;
    let taxonomy = _.find(data.included, { type: type });
    if (taxonomy) {
      return taxonomy.attributes.name;
    }
  } catch (error) {
    console.log(field);
    console.log(error);
  }
  return "";
}

