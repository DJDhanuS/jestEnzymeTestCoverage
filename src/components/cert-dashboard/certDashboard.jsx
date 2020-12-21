import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TileGroup from '../tile-group/TileGroup';
import StatusCardGroup from '../status-card-group/StatusCardGroup';
import { EVENTS_QUERY_URL, CERT_QUERY_URL, groupBy, generateUUID } from '../../utils/AppUtils';

import { GlobalContext } from '../../js/widgets/certificateDashboard/service/Activator';
// import { GlobalContext } from '../../js/widgets/certificateDashboard/service/Activator';
export default class CertDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingExpiry: {
        name: 'Upcoming Expiry',
        value: 0,
        type: 'ALL',
        color: '#ffc107',
      },
      certYetToRenew: {
        name: 'Renewals in progress',
        value: 0,
        type: 'UPDATE_PENDING',
        color: '#bd2130',
      },
      renewalInProgress: {
        name: 'Available for download',
        value: 0,
        type: 'UPDATE_COMPLETE',
        color: '#7cc50b',
      },
      // eslint-disable-next-line react/no-unused-state
      expiryCertId: [],
      renewalDetails: [],
      activeRenewalDetails: [],
    };

    this.updateStats = this.updateStats.bind(this);
    this.enrichRenewalInfo = this.enrichRenewalInfo.bind(this);
    this.updateRenewalDetails = this.updateRenewalDetails.bind(this);
    this.filterRenewalDetails = this.filterRenewalDetails.bind(this);
  }

  componentWillMount() {
    const url = `${EVENTS_QUERY_URL}?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`;
    const tid = generateUUID();
    axios
      .get(url, { headers: { intuit_tid: tid } })
      .then((response) => {
        this.updateStats(response.data);
        this.enrichRenewalInfo(this.state.expiryCertId);
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
          toast.error('Something went wrong! Could not fetch events.');
          GlobalContext.sandbox.logger.logException(
            `Could not fetch events, request=${url}, intuit_tid=${tid}.`,
            error,
          );
        }
      });
  }

  updateStats(res) {
    const expiryCertId = [];
    const upcomingExpiry = res.filter((event) => {
      if (event.eventType === 'EXPIRE_CERT') {
        expiryCertId.push(event.externalSrcId);
        return true;
      }

      return false;
    }).length;

    const certYetToRenew = res.filter(
      (event) => event.eventType === 'UPDATE_CERT' && expiryCertId.includes(event.externalSrcId),
    ).length;

    const renewalInProgress = upcomingExpiry - certYetToRenew;

    // eslint-disable-next-line react/no-access-state-in-setstate
    const upcomingExpiryCurr = { ...this.state.upcomingExpiry };
    upcomingExpiryCurr.value = upcomingExpiry;
    this.setState({ upcomingExpiry: upcomingExpiryCurr });

    // eslint-disable-next-line react/no-access-state-in-setstate
    const certYetToRenewCurr = { ...this.state.certYetToRenew };
    certYetToRenewCurr.value = certYetToRenew;
    this.setState({ certYetToRenew: certYetToRenewCurr });

    // eslint-disable-next-line react/no-access-state-in-setstate
    const renewalInProgressCurr = { ...this.state.renewalInProgress };
    renewalInProgressCurr.value = renewalInProgress;
    this.setState({ renewalInProgress: renewalInProgressCurr });

    this.setState({ expiryCertId });
  }

  // eslint-disable-next-line class-methods-use-this
  enrichRenewalInfo(expiryCertId) {
    const url = `${EVENTS_QUERY_URL}?externalSrcId=${expiryCertId.join(',')}`;
    const tid = generateUUID();
    axios
      .get(url, {
        headers: { intuit_tid: tid },
      })
      .then((response) => {
        const res = response.data;
        const eventsByHostname = groupBy(res, (obj) => obj.externalRefName);
        this.updateRenewalDetails(eventsByHostname);
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
          toast.error('Something went wrong! Could not fetch event details.');
          GlobalContext.sandbox.logger.logException(
            `Could not fetch event details, request=${url}, intuit_tid=${tid}.`,
            error,
          );
        }
      });
  }

  // eslint-disable-next-line class-methods-use-this
  updateRenewalDetails(eventsByHostname) {
    const renewalDetails = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const [, item] of Object.entries(eventsByHostname)) {
      const renewalCertificate = item.filter((obj) => obj.eventType === 'UPDATE_CERT');

      const url = `${CERT_QUERY_URL}?id=${renewalCertificate[0].externalSrcId}`;
      const tid = generateUUID();
      axios
        .get(url, {
          headers: { intuit_tid: tid },
        })
        .then((response) => {
          const entry = {};
          entry.events = Object.values(item);

          const certDetails = response.data[0];
          entry.expiringCertificate = certDetails;

          const url2 = `${CERT_QUERY_URL}?id=${renewalCertificate[0].externalRefId}`;
          const tid2 = generateUUID();
          axios
            .get(url2, {
              headers: { intuit_tid: tid2 },
            })
            .then((response2) => {
              const certDetails2 = response2.data[0];
              entry.renewalCertificate = certDetails2;
              renewalDetails.push(entry);
              this.setState({ renewalDetails, activeRenewalDetails: renewalDetails });
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
                  `Authentication failed with status ${error.response.status}, request=${url2}, intuit_tid=${tid2}.`,
                );
              } else {
                toast.error('Something went wrong! Could not fetch certificate details.');
                GlobalContext.sandbox.logger.logException(
                  `Could not fetch certificate details, request=${url2}, intuit_tid=${tid2}.`,
                  error,
                );
              }
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
            toast.error('Something went wrong! Could not fetch certificate details.');
            GlobalContext.sandbox.logger.logException(
              `Could not fetch certificate details, request=${url}, intuit_tid=${tid}.`,
              error,
            );
          }
        });
    }
  }

  filterRenewalDetails(e, type) {
    let details = [];
    if (type === 'UPDATE_PENDING') {
      details = this.state.renewalDetails.filter((event) => {
        let result = false;
        event.events.forEach((item) => {
          if (item.eventType === 'UPDATE_CERT' && item.status === 'CREATED') {
            result = true;
          }
        });

        return result;
      });
    } else if (type === 'UPDATE_COMPLETE') {
      details = this.state.renewalDetails.filter((event) => {
        let result = false;
        event.events.forEach((item) => {
          if (item.eventType === 'UPDATE_CERT' && item.status === 'COMPLETE') {
            result = true;
          }
        });

        return result;
      });
    } else {
      details = this.state.renewalDetails;
    }

    this.setState({ activeRenewalDetails: details });
  }

  render() {
    return (
      <div>
        <TileGroup
          filterRenewalDetails={(e, type) => this.filterRenewalDetails(e, type)}
          data={[
            this.state.upcomingExpiry,
            this.state.certYetToRenew,
            this.state.renewalInProgress,
          ]}
        />
        <hr />
        <StatusCardGroup data={this.state.activeRenewalDetails} />
      </div>
    );
  }
}
