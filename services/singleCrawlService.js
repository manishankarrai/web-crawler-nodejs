const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const axios = require('axios');
const { generateRandomNumber } = require('./commonService');


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

const downloadHTML = async (url) => {
    try {
        const htmlContent = await fetchContent(url);
        const fileName = 'public/' + url.replace(/[^a-z0-9]/gi, '_') + generateRandomNumber() + '.html';
        await fs.writeFile(fileName, htmlContent);
        return fileName;
    } catch (error) {
        throw new Error(`Error downloading HTML: ${error.message}`);
    }
};


const crawlHTMLWithTag = async (url, tags) => {
    try {
        console.log(url, tags);
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        const elements = tags.map(tag => $(tag.trim()).toArray().map(el => $.html(el))).flat();
        
        return elements;
    } catch (error) {
        throw new Error(`Error fetching HTML content: ${error.message}`);
    }
};


module.exports = { crawlPage, downloadHTML, crawlHTMLWithTag };
