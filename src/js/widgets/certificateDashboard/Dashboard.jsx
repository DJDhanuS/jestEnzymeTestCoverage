import React from 'react';
import { ThemeProvider } from '@ids/theme';
import styled from 'styled-components';
import BaseWidget from 'web-shell-core/widgets/BaseWidget';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import Navigator from '../../../components/side-navigation/sideBarNavigation';
import store from '../../../redux/store/index';
import '../../../styles/app.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import 'react-toastify/dist/ReactToastify.css';
/**
 * Here we define our styles using styled-components
 * This must be done outside the render method for performance reason.
 * For more info, read https://www.styled-components.com/docs/basics#define-styled-components-outside-of-the-render-method
 */
const PluginDiv = styled.div``;
toast.configure();
/**
 * Basic Plugin Class to display a HelloWorld message
 */
toast.configure();
class Dashboard extends BaseWidget {
  /**
   * Mounts the component, see React docs.
   * @returns {void}
   */
  componentDidMount() {
    this.ready();
  }
  /**
   * Renders the plugin
   * We use the image that we imported above so it is handled in the browser when the plugin is loaded
   * @returns {void}
   */

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme="intuit" colorScheme="c">
          {/**
           * data-cy is a testing paradigm for use with Cypress. See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements
           * This will be stripped out at build time automatically
           */}
          <PluginDiv className="partner-cert-dashboard" data-cy="partner-cert-dashboard-div">
            <Navigator />
          </PluginDiv>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default Dashboard;
