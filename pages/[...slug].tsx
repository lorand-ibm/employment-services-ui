import { useRouter } from 'next/router'
import Head from "next/head"
import ErrorPage from 'next/error'

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
import Error from 'next/error'

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

  let params = {}

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
  if(node.field_content && node.field_content.length > 0) {
    const field_content = node?.field_content.map((paragraph: any) => {
      return getResource<DrupalParagraph>(paragraph.type, paragraph.id, {
        locale,
        defaultLocale, // @TODO: We might want to use the node's default language here instead of the site's.
      })
    })

    node.field_content = await Promise.all(field_content)
  }

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
