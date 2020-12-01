import React, {Component} from 'react';
import classNames from 'classnames';
import shuffle from 'lodash/shuffle';
import i18n from '../root/i18n';

type Props = {
  className: String,
  show: Boolean,
  itemCount: Number,
  delay: Number,
};

const iconClassNames = [
  'myhki-load-indicator-icon myhki-load-indicator-icon--heart-1',
  'myhki-load-indicator-icon myhki-load-indicator-icon--heart-2',
  'myhki-load-indicator-icon myhki-load-indicator-icon--heart-3',
  'myhki-load-indicator-icon myhki-load-indicator-icon--heart-4',
  'myhki-load-indicator-icon myhki-load-indicator-icon--heart-5',
];

class LoadIndicator extends Component {
  props: Props;

  static defaultProps = {
    show: false,
    itemCount: 3,
    delay: 400,
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: props.show,
      hidden: !props.show,
      renderItems: false,
    };

    this.visibleTimeout = null;
    this.hiddenTimeout = null;
    this.renderItemsTimeout = null;
  }

  hide = () => {
    const {delay} = this.props;
    if (this.visibleTimeout) {
      clearTimeout(this.visibleTimeout);
    }

    this.visibleTimeout = setTimeout(() => {
      this.setState({
        visible: false,
      });

      if (this.hiddenTimeout) {
        clearTimeout(this.hiddenTimeout);
      }

      this.hiddenTimeout = setTimeout(() => {
        this.setState({
          hidden: true,
        });
      }, 200);
    }, delay);
  };

  show = () => {
    this.setState({
      visible: true,
      hidden: false,
    });
  };

  componentDidMount() {
    this.renderItemsTimeout = setTimeout(() => {
      this.setState({renderItems: true});
    }, 10);
  }

  componentWillUnmount() {
    clearTimeout(this.visibleTimeout);
    clearTimeout(this.hiddenTimeout);
    clearTimeout(this.renderItemsTimeout);
  }

  componentWillReceiveProps(nextProps: Props) {
    const {show} = this.props,
      {show: nextShow} = nextProps;

    if (nextShow !== show) {
      nextShow ? this.show() : this.hide();
    }
  }

  getItems = () => {
    const {itemCount} = this.props,
      items = [];

    for (let i = 0; i < itemCount; i++) {
      /*items.push(
        <div key={i} className="myhki-load-indicator__item">
          <div className="myhki-load-indicator__item-wrapper">
            {shuffle(iconClassNames).map((icon, iconIndex) => (
              <div key={iconIndex} className={icon} />
            ))}
          </div>
        </div>,
      );*/
    }

    return items;
  };

  render() {
    const {className} = this.props,
      {visible, hidden, renderItems} = this.state;

    return (
      <div
        role="img"
        aria-label={i18n.t('loading')}
        className={classNames('myhki-load-indicator', className, {
          'myhki-load-indicator--visible': visible,
          'myhki-load-indicator--hidden': hidden,
        })}
      >
        <div className="myhki-load-indicator__wrapper">
          <div className="myhki-load-indicator__items">{!!renderItems && this.getItems()}</div>
        </div>
      </div>
    );
  }
}

export default LoadIndicator;
