import { DrupalJsonApiParams } from 'drupal-jsonapi-params'

import { NODE_TYPES, CONTENT_TYPES } from './drupalApiTypes'

export function getParams(type: string) {

  let params = new DrupalJsonApiParams()

  if (type === NODE_TYPES.PAGE) {
    params.addInclude([
      'field_content',
    ])
    .addInclude([
      'field_content.field_accordion_items.field_accordion_item_content',
      'field_content.field_list_of_links_links',
    ])
  }

  return params.getQueryObject()
}