import { useRouter } from 'next/router'
import Head from "next/head"
import ErrorPage from 'next/error'

import { GetStaticPropsContext, GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsResult } from "next"

import {
  DrupalNode,
  getPathsFromContext,
  getResourceFromContext,
  getResourceTypeFromContext,
} from "next-drupal"

import { Layout } from "@/components/layout"
import { NodeBasicPage } from "@/components/node-basic-page"

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
      {node.type === "node--page" && <NodeBasicPage node={node} />}
    </Layout>
  )
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {

  const { locale: prefix } = context
  const type = await getResourceTypeFromContext(context, {
    prefix,
  })

  if (!type) {
    return {
      notFound: true,
    }
  }

  let params = {}

  const node = await getResourceFromContext<DrupalNode>(type, context, {
    prefix,
    params,
  })

  if (!node?.status) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      node
    },
    revalidate: 900,
  }
}

export async function getStaticPaths(context: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const paths = await getPathsFromContext(['node--page', 'node--article', 'node--landing_page'], context)
  return {
    paths: paths,
    fallback: true,
  }
}
