let _ = require('lodash');

// Taxonomy data is in: .included
export const findTaxonomy = (data, field) => {
  console.log(data.included);

  try {
    let type = data.data[0].relationships[field].data.type;
    let taxonomy = _.find(data.included, {type: type});
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
  return _.find(taxonomies, {id: id}).name;
}

export const setTaxonomies = (taxonomiesRaw) => {
  let tax = [];
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
