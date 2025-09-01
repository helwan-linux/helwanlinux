// api/index.js
const https = require('https');

module.exports = (req, res) => {
  const url = req.query.url;
  if (!url) {
    res.status(400).send('URL parameter is missing.');
    return;
  }

  https.get(url, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  }).on('error', (e) => {
    res.status(500).send(`Proxy error: ${e.message}`);
  });
};