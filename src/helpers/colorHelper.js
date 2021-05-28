import { find } from 'lodash';
import { findTaxonomyValue } from "./taxonomiesHelper";

const colors = [
  {name: 'bussi', rgb: '#0000bf'},
  {name: 'hopea', rgb: '#dedfe1'},
  {name: 'musta', rgb: '#000'},
  {name: 'metro', rgb: '#fd4f00'},
  {name: 'musta-05', rgb: '#f1f1f1'},
  {name: 'musta-20', rgb: '#ccc'},
  {name: 'musta-60', rgb: '#666'},
  {name: 'musta-90', rgb: '#1a1a1a'},
  {name: 'sumu', rgb: '#9fc9eb'},
  {name: 'sumu-medium-light', rgb: '#d0e6f7'},
  {name: 'suomenlinna', rgb: '#f5a3c7'},
  {name: 'suomenlinna-medium-light', rgb: '#ffdbeb'},
  {name: 'valkoinen', rgb: '#fff'},
];

const getColor = (item, field, taxonomies) => {
  try {
    const id = item.relationships[field].data.id;
    const name = findTaxonomyValue(id, taxonomies);
    const c = find(colors, { name }).rgb;
    if (!c) {
      console.log(`undefined color ${id} ${name}`);
    }
    return c;
  } catch(error) {
    console.log(error)
  }
  return null;
}

export default getColor;