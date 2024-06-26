const { crawlPage, downloadHTML } = require('../services/crawlService')
const { crawlPage: singleCrawlPage, downloadHTML: singleDownloadPage, crawlHTMLWithTag } = require('../services/singleCrawlService')
const { logger } = require('../services/loggerService');
const path = require('path');
const fs = require('fs');
const {  Crawl } =  require('../model/crawlModel');




const getHTML = async (req, res) => {
   try {

      let URL = req.body.url;
      let result = await crawlPage(URL);
      const crawlData = new Crawl({
         url: url ,
         data: result.join('\n'),
         ip:   req.ip ,
         route: req.url 
     });
     
     await crawlData.save();

      res.status(200).send({ message: "success", url: URL, data: result });

   } catch (error) {
      res.status(500).send({ message: error.message, data: null });
   }
}

const getHTMLFile = async (req, res) => {
   try {

      let URL = req.body.url;
      let filePath = await downloadHTML(URL);
      res.setHeader('Content-Disposition', 'attachment; filename=' + path.basename(filePath));
      res.setHeader('Content-Type', 'text/html');


      let fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

   } catch (error) {
      res.status(500).send({ message: error.message, data: null });
   }
}


const getHTMLSingle = async (req, res) => {
   try {

      let URL = req.body.url;
      let result = await singleCrawlPage(URL);
      const crawlData = new Crawl({
         url: url ,
         data: result.join('\n'),
         ip:   req.ip ,
         route: req.url 
     });
     
     await crawlData.save();

      logger.info({
         message: 'crawling on website ' + URL,
         ip: req.ip,
         method: req.method,
         url: req.url
      });
      res.status(200).send({ message: "success", url: URL, data: result });

   } catch (error) {
      logger.error({
         message: 'Error in crawling on website ' + URL,
         ip: req.ip,
         method: req.method,
         url: req.url
      });
      res.status(500).send({ message: error.message, data: null });
   }
}

const getHTMLFileSingle = async (req, res) => {
   try {

      let URL = req.body.url;
      let filePath = await singleDownloadPage(URL);
      res.setHeader('Content-Disposition', 'attachment; filename=' + path.basename(filePath));
      res.setHeader('Content-Type', 'text/html');

      logger.info({
         message: 'crawling on website ' + URL + ' , Download',
         ip: req.ip,
         method: req.method,
         url: req.url
      });
      let fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

   } catch (error) {
      logger.error({
         message: 'Error in crawling on website ' + URL + " , Download",
         ip: req.ip,
         method: req.method,
         url: req.url
      });
      res.status(500).send({ message: error.message, data: null });
   }
}

async function getHTMLWithTags(req, res) {
   const { url, tag } = req.body;

   try {

      let result = await crawlHTMLWithTag(url, tag);
      const crawlData = new Crawl({
         url: url ,
         data: result.join('\n'),
         ip:   req.ip ,
         route: req.url 
     });
     
     await crawlData.save();

      logger.info({
         message: 'crawling on website ' + url + ' and tag ' + tag,
         ip: req.ip,
         method: req.method,
         url: req.url
      });
      res.status(200).send({ message: "success", url: url , tags: tag, data: result });
   } catch (error) {
      logger.error({
         message: 'Error in crawling on website ' + url + "  and tag " + tag,
         ip: req.ip,
         method: req.method,
         url: req.url
      });
      res.status(500).send({ message: error.message, data: null });
   }
}



module.exports = { getHTML, getHTMLFile, getHTMLSingle, getHTMLFileSingle , getHTMLWithTags }