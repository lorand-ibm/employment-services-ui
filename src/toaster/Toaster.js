// @flow

import flowRight from 'lodash/flowRight';
import reverse from 'lodash/reverse';
import React from 'react';
import {connect} from 'react-redux';
import {removeMessage} from './actions';
import {getMessages} from './selectors';

import type {RootState} from '../root/types';
import type {MessageQueue} from './types';

type Props = {
  messages: MessageQueue,
  removeMessage: typeof removeMessage,
};

const Toaster = ({messages, removeMessage}: Props) => (
  <div className="toaster">
    {messages.length ? (
      <ul className="toaster__message-list">
        {reverse(messages).map((message, index) => (
          <li key={index} className="toaster__message-item">
            {message.text}
            <a className="toaster__remove-message" onClick={() => removeMessage(message.id)}>
              &times;
            </a>
          </li>
        ))}
      </ul>
    ) : null}
  </div>
);

export default flowRight(
  connect(
    (state: RootState) => ({
      messages: getMessages(state),
    }),
    {
      removeMessage,
    },
  ),
)(Toaster);
