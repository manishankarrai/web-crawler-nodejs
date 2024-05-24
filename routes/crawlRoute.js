const express = require('express');
const crawlRoute = express.Router();
const { getHTML, getHTMLFile, getHTMLSingle, getHTMLFileSingle, getHTMLWithTags }
    = require('../controller/crawlController');
const { validateUrlBody, validateUrl } = require('../utils/validateUrl');



crawlRoute.post('/html/single', validateUrlBody, validateUrl, getHTMLSingle);
crawlRoute.post('/html/download/single', validateUrlBody, validateUrl, getHTMLFileSingle);


crawlRoute.post('/html', validateUrlBody, validateUrl, getHTML);
crawlRoute.post('/html/download', validateUrlBody, validateUrl, getHTMLFile);

crawlRoute.post('/html/tags', validateUrl, getHTMLWithTags);
/* 
 #payload  for /html/tags
        {
           "url" : "https://nodejs.org/dist/latest-v20.x/docs/api/" , 
           "tag" : ["h1" , "div"]
        }


*/




module.exports = { crawlRoute };