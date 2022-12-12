import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const getUsers = async () => {
    let followers = [],
        following = [];

    await gather('followers');
    await gather('following');

    async function gather(type, page = 1) {
        let res = await axios({
            method: 'GET',
            url: `https://api.github.com/user/${type}?per_page=100&page=${page}`,
            headers: {
                Authorization: `Bearer ${process.env.TOKEN}`,
            },
        });
        res = res.data;

        // putting data in respective array
        if (type == 'followers') followers = [...followers, ...res];
        else following = [...following, ...res];

        // recursively call till every data is gathered
        if (res.length == 0) return;
        await gather(type, ++page);
    }

    // creating object with login
    const f1 = {},
        f2 = {};
    for (let user of followers) {
        f1[user.login] = 1;
    }
    for (let user of following) {
        f2[user.login] = 1;
    }
    return [f1, f2];
};

export default getUsers;
