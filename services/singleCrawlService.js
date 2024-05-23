const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const { generateRandomNumber }  = require('./commonService');


const fetchContent = async (url) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const content = await page.content();
        await browser.close();
        return content;
    } catch (error) {
        throw new Error(`Error fetching content: ${error.message}`);
    }
};

const crawlPage = async (url) => {
    try {
        const htmlContent = await fetchContent(url);
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

// Download the HTML content of the page to a file
const downloadHTML = async (url) => {
    try {
        const htmlContent = await fetchContent(url);
        const fileName = 'public/' + url.replace(/[^a-z0-9]/gi, '_')+ generateRandomNumber()  + '.html';
        await fs.writeFile(fileName, htmlContent);
        return fileName;
    } catch (error) {
        throw new Error(`Error downloading HTML: ${error.message}`);
    }
};

module.exports = { crawlPage, downloadHTML };
