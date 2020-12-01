import React, {Component} from 'react';
import isExternal from 'is-url-external';
import get from 'lodash/get';

type Props = {
  paragraph: Object,
};

export class TextParagraph extends Component {
  props: Props;

  getHtmlfromText = (text: string) => {
    if (typeof window !== 'undefined') {
      var el = document.createElement('div');
      el.innerHTML = text;
      const anchors = Array.from(el.getElementsByTagName('a'));
      // Open external links in a new tab
      anchors.forEach(anchor => {
        if (isExternal(anchor.href)) {
          anchor.target = '_blank';
        }
      });
      return el.innerHTML;
    } else {
      return text;
    }
  };

  render() {
    const {paragraph} = this.props;

    if (!get(paragraph, 'value')) {
      return null;
    }

    return (
      <div className="myhki-paragraph myhki-paragraph--text">
        <div dangerouslySetInnerHTML={{__html: this.getHtmlfromText(paragraph.value)}} />
      </div>
    );
  }
}

export default TextParagraph;
