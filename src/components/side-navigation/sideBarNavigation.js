import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { RiDashboardFill } from 'react-icons/ri';
import { BiSearchAlt2 } from 'react-icons/bi';
import styled from 'styled-components';
import SearchCertificate from '../search-Certificate/SearchCertificates';
import CertDashboard from '../cert-dashboard/certDashboard';
import intuitLogo from '../../assets/images/helloWorld.png';

const SampleImage = styled.img`
  display: block;
  width: 70px;
  margin: 15px;
`;

class SideBarNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewComponent: 'Dashboard',
      isActive: 'Dashboard'
    };

    this.handleNavigation = this.handleNavigation.bind(this);
    this.componentRender = this.componentRender.bind(this);
  }

  handleNavigation(component) {
    this.setState({
      viewComponent: component,
      isActive: component,
    });
  }

  componentRender() {
    switch (this.state.viewComponent) {
      case 'Dashboard':
        return <CertDashboard />;
      case 'Search':
        return <SearchCertificate />;
      default:
        return <CertDashboard />;
    }
  }

  render() {
    return (
      <div>
        <div>
          <SampleImage
            className="sampleImage"
            alt="Partner Certificate Dashboard"
            src={intuitLogo}
            data-cy="intuit-logo-banner"
          />
        </div>
        <Navbar
          id="cert-dash-navbar"
          style={{
            position: 'sticky',
            top: '0',
            zIndex: '3',
            paddingTop: '0px',
            paddingBottom: '0px',
          }}
        >
          <div className="container">
            <Nav>
              <NavItem
                className={`nav-text ${this.state.isActive === 'Dashboard' ? 'selected' : ''}`}
                key="navHome"
                onClick={() => this.handleNavigation('Dashboard')}
                aria-controls="navbarSupportedContent"
                role="button"
                aria-label="Dashboard"
                tabIndex="0"
              >
                <span>
                  <RiDashboardFill size="16px" /> Dashboard
                </span>
              </NavItem>

              <NavItem
                className={`nav-text ${this.state.isActive === 'Search' ? 'selected' : ''}`}
                key="navSearch"
                href="#"
                onClick={() => this.handleNavigation('Search')}
                aria-controls="navbarSupportedContent"
                role="button"
                aria-label="Search"
                tabIndex="0"
              >
                <span>
                  <BiSearchAlt2 size="16px" /> Search
                </span>
              </NavItem>
            </Nav>
          </div>
        </Navbar>
        <div className="main">{this.componentRender()}</div>
      </div>
    );
  }
}

export default SideBarNavigation;
