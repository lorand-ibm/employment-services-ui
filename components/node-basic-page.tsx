import ContentMapper from './content-mapper'

interface NodeBasicPageProps {
  node: any,
}

export function NodeBasicPage({ node, ...props }: NodeBasicPageProps): JSX.Element {

  return (
    <article {...props}>
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
    </article>
  )
}

export default NodeBasicPage