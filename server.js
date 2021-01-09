const express = require('express')
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');

const app = express();

// enable compression
app.use(compression());

// enable cross origin resource sharing
app.use(cors());

// enable security features
app.use(helmet());

// enable logging
app.use(morgan('short'));

// history mode
app.use(history({ history: 'src/index.html' }));

// file server
app.use('/', express.static(path.join(__dirname, './build')))

const port = 8001;
const hostname = 'localhost';

app.listen(port, hostname, () => {
 console.log(`FrontEnd server started, listening on port ${port}`);
 console.log(`http://${hostname}:${port}`)
})