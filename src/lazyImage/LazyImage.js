// @flow

import React, {ReactNode} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router';

// Initialize lazy image load, watching for:
//   <img className="lazyload" data-src="..." />
//   <div className="lazyload" data-background="..." />
if (typeof window !== 'undefined') {
  require('lazysizes');
  // Exends to watch attributes: data-bgset, data-include, data-poster, data-bg, data-script
  require('lazysizes/plugins/attrchange/ls.attrchange'); // for React support
  document.addEventListener('lazybeforeunveil', event => {
    const background = event.target.getAttribute('data-bg');
    const backgroundImage = event.target.getAttribute('data-background-image');
    const backgroundColor = event.target.getAttribute('data-background-color');
    if (background) {
      event.target.style.background = background;
    }
    if (backgroundImage) {
      event.target.style.backgroundImage = backgroundImage;
    }
    if (backgroundColor) {
      event.target.style.backgroundColor = backgroundColor;
    }
  });
}

type ImageProps = {
  className?: string,
  src?: string,
};

// Same as <img src="...">, but defers image loading until necessary
// Updates dynamicly when src changes
export const LazyImage = ({className, src, alt, ...props}: ImageProps) => (
  <img className={classnames('lazyload', className)} data-src={src} alt={alt} {...props} />
);

type BackgroundProps = {
  className?: string,
  background?: string,
  backgroundImage?: string,
  backgroundColor?: string,
  children?: ReactNode[],
};

// Same as <div style={{background="..."}}>, but defers image loading until necessary
// Updates dynamicly when background changes
export const LazyBackground = ({className, background, backgroundImage, backgroundColor, children, ...props}: BackgroundProps) => (
  <div className={classnames('lazyload', className)} data-bg={background} data-background-image={backgroundImage} data-background-color={backgroundColor} {...props}>
    {children}
  </div>
);

// Same as <Link style={{background="..."}}>, but defers image loading until necessary
// Updates dynamcily when background changes
export const LazyLink = ({className, background, children, ...props}: BackgroundProps) => (
  <Link className={classnames('lazyload', className)} data-bg={background} {...props}>
    {children}
  </Link>
);
