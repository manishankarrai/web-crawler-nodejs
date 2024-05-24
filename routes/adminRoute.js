const express = require('express');
const adminRoute = express.Router();
const { getCrawlData  } =  require('../controller/adminController');


adminRoute.get('/crawl/get', getCrawlData);




module.exports = { adminRoute };