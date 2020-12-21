import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Col, Form, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import ButtonIds from '@ids/button';
// import Dropdown, { MenuItem } from '@ids/dropdown';
import axios from 'axios';
import { BiPlusMedical } from 'react-icons/bi';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import CertDetails from '../cert-details/certDetails';
import { GlobalContext } from '../../js/widgets/certificateDashboard/service/Activator';
// import FileUploadModal from '../fileUpload/fileUploadModal';
import {
  CERT_QUERY_URL,
  CERT_PARTNER_QUERY_URL,
  generateUUID,
  setDateFormat,
} from '../../utils/AppUtils';

class SearchCertificates extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      title: { title: 'Host Name', value: 'fiName' },
      searchText: '',
      modalState: false,
      details: [],
      // uploadModalState: false,
      // certificateId: '',
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.showModal = this.showModal.bind(this);
    // this.showUploadModal = this.showUploadModal.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderDropdown = this.renderDropdown.bind(this);
  }

  // showUploadModal(id) {
  //   this.setState({
  //     // eslint-disable-next-line react/no-access-state-in-setstate
  //     uploadModalState: !this.state.uploadModalState,
  //     certificateId: id,
  //   });
  // }

  handleSearchInput(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleSearch(e) {
    e.preventDefault();
    let searchValue = '';
    if (this.state.title.value === 'status') {
      searchValue = `status=${this.state.searchText.toUpperCase()}`;
    } else if (this.state.title.value === 'id') {
      searchValue = `id=${this.state.searchText}`;
    } else if (this.state.title.value === 'fiName') {
      searchValue = `fiName=${this.state.searchText}`;
    } else if (this.state.title.value === 'partnerUid') {
      searchValue = `${this.state.searchText}`;
    }

    if (searchValue.length <= 0) {
      return;
    }

    const tid = generateUUID();
    if (searchValue && this.state.title.value === 'partnerUid') {
      const url = `${CERT_PARTNER_QUERY_URL}/${searchValue}`;
      axios
        .get(url, {
          headers: { intuit_tid: tid },
        })
        .then((response) => {
          this.setState({
            data: response.data,
          });
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.status &&
            (error.response.status === 401 || error.response.status === 403)
          ) {
            toast.error(`Authentication failed with status ${error.response.status}.`);
            GlobalContext.sandbox.logger.error(
              `Authentication failed with status ${error.response.status}, request=${url}, intuit_tid=${tid}.`,
            );
          } else {
            toast.error('Something went wrong! Failed to fetch the certificates.');
            GlobalContext.sandbox.logger.logException(
              `Failed to fetch the certificates, request=${url}, intuit_tid=${tid}.`,
              error,
            );
          }
        });
    } else {
      const url = `${CERT_QUERY_URL}?${searchValue}`;
      axios
        .get(url, { headers: { intuit_tid: generateUUID() } })
        .then((response) => {
          this.setState({
            data: response.data,
          });
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.status &&
            (error.response.status === 401 || error.response.status === 403)
          ) {
            toast.error(`Authentication failed with status ${error.response.status}.`);
            GlobalContext.sandbox.logger.error(
              `Authentication failed with status ${error.response.status}, request=${url}, intuit_tid=${tid}.`,
            );
          } else {
            toast.error('Something went wrong! Failed to fetch the certificates.');
            GlobalContext.sandbox.logger.logException(
              `Failed to fetch the certificates, request=${url}, intuit_tid=${tid}.`,
              error,
            );
          }
        });
    }
  }

  showModal(value) {
    if (!this.state.modalState) {
      const url = `${CERT_QUERY_URL}?id=${value}&includeKeystoreDetails=true`;
      const tid = generateUUID();
      axios
        .get(url, {
          headers: { intuit_tid: tid },
        })
        .then((response) => {
          const details = response.data[0];
          this.setState({
            details,
            // eslint-disable-next-line react/no-access-state-in-setstate
            modalState: !this.state.modalState,
          });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          if (
            error &&
            error.response &&
            error.response.status &&
            (error.response.status === 401 || error.response.status === 403)
          ) {
            toast.error(`Authentication failed with status ${error.response.status}.`);
            GlobalContext.sandbox.logger.error(
              `Authentication failed with status ${error.response.status}, request=${url}, intuit_tid=${tid}.`,
            );
          } else {
            toast.error('Something went wrong! Failed to fetch the certificate details.');
            GlobalContext.sandbox.logger.logException(
              `Failed to fetch the certificate details, request=${url}, intuit_tid=${tid}.`,
              error,
            );
          }
        });
    } else {
      this.setState({
        // eslint-disable-next-line react/no-access-state-in-setstate
        modalState: !this.state.modalState,
      });
    }
  }

  renderButton(value) {
    return (
      <div>
        <ButtonIds
          size="mini"
          onClick={() => this.showModal(value)}
          style={{ marginRight: '4px' }}
          tabIndex="0"
        >
          Details
        </ButtonIds>
        {/* <span
          id={`pc-${value}`}
          className="span-button"
          onClick={() => this.showUploadModal(value)}
        >
          Upload
        </span> */}
      </div>
    );
  }

  renderDropdown() {
    const btStyle = {
      marginRight: '10px',
      marginLeft: '5px',
      float: 'left',
      width: '12%',
      minWidth: '12%',
      height: '35px',
    };

    return (
      <div>
        <DropdownButton
          className="btn-group"
          bsStyle="primary"
          style={btStyle}
          title={this.state.title.title}
          id="certificateID"
        >
          <Dropdown.Item
            value="Host Name"
            onClick={() => this.setState({ title: { title: 'Host Name', value: 'fiName' } })}
          >
            Host Name
          </Dropdown.Item>
          <Dropdown.Item
            value="PartnerUid"
            onClick={() =>
              this.setState({
                title: {
                  title: 'PartnerUid',
                  value: 'partnerUid',
                },
              })
            }
          >
            PartnerUid
          </Dropdown.Item>
          <Dropdown.Item
            value="Certificate ID"
            onClick={() =>
              this.setState({ title: { title: 'Partner Certificate ID', value: 'id' } })
            }
          >
            Certificate ID
          </Dropdown.Item>
          <Dropdown.Item
            value="Status"
            onClick={() =>
              this.setState({
                title: {
                  title: 'Status',
                  value: 'status',
                },
              })
            }
          >
            Status
          </Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={12} style={{ paddingTop: '20px' }}>
            <div style={{ display: 'block', marginLeft: '20px' }}>
              <br /> <br />
              <Button className="btn btn-lg btn-success" disabled>
                <BiPlusMedical />
                Create
              </Button>
              {/* <Button className="btn btn-lg btn-success" style={{ marginLeft: '20px' }} disabled>
                &#9998; Update
              </Button> */}
            </div>
          </Col>

          <Col xs={12} style={{ marginTop: '20px' }}>
            <Form inline>
              <Col
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{ display: 'inline-block', marginRight: '5%' }}
              >
                <div>
                  <div className="input-loader">
                    <div
                      style={{
                        display: 'inline-block',
                        position: 'relative',
                        width: '100%',
                        float: 'center',
                      }}
                    >
                      {this.renderDropdown()}
                      <FormControl
                        style={{
                          width: '77%',
                          outline: 'none',
                          fontSize: '1vw',
                          height: '35px',
                        }}
                        type="text"
                        value={this.state.searchText}
                        placeholder={this.state.title.title}
                        onChange={(event) => this.handleSearchInput(event)}
                        className="provider-search-box"
                      />
                      <ButtonIds
                        size="mini"
                        onClick={(e) => this.handleSearch(e)}
                        style={{
                          backgroundColor: '#00077c5',
                          height: '35px',
                          width: '9%',
                          marginTop: '0px',
                          marginLeft: '10px',
                        }}
                        disabled={!(this.state.searchText.length > 0)}
                      >
                        Search
                      </ButtonIds>
                    </div>
                  </div>
                  <div className="input-loading-container">
                    {this.state.data.length > 0 ? (
                      <span />
                    ) : (
                      <div className="input-loading-hidden" />
                    )}
                  </div>
                </div>
              </Col>
            </Form>
            <BootstrapTable
              data={this.state.data}
              tableBodyClass="react-bs-table-bordered certificate-search-result-table"
              hover
              striped
              defaultSorted
            >
              <TableHeaderColumn
                dataField="id"
                dataSort
                isKey
                width="21%"
                style={{ backgroundColor: '#fff' }}
              >
                Partner Certificate ID
              </TableHeaderColumn>
              <TableHeaderColumn
                dataSort
                dataField="cname"
                width="20%"
                style={{ backgroundColor: '#fff' }}
              >
                Host Name
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="expiry"
                width="12%"
                dataSort
                dataFormat={setDateFormat}
                style={{ backgroundColor: '#fff' }}
              >
                Expiry Date
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="status"
                width="10%"
                dataSort
                // dataAlign="center"
                style={{ backgroundColor: '#fff' }}
              >
                Status
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="id"
                dataFormat={this.renderButton}
                width="10%"
                style={{ backgroundColor: '#fff' }}
              >
                Action
              </TableHeaderColumn>
            </BootstrapTable>

            <CertDetails
              show={this.state.modalState}
              details={this.state.details}
              showModal={this.showModal}
            />
            {/* <FileUploadModal
              state={this.state.uploadModalState}
              showModal={this.showUploadModal}
              id={this.state.certificateId}
            /> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SearchCertificates;
