import { Container } from "hds-react";
import { Layout } from './Layout'
import ContentMapper from './content-mapper'

interface NodeBasicPageProps {
  node: any,
}

export function NodeBasicPage({ node, ...props }: NodeBasicPageProps): JSX.Element {

  return (
    <Layout>
      <article>
        <Container className="container">
          <div className="columns">
            <div className="col col-4">
              Sidebar
            </div>
            <div className="col col-8">
              <h1 className="text-6xl font-black mb-4 leading-tight">{node.title}</h1>
              {node.body?.processed && (
                <div
                  dangerouslySetInnerHTML={{ __html: node.body?.processed }}
                  className="mt-6 font-serif text-xl leading-loose prose"
                />
              )}

              {node.field_content?.length > 0 && (
                <ContentMapper content={node.field_content}/>
              )}
            </div>
          </div>
        </Container>
      </article>
    </Layout>
  )
}

export default NodeBasicPage
