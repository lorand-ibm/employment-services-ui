import React, {Component} from 'react';

import {deconstructLocationPathname} from '../root/util';

import SustainabilityFeedbackForm from './SustainabilityFeedbackForm';
import Modal from '../modal/Modal';
import {Colors} from '../constants';

type Props = {
  router: Object,
};

class SustainabilityFeedbackPage extends Component {
  props: Props;

  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  componentDidUpdate() {
    if (this.state.redirect) {
      //history exists: go back where the page was accessed
      if (window.history && window.history.length > 1 && window.history.state) {
        this.props.router.goBack();
      } else {
        const currentLocationPathname = this.props.router.getCurrentLocation().pathname;
        const {language, firstPage} = deconstructLocationPathname(currentLocationPathname);
        if (!language || !firstPage) {
          //something went wrong with deconstruction: redirect to homepage.
          this.props.router.push('/');
        } else {
          //history doesnt exist: redirect to ts main page (page was accessed externally, so no history)
          this.props.router.push('/' + language + '/' + firstPage);
        }
      }
    }
  }

  closePage() {
    this.setState({redirect: true});
  }

  render() {
    return (
      <Modal
        isOpen={true}
        close={this.closePage.bind(this)}
        textColor={'black'}
        headerStyle={{color: Colors.HEL_BUS_1}}
        contentStyle={{backgroundColor: 'white'}}
      >
        <SustainabilityFeedbackForm closeAction={this.closePage.bind(this)} />
      </Modal>
    );
  }
}

export default SustainabilityFeedbackPage;
