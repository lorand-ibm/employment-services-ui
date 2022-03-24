import { useRouter } from 'next/router'
import Head from "next/head"
import ErrorPage from 'next/error'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'

import { GetStaticPropsContext, GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsResult } from "next"

import {
  Locale,
  DrupalNode,
  DrupalParagraph,
  getPathsFromContext,
  getResource,
  getResourceFromContext,
  getResourceTypeFromContext,
} from "next-drupal"

import { Layout } from "@/components/layout"
import NodeBasicPage from "@/components/node-basic-page"

import { NODE_TYPES, CONTENT_TYPES } from "@/lib/DRUPAL_API_TYPES"
interface PageProps {
  node: DrupalNode
}

export default function Page({ node }: PageProps) {
  const router = useRouter()
  if (!router.isFallback && !node?.id) {
    return <ErrorPage statusCode={404} />
  }

  if (!node) return null

  return (
    <Layout>
      <Head>
        <title>{node.title}</title>
        <meta name="description" content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      {node.type === "node--page" && (
        <NodeBasicPage node={node} />
      )}
    </Layout>
  )
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {

  // Cast the locales because getResource consumes the options as JsonApiWithLocaleOptions | undefined.
  const { locale, defaultLocale } = context as { locale: Locale, defaultLocale: Locale }

  const type = await getResourceTypeFromContext(context)

  if (!type) {
    return {
      notFound: true,
    }
  }

  // let params = {};
  const params = new DrupalJsonApiParams()
    .addInclude([
      'field_content',
      // Accordion: text, images, links, columns
      'field_content.field_accordion_items.field_accordion_item_content.field_columns_left_column.field_image.field_media_image',
      'field_content.field_accordion_items.field_accordion_item_content.field_columns_right_column.field_image.field_media_image',
      'field_content.field_accordion_items.field_accordion_item_content.field_image.field_media_image',
    ])
    .addFields(CONTENT_TYPES.TEXT, ['field_text'])// Text paragraph
    .addFields(CONTENT_TYPES.ACCORDION, ['field_accordion_items'])
    .addFields(CONTENT_TYPES.ACCORDION_ITEM, [
      'field_accordion_item_content',
      'field_accordion_item_heading',
      'field_accordion_item_content',
    ])
    .addFields(CONTENT_TYPES.MEDIA_IMAGE, [
      'field_media_image',
      'field_photographer',
    ])
    // Columns
    .addFields(CONTENT_TYPES.COLUMNS, [
      'field_columns_left_column',
      'field_columns_right_column',
      'field_image',
    ])
    .getQueryObject()

  const node = await getResourceFromContext<DrupalNode>(type, context, {
    params,
  })

  if (!node?.status) {
    return {
      notFound: true,
    }
  }

  // @TODO: Generalize this by looping a configurable field name array?
  // Get the appropriate locale specific entity referenced paragraphs.
  // if(node.field_content && node.field_content.length > 0) {
  //   const field_content = node?.field_content.map((paragraph: any) => {
  //     return getResource<DrupalParagraph>(paragraph.type, paragraph.id, {
  //       locale,
  //       defaultLocale, // @TODO: We might want to use the node's default language here instead of the site's.
  //     })
  //   })

  //   node.field_content = await Promise.all(field_content)
  // }

  return {
    props: {
      node
    },
    revalidate: 1,
  }
}


export async function getStaticPaths(context: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  // @TODO: Define this type array in the api.
  const paths = await getPathsFromContext(['node--page', 'node--article', 'node--landing_page'], context)
  return {
    paths: paths,
    fallback: 'blocking',
  }
}
