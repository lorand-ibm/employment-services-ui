import Link from '@/components/link/Link'
import styles from './listOfLinks.module.css'

interface ListOfLinksProps {
  field_list_of_links_design: string
  field_list_of_links_links: any
  field_list_of_links_title: string
}

function ListOfLinks(props: ListOfLinksProps): JSX.Element {
  const { field_list_of_links_design, field_list_of_links_links, field_list_of_links_title } = props;
  // TODO: Different component based on selected design

  return (
    <>
      <h2>{field_list_of_links_title}</h2>
      <div className={styles.listOfLinks}>
        { field_list_of_links_links.map((link: any, key: any) => (
          <div className={`${styles.linkItem} link-item`} key={key}>
            <h4 className="flex">
              <Link
                href={link.field_list_of_links_link.url}
                text={link.field_list_of_links_link.title}
              />
            </h4>
            <div>{link.field_list_of_links_desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListOfLinks;
