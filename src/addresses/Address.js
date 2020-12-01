import React, {Component} from 'react';

type Props = {
  body: String,
  title: String,
};

class Address extends Component {
  props: Props;

  static defaultProps = {
    body: '',
    title: '',
  };

  render() {
    const {body, title} = this.props;

    return (
      <div className="address">
        <h4 className="address__title">{title}</h4>
        <div className="address__body" dangerouslySetInnerHTML={{__html: body}} />
      </div>
    );
  }
}

export default Address;
