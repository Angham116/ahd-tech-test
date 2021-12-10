const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const router = require('../routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable security, CORS, compression
app.use(helmet());
app.use(cors());
app.use(compress());

app.use('/v1', router);

//  Serve React (client-side) files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.use(
    favicon(path.join(__dirname, '..', 'client', 'build', 'logo192.png'))
  );
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use((err, req, res, next) => {
  console.log(err);
  res.json({ error: err });
});


module.exports = app;
