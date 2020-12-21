import React from 'react';
// import { ControlLabel, DropdownButton, MenuItem, Modal, Panel } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Button from '@ids/button';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../js/widgets/certificateDashboard/service/Activator';
import { DOWNLOAD_PUBLIC_KEY_URL, generateUUID } from '../../utils/AppUtils';

class certDetails extends React.Component {
  constructor() {
    super();
    this.showModal = this.showModal.bind(this);
    this.downloadCert = this.downloadCert.bind(this);
  }

  showModal() {
    this.props.showModal();
  }

  // eslint-disable-next-line class-methods-use-this
  downloadCert(value) {
    const data = { partnerCertId: value };
    const tid = generateUUID();
    axios({
      url: DOWNLOAD_PUBLIC_KEY_URL, // your url
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
        intuit_tid: tid,
      },
    })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const fileData = response.data;
          const blob = new Blob([fileData], { type: 'text/plain', endings: 'native' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `${value}.json`;
          link.href = url;
          link.click();
          toast.success('Certificate is downloaded.');
          GlobalContext.sandbox.logger.info(
            `Certificate download was successful, intuit_tid=${tid}.`,
          );
        }
      })
      .catch((error) => {
        if (
          error &&
          error.response &&
          error.response.status &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          toast.error(
            `Authentication failed with status ${error.response.status}, intuit_tid=${tid}.`,
          );
          GlobalContext.sandbox.logger.error(
            `Authentication failed with status ${error.response.status}, request=${DOWNLOAD_PUBLIC_KEY_URL}, partnerCertId=${value}, intuit_tid=${tid}.`,
          );
        } else {
          toast.error('Something went wrong! Certificate download failed.');
          GlobalContext.sandbox.logger.logException(
            `Certificate download failed, request=${DOWNLOAD_PUBLIC_KEY_URL}, partnerCertId=${value}, intuit_tid=${tid}.`,
            error,
          );
        }
      });
  }

  render() {
    const keystoreDetailsSection = !(
      this.props.details.keystoreDetails && this.props.details.keystoreDetails.subject
    ) ? null : (
      <div style={{ marginTop: '20px' }}>
        <h5>
          <strong>Keystore Details</strong>
        </h5>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
                <b>Subject: </b>
                <span>
                  {this.props.details.keystoreDetails && this.props.details.keystoreDetails.subject
                    ? this.props.details.keystoreDetails.subject
                    : ''}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <b>Issuer: </b>
                <span>
                  {this.props.details.keystoreDetails && this.props.details.keystoreDetails.issuer
                    ? this.props.details.keystoreDetails.issuer
                    : ''}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <b>SerialNumberHex: </b>
                <span>
                  {this.props.details.keystoreDetails &&
                  this.props.details.keystoreDetails.serialNumberHex
                    ? this.props.details.keystoreDetails.serialNumberHex
                    : ''}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <b>NotBeforeDate: </b>
                <span>
                  {this.props.details.keystoreDetails &&
                  this.props.details.keystoreDetails.notBeforeDate
                    ? this.props.details.keystoreDetails.notBeforeDate
                    : ''}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <b>NotAfterDate: </b>
                <span>
                  {this.props.details.keystoreDetails &&
                  this.props.details.keystoreDetails.notAfterDate !== undefined
                    ? this.props.details.keystoreDetails.notAfterDate
                    : ''}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <b>FingerPrint (SHA1): </b>
                <span style={{ marginLeft: '10px' }}>
                  {this.props.details.keystoreDetails &&
                  this.props.details.keystoreDetails.fingerPrintSHA1
                    ? this.props.details.keystoreDetails.fingerPrintSHA1
                    : ''}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <b>SignatureAlg: </b>{' '}
                <span>
                  {this.props.details.keystoreDetails &&
                  this.props.details.keystoreDetails.signatureAlg
                    ? this.props.details.keystoreDetails.signatureAlg
                    : ''}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <b>Version: </b>
                <span>
                  {this.props.details.keystoreDetails && this.props.details.keystoreDetails.version
                    ? this.props.details.keystoreDetails.version
                    : ''}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div>
        <Modal
          dialogClassName="modal-90w"
          size="lg"
          show={this.props.show}
          onHide={this.showModal}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">Partner Certificate Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {this.props.details !== undefined ? (
                <div>
                  <table className="show_table">
                    <tbody>
                      <tr>
                        <td>
                          <b>ID: </b>
                          <span>{this.props.details.id}</span>
                        </td>
                        <td>
                          <b>Certificate Request ID: </b>
                          <span>{this.props.details.certificateRequestId}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Host: </b>
                          <span>{this.props.details.fiName}</span>
                        </td>
                        <td>
                          <b>Certificate ID: </b>
                          <span>{this.props.details.certificateId}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>CNAME: </b>
                          <span>{this.props.details.cname}</span>
                        </td>
                        <td>
                          <b>Created: </b>
                          <span>
                            {this.props.details.created &&
                              new Date(this.props.details.created).toUTCString()}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Status: </b>
                          <span>{this.props.details.status}</span>
                        </td>
                        <td>
                          <b>Expiry: </b>
                          <span>
                            {this.props.details.expiry &&
                              new Date(this.props.details.expiry).toUTCString()}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Cert Alias: </b>
                          <span>{this.props.details.certAlias}</span>
                        </td>
                        {/* <td> */}
                        {/*    <b> Created By: </b><span>{this.props.details.createdBy}</span> */}
                        {/* </td> */}
                      </tr>
                    </tbody>
                  </table>
                  {keystoreDetailsSection}
                </div>
              ) : (
                <span />
              )}
            </div>
            <div style={{ marginTop: '8px', float: 'right' }}>
              <Button
                id={`pc-${this.props.details.id}-download`}
                size="mini"
                style={{ marginRight: '4px' }}
                onClick={() => this.downloadCert(this.props.details.id)}
                disabled={
                  !this.props.details.keystoreDetails ||
                  !['ACTIVE', 'PERSISTED', 'DUE_RENEWAL', 'EXPIRED'].includes(
                    this.props.details.status,
                  )
                }
              >
                Download
              </Button>
              <Button
                id={`pc-${this.props.details.id}-update`}
                size="mini"
                style={{ marginLeft: '4px' }}
                disabled
              >
                Update
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
export default certDetails;

certDetails.propTypes = {
  showModal: PropTypes.func,
  details: PropTypes.node,
  show: PropTypes.bool,
};

certDetails.defaultProps = {
  showModal: PropTypes.func,
  details: null,
  show: null,
};
