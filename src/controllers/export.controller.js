const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.get('/', async (req, res) => {
    const url = req.query.url;
    const window = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        defaultViewport: null
    });
    if (!url || typeof url !== 'string') {
        throw new Error('URL must be a string');
    }

    const page = await window.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.emulateMedia('screen');
    const pdfParams = {
        margin: 'none',
        printBackground: true
    };

    const pdfBuffer = await page.pdf(pdfParams);
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${url}.pdf`,
        'Content-Length': pdfBuffer.length
    });
    res.end(pdfBuffer);
});

module.exports = router;

