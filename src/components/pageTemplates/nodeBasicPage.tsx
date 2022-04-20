import { Container } from "hds-react";
import { Layout } from '../layout/Layout'
import ContentMapper from '../contentMapper'

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
            <div className="col col-8 flex-grow">
              <h1>{node.title}</h1>
              {node.body?.processed && (
                <div
                  dangerouslySetInnerHTML={{ __html: node.body?.processed }}
                />
              )}

              {node.field_content?.length > 0 && (
                <ContentMapper content={node.field_content}/>
              )}
            </div>
          </div>
          <div className="columns">
            <div className="col col-12">
              Lower content region placeholder
            </div>
          </div>
        </Container>
      </article>
    </Layout>
  )
}

export default NodeBasicPage
