import React from 'react';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import {translate} from 'react-i18next';

type Props = {
  className: String,
  title: String,
};

const copyUrlToClipboard = url => {
  copy(url);
};

const openFacebookShare = () => {
  const url = global.IS_CLIENT ? encodeURIComponent(window.location.href) : '';
  const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

  window.open(facebookShareLink, '_blank',	
  );
};

const openTwitterShare = () => {
  const url = global.IS_CLIENT ? encodeURIComponent(window.location.href) : '';
  const text = global.IS_CLIENT ? encodeURIComponent(document.title) : '';
  const twitterShareLink = `https://twitter.com/share?url=${url}&text=${text}`;

  window.open(twitterShareLink, '_blank',	
  );
};

const openLinkedInShare = () => {
  const url = global.IS_CLIENT ? encodeURIComponent(window.location.href) : '';
  const text = global.IS_CLIENT ? encodeURIComponent(document.title) : '';
  const linkedInShareLink = `https://www.linkedin.com/shareArticle?mini=true&title=${text}&url=${url}`;

  window.open(linkedInShareLink, '_blank',	
  );
};

const ShareLinks = ({ className, title, t }: Props) => {

  return (
    <div className={classNames('myhki-share-links', className)}>
      <ul>
        {!!title && (
          <li>
            <span className="myhki-share-links__title">{title}</span>
          </li>
        )}
        <li>
          <button
            className="myhki-share-link myhki-share-link--link"
            onClick={() => {
              if (global.IS_CLIENT) {
                copyUrlToClipboard(window.location.href);
              }
            }}
          >
            <span className="visually-hidden">{t('copyLinkToClipboard')}</span>
          </button>
        </li>
        <li>
          <button
            className="myhki-share-link myhki-share-link--facebook"
            onClick={openFacebookShare}
          >
            <span className="visually-hidden">{t('shareOnFacebook')}</span>
            <span className="visually-hidden">{t('common:linkWarning')}</span>
          </button>
        </li>
        <li>
          <button
            className="myhki-share-link myhki-share-link--twitter"
            onClick={openTwitterShare}
          >
            <span className="visually-hidden">{t('shareOnTwitter')}</span>
            <span className="visually-hidden">{t('common:linkWarning')}</span>
          </button>
        </li>
        <li>
          <button
            className="myhki-share-link myhki-share-link--linkedin"
            onClick={openLinkedInShare}
          >
            <span className="visually-hidden">{t('shareOnLinkedin')}</span>
            <span className="visually-hidden">{t('common:linkWarning')}</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default translate(['shareLinks'])(ShareLinks);
