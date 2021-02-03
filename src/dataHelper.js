let _ = require('lodash');

const findSubmenu = (m, uri) => {
  let subs = [];
  let name = uri.substring(10);
  m.data.data.map((item, index) => {
    if ((item.attributes.menu_name.replace('_', '-')) === name.replace('_', '-')) {
      subs.push( {
        name: item.attributes.title,
        link: item.attributes.link.uri,
        items: findSubmenu(m, item.attributes.link.uri),
        weight: item.attributes.weight,
      });
    }
    return subs;
  });
  let subs2 = _.orderBy(subs, ['weight'],['asc']);
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
  let menu2 = _.orderBy(menu, ['weight'],['asc']);
  return menu2;
}

export const findImageUrl = (uid, files, media) => {
  if (!!!files || !!!files.data || !!!media || !!!media.data) {
    return "";
  }
  const mIndex = media.data.data.findIndex(item => item.id === uid);
  const imageUid = media.data.data[mIndex].relationships.field_media_image.data.id;
  const fIndex = files.data.data.findIndex(item => item.id === imageUid);
  //console.log(files.data.data[fIndex].attributes.uri); console.log(uid); console.log(files.data.data[0].id);
  return files.data.data[fIndex].attributes.uri.url;
}

export const findPdfUrl = (uid, files, pdfs) => {
  if (!!!files || !!!files.data || !!!pdfs || !!!pdfs.data) {
    return "";
  }
  const pIndex = pdfs.data.data.findIndex(item => item.id === uid);
  //console.log(pIndex); console.log(pdfs.data.data[pIndex]);

  const pdfUid = pdfs.data.data[pIndex].relationships.field_media_document.data.id;
  const fIndex = files.data.data.findIndex(item => item.id === pdfUid);
  //console.log(files.data.data[fIndex].attributes.uri); console.log(uid); console.log(files.data.data[0].id);
  //console.log(files);
  return files.data.data[fIndex].attributes.uri.url;
}

const getTextValue = (path) => {
  if (!!!path || !!!path.value) {
    return "";
  }
  return path.value;
}

export const findData = (lang, json, files, media, doc) => {
  let data = [];
  if (!!!json.included) {
    console.log('error with data, no json.included');
    return data;
  }
  json.included.map((item, index) => {
    //console.log(item.type);
    switch(item.type) {
      case 'paragraph--accordion':
        //console.log(item);
        data.push({
          type: 'Accordion',
          lang: item.attributes.langcode,
          title: item.attributes.field_accordion_title,
          text: getTextValue(item.attributes.field_accordion_text),
        });
        break;
      case 'paragraph--card':
        data.push({
          type: 'Card',
          lang: item.attributes.langcode,
          title: item.attributes.field_card_title,
          text: getTextValue(item.attributes.field_card_text),
          button_text: item.attributes.field_card_button_text ,
        });
        break;
      case 'paragraph--hero':
        let url = null;
        if (!!!item.relationships.field_hero_image || !!item.relationships.field_hero_image.data) {
          url = findImageUrl(item.relationships.field_hero_image.data.id, files, media);
        }
        data.push({
          type: 'Hero',
          lang: item.attributes.langcode,
          title: item.attributes.field_hero_title,
          text: getTextValue(item.attributes.field_hero_text),
          url: url,
        });
        break;
      case 'paragraph--info':
        data.push({
          type: 'Info',
          lang: item.attributes.langcode,
          title: item.attributes.field_info_title,
          text: getTextValue(item.attributes.field_info_text),
        });
        break;
      case 'paragraph--image_and_card':
        let image = null;
        if (item.relationships.field_ic_image.data) {
          image = findImageUrl(item.relationships.field_ic_image.data.id, files, media);
        }
        data.push({
          type: 'ImageAndCard',
          lang: item.attributes.langcode,
          title: '',
          text: '',
          image: image,
        });
        break;
      case 'paragraph--image':
        data.push({
          type: 'Image',
          lang: item.attributes.langcode,
          title: '',
          text: '',
          image: findImageUrl(item.relationships.field_image_image.data.id, files, media),
        });
        break;
      case 'paragraph--link_internal':
        let pdfUrl = findPdfUrl(item.relationships.field_media_document.data.id, files, doc);
        data.push({
          type: 'Pdf',
          lang: lang,
          title: item.attributes.field_doc_title,
          text: '',
          url: pdfUrl,
        });
        break;
      case 'paragraph--subheading':
        data.push({
          type: 'Subheading',
          lang: item.attributes.langcode,
          title: item.attributes.field_subheading_title,
          text: '',
        });
        break;
      case 'paragraph--text':
        data.push({
          type: 'Text',
          lang: item.attributes.langcode,
          title: '',
          text: getTextValue(item.attributes.field_text_demo),

        });
        break;
      case 'paragraph--phone_number_box':
        data.push({
          type: 'PhoneNumberBox',
          lang: item.attributes.langcode,
          title: item.attributes.field_pb_title,
          text: getTextValue(item.attributes.field_pb_text),
        });
        break;
      case 'taxonomy_term--paragraph_width':
        break;
      default:
        data.push({
          type: 'Unid',
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
    console.log(data.$field);
    return "Narrow";
}

