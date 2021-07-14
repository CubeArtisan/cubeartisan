module.exports = {
  serviceName: process.env.SITE_NAME,
  serviceVersion: process.env.SITE_VERSION,
  serverUrl: process.env.APM_SERVER_URL,
  active: !!process.env.APM_SERVER_URL,
  transactionIgnoreUrls: ['/version'],
};
