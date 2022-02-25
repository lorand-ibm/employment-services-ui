import * as React from "react"
import { GetStaticPropsContext, GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
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

export async function getStaticPaths(context: GetStaticPropsContext): Promise<GetStaticPathsResult> {
  return {
    //paths: await getPathsFromContext(["node--page"], context),
    paths: [],
    fallback: "blocking",
  }
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {
  const { locale } = context
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

  return {
    props: {
      node
    },
    revalidate: 900,
  }
}
