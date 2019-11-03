const express = require('express');
require('express-group-routes');
const app = express();
app.use(express.json());

require('./router')(app);
