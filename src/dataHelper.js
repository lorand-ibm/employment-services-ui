
export const findData = (lang, json) => {
  console.log(lang);
  console.log(json);
  let data = [];
  if (!!!json.included) {
    console.log('error with data');
    return data;
  }
  json.included.map((item, index) => {
    switch(item.type) {
      case 'paragraph--accordion':
        data.push({type: 'Accordion', title: item.attributes.field_accordion_title, text: item.attributes.field_accordion_text.value});
        break;
      case 'paragraph--hero':
        data.push({
          type: 'Hero',
          title: item.attributes.field_hero_title,
          text: item.attributes.field_hero_text.value,
        });
        break;
      case 'paragraph--info':
        data.push({type: 'Info', title: item.attributes.field_info_title, text: '' });
        break;
      case 'paragraph--link_external':
        data.push({type: 'Pdf', title: item.attributes.field_link_external_url.title, text: item.attributes.field_link_external_url.uri });
        break;
      case 'paragraph--subheading':
        data.push({type: 'Subheading', title: item.attributes.field_subheading_title, text: '' });
        break;
      case 'paragraph--text':
        data.push({type: 'Text', title: '', text: item.attributes.field_text_demo.value });
        break;
      case 'paragraph--phone_number_box':
        data.push({type: 'PhoneNumberBox', title: item.attributes.field_pb_title, text: item.attributes.field_pb_text.value });
        break;
    }
    return data;
  });
  return data;
}
