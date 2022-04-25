import {IconArrowRight, IconArrowTopRight } from 'hds-react'
import styles from './link.module.css'

interface LinkProps {
  href: string
  text: string
}

function Link(props: LinkProps): JSX.Element {
  const { href, text} = props;
  const isExternalLink = href && (href.startsWith("https://") || href.startsWith("http://"));

  return (
    <a href={href} className={`${styles.link} ${isExternalLink ? styles.external : styles.internal }`}>
      <span>{text}</span>
      {isExternalLink ? <IconArrowTopRight size="l" /> : <IconArrowRight size="l" />}
    </a>
  );
}

export default Link;
