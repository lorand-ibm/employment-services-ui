import React, {Component} from 'react';
import {withRouter} from 'react-router';
import classNames from 'classnames';

import {LiftUpCollectionTypes} from '../constants';
import {getFoundationBreakpoint} from '../helpers.js';

import LiftUpCollectionItem from './LiftUpCollectionItem';

type Props = {
  className: String,
  items: [],
};

class LiftUps extends Component {
  props: Props;

  static defaultProps = {
    className: '',
    items: [],
  };

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

  getLiftUpType = (index, count) => {
    if (this.state.breakpoint === 'small') {
      switch (index) {
        case 0:
        case 1:
          return count > 2 ? LiftUpCollectionTypes.DEFAULT : LiftUpCollectionTypes.HORIZONTAL;
        case 2:
          return LiftUpCollectionTypes.VERTICAL;
        case 3:
          return LiftUpCollectionTypes.HORIZONTAL;
        default:
          return LiftUpCollectionTypes.DEFAULT;
      }
    } else {
      switch (index) {
        case 0:
        case 1:
          return count > 3 ? LiftUpCollectionTypes.DEFAULT : LiftUpCollectionTypes.HORIZONTAL;
        case 2:
          return count > 3 ? LiftUpCollectionTypes.HORIZONTAL : LiftUpCollectionTypes.VERTICAL;
        case 3:
          return LiftUpCollectionTypes.VERTICAL;
        default:
          return LiftUpCollectionTypes.DEFAULT;
      }
    }
  };

  getLiftUpItem = (item, index) => {
    return (
      <LiftUpCollectionItem
        key={index}
        {...item}
        type={this.getLiftUpType(index, this.props.items.length)}
      />
    );
  };

  render() {
    const {className, items} = this.props,
      count = items.length,
      wrappedItems = count > 2 ? items.slice(0, 2) : items;

    return (
      <div
        className={classNames('myhki-lift-up-collection', className, {
          mobile: this.state.breakpoint === 'small',
        })}
      >
        <div className="myhki-lift-up-collection__wrapper">
          <div
            className={classNames('myhki-lift-up-collection__wrapper-inner', {
              horizontal: count === 3,
            })}
          >
            {wrappedItems.map((item, i) => {
              return this.getLiftUpItem(item, i);
            })}
          </div>
          {count > 2 && this.getLiftUpItem(items[2], 2)}
        </div>
        {count > 3 && this.getLiftUpItem(items[count - 1], count - 1)}
      </div>
    );
  }
}

export default withRouter(LiftUps);
