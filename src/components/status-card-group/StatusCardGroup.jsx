import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@ids/button';
import { Modal } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';
import StatusCard from '../status-card/StatusCard';

/**
 *
 * @param {Object} props
 */
class StatusCardGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: {
        title: 'Renewal Details',
        body: {},
      },
      isOpen: false,
    };

    this.openModal = () => this.setState({ isOpen: true });
    this.closeModal = () => {
      this.setState({ isOpen: false });
    };
    this.processDeatils = this.processDeatils.bind(this);
    this.populateValues = this.populateValues.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  processDeatils(details) {
    const data = [];
    details.forEach((eventDetails) => {
      const item = {};

      item.expiringCertID = eventDetails.expiringCertificate.id;
      item.fiName = eventDetails.expiringCertificate.fiName;
      item.expiry = new Date(eventDetails.expiringCertificate.expiry).toUTCString();
      item.newCertId = eventDetails.renewalCertificate.id;

      if (['ACTIVE', 'PERSISTED', 'DUE_RENEWAL'].includes(eventDetails.renewalCertificate.status)) {
        item.status = 'New certificate is ready for download.';
      } else {
        item.status = 'New certificate creation is in progress.';
      }
      data.push(item);
    });
    return data;
  }

  populateValues(row) {
    const modalData = this.props.data.find(
      (obj) => obj.expiringCertificate.id === row.expiringCertID,
    );
    if (modalData) {
      this.setState({ modal: { title: 'Renewal Details', body: modalData } });
      this.openModal();
    }
  }

  renderButton(row) {
    return (
      <Button
        size="mini"
        id={`renewal-details-${row.expiringCertID}`}
        onClick={() => this.populateValues(row)}
      >
        Details
      </Button>
    );
  }

  render() {
    const that = this;
    const options = {
      onRowClick: (row) => {
        that.populateValues(row);
      },
    };
    return (
      <Container fluid className="justify-content-md-center">
        <Row>
          <Col xs={12}>
            <BootstrapTable
              data={this.processDeatils(this.props.data)}
              tableBodyClass="react-bs-table-bordered certificate-search-result-table"
              striped
              hover
              options={options}
              // pagination
            >
              <TableHeaderColumn
                dataField="fiName"
                isKey
                dataSort
                style={{ backgroundColor: '#fff' }}
              >
                Host Name
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="expiringCertID"
                dataSort
                // width="20%"
                style={{ backgroundColor: '#fff' }}
              >
                Expiring Cert ID
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="expiry"
                dataSort
                dataFormat={this.setDateFormate}
                style={{ backgroundColor: '#fff' }}
              >
                Expiry
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="newCertId"
                dataSort
                // width="20%"
                style={{ backgroundColor: '#fff' }}
              >
                New Cert ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="status" dataSort style={{ backgroundColor: '#fff' }}>
                Status
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="expiringCertID"
                dataFormat={this.renderButton}
                dataSort
                width="10%"
                style={{ backgroundColor: '#fff' }}
              >
                Action
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>

          <Col xs={12}>
            <Modal
              show={this.state.isOpen}
              onHide={this.closeModal}
              dialogClassName="modal-90w"
              size="lg"
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>{this.state.modal.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.state.modal.body && <StatusCard data={this.state.modal.body} />}
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default StatusCardGroup;

StatusCardGroup.propTypes = {
  data: PropTypes.node,
};

StatusCardGroup.defaultProps = {
  data: null,
};
