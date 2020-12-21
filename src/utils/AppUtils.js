import { GlobalContext } from '../js/widgets/certificateDashboard/service/Activator';

export const EVENTS_QUERY_URL = `${GlobalContext.passBaseUrl}/v1/events/search`;
export const CERT_QUERY_URL = `${GlobalContext.passBaseUrl}/v1/certificate/search`;
export const CERT_PARTNER_QUERY_URL = `${GlobalContext.passBaseUrl}/v1/certificate`;
export const DOWNLOAD_PUBLIC_KEY_URL = `${GlobalContext.passBaseUrl}/v1/certificate/download/publickey`;
export const UPLOAD_PRIVATE_KEY_URL = `${GlobalContext.passBaseUrl}/v1/certificate/update/pem`;

export const groupBy = (res, predicate) => {
  const grouped = {};
  res.forEach((entry) => {
    const groupKey = predicate(entry);
    if (typeof grouped[groupKey] === 'undefined') grouped[groupKey] = [];
    grouped[groupKey].push(entry);
  });

  return grouped;
};

export const generateUUID = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16), // eslint-disable-line no-bitwise
  );
};

export const setDateFormat = (value) => {
  const expiryDate = new Date(value);
  return expiryDate.toUTCString();
};
