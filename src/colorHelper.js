import {findTaxonomyValue} from "./taxonomiesHelper.js";
let _ = require('lodash');

const colors = [
  {name: 'musta', rgb: '#000'},
  {name: 'valkoinen', rgb: '#fff'},
  {name: 'musta-05', rgb: '#f1f1f1'},
  {name: 'musta-20', rgb: '#ccc'},
  {name: 'musta-60', rgb: '#666'},
  {name: 'bussi', rgb: '#0000bf'},
  {name: 'sumu', rgb: '#9fc9eb'},
  {name: 'sumu-medium-light', rgb: '#d0e6f7'},
  {name: 'metro', rgb: '#fd4f00'},
  {name: 'suomenlinna', rgb: '#f5a3c7'},
  {name: 'suomenlinna-medium-light', rgb: '#ffdbeb'},
];

export const getColor = (item, field, taxonomies) => {
  try {
    const id = item.relationships[field].data.id;
    const name = findTaxonomyValue(id, taxonomies);
    const c = _.find(colors, {name: name}).rgb;
    if (!c) {
      console.log('undefined color ' + id + ' ' + name);
    }
    return c;
  } catch(error) {

  }
  return null;
}
