import Link from "next/link"

import { PreviewAlert } from "@/components/preview-alert"

interface LayoutProps {
  children: any;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <PreviewAlert />
      <div>
        <header>
          <div>
            <Link href="/" passHref>
              <a>
                Next.js for Drupal
              </a>
            </Link>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </>
  )
}
