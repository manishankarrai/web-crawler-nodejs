const {  Crawl } =  require('../model/crawlModel');



const getCrawlData  =  async(req ,res)=> {
       try {
           
            let  result = await Crawl.find().sort({ createdAt: 'desc' });

            res.status(200).send({ message: "success" , data: result });

       } catch{
           res.status(500).send({ message: error.message, data: null });

       }
}

module.exports =  { getCrawlData };