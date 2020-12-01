import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const MenuLink = ({name, onClick, text, open}) => (
  <button
    className={classNames('user-menu-link', 'user-menu-link--' + name)}
    onClick={onClick}
    aria-expanded={open}
  >
    <span className="visually-hidden">{text}</span>
    <span className="icon" />
    {!!text && <span className="text">{text}</span>}
  </button>
);

MenuLink.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string,
  open: PropTypes.bool
};

MenuLink.defaultProps = {
  onClick: () => {},
};

export default MenuLink;
