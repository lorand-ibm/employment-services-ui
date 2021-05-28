import { find } from 'lodash';

// Taxonomy data is in: .included
export const findTaxonomy = (data, field) => {
  try {
    const type = data.data[0].relationships[field].data.type;
    const taxonomy = find(data.included, {type});
    if (taxonomy) {
      return taxonomy.attributes.name;
    }
  } catch(error) {
    console.log(field);
    console.log(error);
  }

  return "";
}

export const findTaxonomyValue = (id, taxonomies) => {
  try {
    const name = find(taxonomies, {id}).name;
    return name;
  } catch(error) {
    console.log(`taxonomies error: ${id}`);
  }
  return "no-value";
}

export const setTaxonomies = (taxonomiesRaw) => {
  const tax = [];
  try {
    taxonomiesRaw.map((item, index) => {
      item[1].data.data.map((t, i) => {
        tax.push({
          category: item[0],
          type: t.type,
          name: t.attributes.name,
          id: t.id,
        });
        return tax;
      });
      return tax;
    });
  } catch(error) {
    console.log('Taxonomies');
    console.log(error);
  }
  return tax;
}

export const getTaxonomyPath = (drupalUrl, taxonomy, secondPage) => {
  let path = `${drupalUrl}/apijson/taxonomy_term/${taxonomy}?fields[taxonomy_term--${taxonomy}]=id,name`;
  if (secondPage) {
    path += "&page[offset]=50&page[limit]=50";
  }
  return path;
}
