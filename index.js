import axios from 'axios';
import difference from './difference.js';
import dotenv from 'dotenv';
dotenv.config();

const equality = async () => {
    try {
        const { follow, unfollow } = await difference();

        // if already equal 
        if (!follow.length && !unfollow.length) {
            console.log('Already 🟰');
            return;
        }
        console.log(follow, unfollow);

        // iterate and act 
        for (let username of follow) {
            await action('PUT', username);
        }
        for (let username of unfollow) {
            await action('DELETE', username);
        }

        console.log('Job done 😎');

        // follow / unfollow action
        async function action(meth, username) {
            await axios({
                method: `${meth}`,
                url: `https://api.github.com/user/following/${username}`,
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN}`,
                },
            });
        }
    } catch (e) {
        console.log(e.message);
    }
};

equality();
