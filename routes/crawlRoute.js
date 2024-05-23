const express =  require('express');
const crawlRoute =  express.Router();
const { getHTML , getHTMLFile  , getHTMLSingle  , getHTMLFileSingle}  =  require('../controller/crawlController');
const  { validateUrlBody , validateUrl } =  require('../utils/validateUrl');



crawlRoute.post('/html/single' ,  validateUrlBody ,  validateUrl  , getHTMLSingle ); //apply loggin 
crawlRoute.post('/html/download/single' ,  validateUrlBody ,  validateUrl  , getHTMLFileSingle ); //apply loggin 


crawlRoute.post('/html' , validateUrlBody ,  validateUrl , getHTML ); //apply loggin 
crawlRoute.post('/html/download' , validateUrlBody ,  validateUrl  , getHTMLFile ); //apply loggin 






module.exports = { crawlRoute} ;