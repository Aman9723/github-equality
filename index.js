import difference from './difference.js';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

const reverseAction = async () => {
    const arr = await difference();
    console.log(arr);

    if (!arr.length) {
        console.log('Already equal');
        return;
    }
    const page = await signinGithub();

    const clickBtn = async (url) => {
        //go to profile
        await page.goto(url, {
            waitUntil: 'load',
        });
        // click the follow / unfollow button respectively
        await page.click('span.user-following-container:nth-child(3)');
    };

    // iterate through all the links
    for (let url of arr) {
        try {
            await clickBtn(url);
        } catch {
            continue;
        }
    }

    console.log('Job done 😉');
};

const signinGithub = async () => {
    // configure browser
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'],
    });
    const page = await browser.newPage();
    await page.goto('https://github.com/login', {
        waitUntil: 'load',
    });

    // enter credential
    await page.type('#login_field', process.env.USER);
    await page.type('#password', process.env.PASSWORD);
    await page.click('.btn');

    await page.waitForTimeout(process.env.TIMEOUT);

    console.log('signedin');
    return page;
};

reverseAction();
