import React, {Component} from 'react';
import classNames from 'classnames';

import LinkDuo from '../linkduo/LinkDuo';

type Props = {
  className: String,
  image: String,
  color: String,
  text: String,
  link: Object,
};

export class CTABlock extends Component {
  props: Props;

  render() {
    const {className, image, color, text, link} = this.props;
    return (
      <div className={classNames('myhki-cta-block', className)} style={{backgroundColor: color}}>
        {!!image && (
          <div className="myhki-cta-block__image">
            <img src={image} />
          </div>
        )}
        {!!text && <div className="myhki-cta-block__text">{text}</div>}
        {link && (
          <LinkDuo className="myhki-cta-block__link button hollow" to={link.link}>
            {link.text}
          </LinkDuo>
        )}
      </div>
    );
  }
}

export default CTABlock;
