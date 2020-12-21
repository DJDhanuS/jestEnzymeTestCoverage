import { Col, Table } from 'react-bootstrap';
import Button from '@ids/button';
import Tooltip from '@ids-beta/tooltip';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import CertDetails from '../cert-details/certDetails';
import { GlobalContext } from '../../js/widgets/certificateDashboard/service/Activator';
import { CERT_QUERY_URL, DOWNLOAD_PUBLIC_KEY_URL, generateUUID } from '../../utils/AppUtils';

class StatusCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalState: false,
      details: [],
    };

    this.showModal = this.showModal.bind(this);
    this.downloadCert = this.downloadCert.bind(this);
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
          // fileData.replace('\n', '<br/>');
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
          toast.error(`Authentication failed with status ${error.response.status}.`);
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
    return (
      <Col lg={12} style={{ fontFamily: 'Arial', fontSize: '.8vw' }}>
        <div
          style={{
            // marginTop: '1vw',
            padding: '1vw',
            // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
        >
          {/* Set Title - HostName */}
          <Tooltip
            duration={3000}
            message={
              <div>
                <span>The hostname of a certificate which is up for renewal.</span>
              </div>
            }
          >
            <span style={{ fontSize: '1.2vw' }}>
              <strong>{this.props.data.expiringCertificate.fiName}</strong>
            </span>
          </Tooltip>
          {/*  List Expiring Certificate details */}
          <div style={{ marginTop: '.5vw' }}>
            <Tooltip
              duration={3000}
              message={
                <div>
                  <span>Details of old certificate.</span>
                </div>
              }
            >
              <p style={{ textAlign: 'left' }}>
                <strong>Expiring Certificate</strong>
              </p>
            </Tooltip>
            <Table bordered size="sm" responsive="md">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Expires On</th>
                  <th>Details</th>
                  {/* <th>Download</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.props.data.expiringCertificate.id}</td>
                  <td style={{ color: 'red' }}>
                    {this.props.data.expiringCertificate.expiry
                      ? new Date(this.props.data.expiringCertificate.expiry).toUTCString()
                      : ' '}
                  </td>
                  <td>
                    <center>
                      <Button
                        size="mini"
                        onClick={() => this.showModal(this.props.data.expiringCertificate.id)}
                      >
                        Details
                      </Button>
                    </center>
                  </td>
                  {/* <td>
                    <Button
                      size="mini"
                      onClick={() => this.downloadCert(this.props.data.expiringCertificate.id)}
                    >
                      Download
                    </Button>
                  </td> */}
                </tr>
              </tbody>
            </Table>
          </div>
          {/* List New Certificate details */}
          <div>
            <Tooltip
              duration={3000}
              message={
                <div>
                  <span>Details of new certificate.</span>
                </div>
              }
            >
              <p style={{ textAlign: 'left' }}>
                <strong>New Certificate</strong>
              </p>
            </Tooltip>
            <Table bordered size="sm" responsive="md">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Expires On</th>
                  <th>Details</th>
                  {/* <th>Download</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.props.data.renewalCertificate.id}</td>
                  <td>
                    {this.props.data.renewalCertificate.expiry
                      ? new Date(this.props.data.renewalCertificate.expiry).toUTCString()
                      : ' '}
                  </td>
                  <td>
                    <center>
                      <Button
                        size="mini"
                        onClick={() => this.showModal(this.props.data.renewalCertificate.id)}
                      >
                        Details
                      </Button>
                    </center>
                  </td>
                  {/* <td>
                    <Button
                      size="mini"
                      onClick={() => this.downloadCert(this.props.data.renewalCertificate.id)}
                      disabled={
                        !['ACTIVE', 'PERSISTED', 'DUE_RENEWAL', 'EXPIRED'].includes(
                          this.props.data.renewalCertificate.status,
                        )
                      }
                    >
                      Download
                    </Button>
                  </td> */}
                </tr>
              </tbody>
            </Table>
          </div>

          {/* List All Events */}
          <Tooltip
            duration={3000}
            message={
              <div>
                <span>List of all the lifecycle events creted for certificate renewal.</span>
              </div>
            }
          >
            <p style={{ textAlign: 'left' }}>
              {' '}
              <strong>Recent Activity</strong>
            </p>
          </Tooltip>
          <Table bordered size="sm" responsive="md">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Created</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.events.map((obj) => (
                <tr key={`event-${obj.id}`}>
                  <td>{obj.id}</td>
                  <td>{obj.eventType}</td>
                  <td>{new Date(obj.created).toUTCString()}</td>
                  <td>{obj.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <CertDetails
          show={this.state.modalState}
          details={this.state.details}
          showModal={this.showModal}
        />
      </Col>
    );
  }
}

export default StatusCard;

StatusCard.propTypes = {
  data: PropTypes.node,
};

StatusCard.defaultProps = {
  data: null,
};
