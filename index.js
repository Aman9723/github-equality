import difference from './difference.js';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

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
    return { page, browser };
};

const reverseAction = async () => {
    const { follow, unfollow } = await difference();
    console.log(follow, unfollow);

    if (!follow.length && !unfollow.length) {
        console.log('Already equal');
        return;
    }
    const { page, browser } = await signinGithub();

    const clickBtn = async (url, type) => {
        //go to profile
        await page.goto(url, {
            waitUntil: 'load',
        });

        // click the follow / unfollow button respectively
        if (type === 'follow') {
            await page.click(
                'span.user-following-container:nth-child(3) > form:nth-child(1) > input:nth-child(2)'
            );
        } else {
            await page.click(
                'span.user-following-container:nth-child(3) > form:nth-child(2) > input:nth-child(2)'
            );
        }
    };

    // iterate through all the links to follow
    for (let url of follow) {
        try {
            await clickBtn(url, 'follow');
        } catch (e) {
            console.log(e.message);
            continue;
        }
    }

    // iterate through all the links to unfollow
    for (let url of unfollow) {
        try {
            await clickBtn(url, 'unfollow');
        } catch (e) {
            console.log(e.message);
            continue;
        }
    }

    await page.waitForTimeout(2000);
    await browser.close();
    console.log('Job done 😉');
};

reverseAction();
