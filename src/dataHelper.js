
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

export const findData = (lang, json, files, media, doc) => {
  console.log(lang);
  //console.log(json);
  //console.log(files);
  //onsole.log(media);
  let data = [];
  if (!!!json.included) {
    console.log('error with data');
    return data;
  }
  json.included.map((item, index) => {
    //console.log(item);
    //console.log(index);
    switch(item.type) {
      case 'paragraph--accordion':
        data.push({
          type: 'Accordion',
          lang: item.attributes.langcode,
          title: item.attributes.field_accordion_title,
          text: item.attributes.field_accordion_text.value
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
          text: item.attributes.field_hero_text.value,
          url: url,
        });
        console.log('hero');
        console.log(data);
        break;
      case 'paragraph--info':
        data.push({
          type: 'Info',
          lang: item.attributes.langcode,
          title: item.attributes.field_info_title,
          text: '',
        });
        break;
      case 'paragraph--link_internal':
        //console.log(doc);
        //console.log(item.relationships.field_link_media_pdf.data.id);
        let pdfUrl = findPdfUrl(item.relationships.field_link_media_pdf.data.id, files, doc);
        //console.log(pdfUrl);
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
          text: item.attributes.field_text_demo.value,

        });
        break;
      case 'paragraph--phone_number_box':
        data.push({
          type: 'PhoneNumberBox',
          lang: item.attributes.langcode,
          title: item.attributes.field_pb_title,
          text: item.attributes.field_pb_text.value,
        });
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


