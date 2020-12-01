import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import RichBlock from './RichBlock';
import {Colors} from '../constants';
import classNames from 'classnames';

type Props = {
  items: Array,
  background: String,
  defaultCardColor: String,
  collapseMargins: Boolean,
};

class RichBlocks extends Component {
  props: Props;

  static defaultProps = {
    items: [],
    background: 'transparent',
    defaultCardColor: Colors.HEL_MEDIUM_GRAY,
    collapseMargins: false,
  };

  render() {
    const {items, background, defaultCardColor, collapseMargins} = this.props;
    return (
      <div
        className={classNames(
          'myhki-rich-blocks',
          {'myhki-rich-blocks--collapse-margins': collapseMargins}
        )}
        style={{background: background}}
      >
        {!collapseMargins && (
          <div className="myhki-rich-blocks__spacer" />
        )}
        <Row>
          <Column>
            <div className="myhki-rich-blocks__wrapper">
              {items.map((richBlock, i) => (
                <RichBlock
                  key={i}
                  title={richBlock.title}
                  image={richBlock.image}
                  link={richBlock.link}
                  placeholder={richBlock.placeholder}
                  color={richBlock.color ? richBlock.color : defaultCardColor}
                  showLike={richBlock.showLike}
                  onLike={richBlock.onLike}
                  sustainabilityStatus={richBlock.sustainabilityStatus}
                >
                  <div dangerouslySetInnerHTML={{__html: richBlock.body}} />
                </RichBlock>
              ))}
            </div>
          </Column>
        </Row>
      </div>
    );
  }
}

export default RichBlocks;
