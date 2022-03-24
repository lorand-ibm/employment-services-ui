import Image from "next/image"
import Link from "next/link"
import HtmlBlock from './HtmlBlock'
import { CONTENT_TYPES, TEXT_HTML_FORMAT } from "@/lib/DRUPAL_API_TYPES"
import { DrupalParagraph } from "next-drupal";

import { Accordion } from "hds-react"

interface ContentMapperProps {
  content: any;
}

export function ContentMapper({ content, ...props }: ContentMapperProps): JSX.Element {

  return content.map((item: any) => {
    const {type, id} = item

    const key = `paragraph--${type}-${id}`

    switch(type) {
      case CONTENT_TYPES.TEXT:
        if (!item?.field_text?.processed) {
          console.log('text', item)
          return null
        }
        return <HtmlBlock {...item} key={key} />

      case CONTENT_TYPES.ACCORDION:
        console.log('item', item)
        return (
          <div className="my-16 ifu-accordion" key={key}>
            {item?.field_accordion_items.map(
              (
                {
                  field_accordion_item_content,
                  field_accordion_item_heading,
                  id,
                  type,
                }: any,
                i: number
              ) => {
                return (
                  <Accordion
                    id={id}
                    key={`${type}-${id}`}
                    heading={field_accordion_item_heading}
                  >
                    <ContentMapper content={field_accordion_item_content}/>
                  </Accordion>
                )
              }
            )}
          </div>
        )
      case CONTENT_TYPES.ACCORDION_ITEM:
        console.log('item', item)
        return (
          <Accordion
            border
            card
            heading="How to publish data?"
          >
            Accordion content here
          </Accordion>
        )

      case CONTENT_TYPES.HEADING:
      case CONTENT_TYPES.PARAGRAPH_IMAGE:
      case CONTENT_TYPES.HERO:
      case CONTENT_TYPES.VIDEO_REMOTE:
      case CONTENT_TYPES.FILE:
      case CONTENT_TYPES.MEDIA_IMAGE:
      case CONTENT_TYPES.MEDIA_VIDEO:
      case CONTENT_TYPES.COLUMNS:
      case CONTENT_TYPES.COLUMN_LEFT:
      case CONTENT_TYPES.COLUMN_RIGHT:
        console.log('item', item)
        return <div key={key}>{type}</div>

      default:
        console.log('unmapped type: ', type);
    }
  })
}

export default ContentMapper