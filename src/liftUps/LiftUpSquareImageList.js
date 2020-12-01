import React, {Component} from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';
import LiftUpSquareImage from './LiftUpSquareImage';
import {getFoundationBreakpoint} from '../helpers';
import {getContentPath, getContentCoverImage} from '../content/helpers';

type Props = {
  t: any,
  className: String,
  items: Array,
  initialImageLeft: Boolean,
};

class LiftUpSquareImageList extends Component {
  props: Props;

  static defaultProps = {
    flip: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      breakpoint: getFoundationBreakpoint(),
    };
  }

  updateBreakpoint = () => {
    this.setState({
      breakpoint: getFoundationBreakpoint(),
    });
  };

  componentDidMount() {
    if (global.IS_CLIENT) {
      window.addEventListener('resize', this.updateBreakpoint);
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      window.removeEventListener('resize', this.updateBreakpoint);
    }
  }

  getContext = (content) => {
    const path = decodeURI(getContentPath(content));
    const pathParts = (path || '').split('/');
    const context = pathParts.length > 2
      ? pathParts[pathParts.length - 2]
      : 'MyHelsinki';
    return context;
  }

  getLiftUpItem = (item, initialImageLeft, index) => {

    // Place every other image to the left. Initial set by 'flip'.
    const imageLeft = !!((index%2 === 1) ^ initialImageLeft);

    const image = getContentCoverImage(item);
    const context = this.getContext(item);
    const link = getContentPath(item);

    return (
      <LiftUpSquareImage
        context={context}
        title={item.title}
        link={link}
        image={image}
        imageLeft={imageLeft}
        key={index}
      />
    );
  };

  render() {
    const {className, items, initialImageLeft} = this.props;

    const liftUpItems = [].concat(items || []); // ensure is array

    return (
      <div
        className={classNames('myhki-lift-up-collection', className)}
      >
        <div className="myhki-lift-up-collection__wrapper">
          <div
            className={classNames('myhki-lift-up-collection__wrapper-inner')}
          >
            {liftUpItems.map((item, i) => {
              return this.getLiftUpItem(item, initialImageLeft, i);
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LiftUpSquareImageList);
