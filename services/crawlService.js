const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs  =  require('fs').promises
const { generateRandomNumber }  = require('./commonService');



const fetchContentRecursive = async (url, accumulatedContent = '') => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        accumulatedContent += await page.content();

        const links = await page.$$('a');
        for (const link of links) {
            const newUrl = await (await link.getProperty('href')).jsonValue();
            if (newUrl && newUrl.startsWith('http')) {
                accumulatedContent = await fetchContentRecursive(newUrl, accumulatedContent);
            }
        }

        await browser.close();
        return accumulatedContent;
    } catch (error) {
        throw new Error(`Error fetching content: ${error.message}`);
    }
};


const crawlPage = async (url) => {
    try {
        const htmlContent = await fetchContentRecursive(url);
        const $ = cheerio.load(htmlContent);
        const items = [];

        $('*').each((index, element) => {
            const item = $(element).text().trim();
            if (item) {
                items.push(item);
            }
        });

        return items;
    } catch (error) {
        throw new Error(`Error crawling the page: ${error.message}`);
    }
};

const downloadHTML =  async(url)=> {
    const htmlContent = await fetchContentRecursive(url);
    let fileName =  'public/' + url.replace(/[^a-z0-9]/gi, '_')+ generateRandomNumber() + '.html';
    await fs.writeFile(  fileName, htmlContent );
    return fileName ;
}

module.exports = { crawlPage , downloadHTML };
