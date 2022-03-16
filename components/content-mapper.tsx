import Image from "next/image"
import Link from "next/link"
import HtmlBlock from './HtmlBlock'
import { CONTENT_TYPES, TEXT_HTML_FORMAT } from "@/lib/DRUPAL_API_TYPES"
import { DrupalParagraph } from "next-drupal";

interface ContentMapperProps {
  content: any;
}

export function ContentMapper({ content, ...props }: ContentMapperProps): JSX.Element {

  return content.map((item: any) => {
    const {type, id} = item

    const key = `paragraph--${type}-${id}`

    switch(type) {
      case CONTENT_TYPES.TEXT:
        return <HtmlBlock {...item} key={key} />

      case CONTENT_TYPES.HEADING:
      case CONTENT_TYPES.PARAGRAPH_IMAGE:
      case CONTENT_TYPES.ACCORDION:
      case CONTENT_TYPES.ACCORDION_ITEM:
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