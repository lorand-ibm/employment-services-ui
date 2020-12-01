import React, {Component} from 'react';
import {Row, Column} from 'react-foundation';
import get from 'lodash/get';
import omit from 'lodash/omit';
import forEach from 'lodash/forEach';

import SimpleQuote from '../../simpleQuote/SimpleQuote';
import RichBlock from '../../richBlocks/RichBlock';
import {Colors} from '../../constants';

type Props = {
  content: any,
};

class InfoRichBlock extends Component {
  props: Props;

  getRichBlocks = () => {
    const richBlockData = get(this.props.content, 'field_rich_block'),
      richBlocks = [];

    forEach(richBlockData, item => {
      const richBlock = {
        title: get(item, 'field_title', ''),
        body: get(item, 'field_text_with_summary[0].value', ''),
      };

      const image = get(item, 'field_media[0].field_image[0].styles.square_600', '');
      if (image) {
        richBlock.image = image;
      }

      const summary = get(item, 'field_text_with_summary[0].summary');
      if (summary) {
        richBlock.summary = summary;
      }

      richBlocks.push(richBlock);
    });

    return richBlocks;
  };

  getQuote = () => {
    const quoteData = get(this.props.content, 'field_simple_quote[0]');

    if (!quoteData) {
      return null;
    }

    const sourceImage = get(quoteData, 'field_source_image[0].field_image[0].styles.square_150');

    return {
      body: get(quoteData, 'body[0].value'),
      sourceTitle: get(quoteData, 'field_title'),
      sourceText: get(quoteData, 'field_source'),
      sourceImage: sourceImage ? sourceImage : null,
    };
  };

  render() {
    const quote = this.getQuote();

    return (
      <div className="info-rich-block">
        {quote && (
          <Row>
            <Column>
              <SimpleQuote {...omit(quote, ['body'])}>
                <div dangerouslySetInnerHTML={{__html: quote.body}} />
              </SimpleQuote>
            </Column>
          </Row>
        )}
        <div className="info-rich-block__rich-blocks">
          <div className="info-rich-block__rich-blocks-spacer" />
          <Row>
            <Column>
              <div className="info-rich-block__rich-blocks-wrapper">
                {this.getRichBlocks().map((richBlock, i) => (
                  <RichBlock
                    key={i}
                    title={richBlock.title}
                    image={richBlock.image}
                    color={Colors.HEL_MEDIUM_GRAY}
                  >
                    <div dangerouslySetInnerHTML={{__html: richBlock.body}} />
                  </RichBlock>
                ))}
              </div>
            </Column>
          </Row>
        </div>
      </div>
    );
  }
}

export default InfoRichBlock;
