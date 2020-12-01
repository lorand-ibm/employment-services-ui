import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import DropdownMenu from './DropdownMenu';

type Props = {
  active: String | Number,
  activeLabel: String,
  className: String,
  displayCaret: Boolean,
  icon: Object,
  iconPlacement: String,
  items: Array,
  onItemClick: Function,
  placeholder: String,
};

class Dropdown extends Component {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  componentDidMount() {
    if (global.IS_CLIENT) {
      document.addEventListener('click', this.onDocumentClick);
    }
  }

  componentWillUnmount() {
    if (global.IS_CLIENT) {
      document.removeEventListener('click', this.onDocumentClick);
    }
  }

  onDocumentClick = event => {
    const target = event.target,
      el = ReactDOM.findDOMNode(this);

    if (this.state.menuOpen && target !== el && !el.contains(target)) {
      this.setState({
        menuOpen: false,
      });
    }
  };

  onLinkClick = () => {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  };

  onMenuItemClick = item => {
    const {onItemClick} = this.props;
    this.setState({
      menuOpen: false,
    });

    return onItemClick(item);
  };

  getMenu = () => {
    const {active, items} = this.props;

    return (
      <DropdownMenu
        open={this.state.menuOpen}
        active={active}
        items={items}
        onItemClick={this.onMenuItemClick}
      />
    );
  };

  render() {
    const {
      active,
      activeLabel = 'label',
      className,
      displayCaret = true,
      icon,
      iconPlacement = 'left',
      placeholder,
    } = this.props;

    return (
      <div className={classNames('myhki-dropdown', className)}>
        <button className="myhki-dropdown__button" onClick={this.onLinkClick} aria-expanded={this.state.menuOpen}>
          {icon && iconPlacement === 'left' && icon}
          {isEmpty(active) && placeholder && <span className="title">{placeholder}</span>}
          {!isEmpty(active) && <span className="title">{active[activeLabel]}</span>}
          {displayCaret && <i className="fa fa-caret-down" aria-hidden="true" />}
          {icon && iconPlacement === 'right' && icon}
        </button>
        {this.getMenu()}
      </div>
    );
  }
}

export default Dropdown;
