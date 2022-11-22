import axios from 'axios';

const getUsers = async () => {
    // getting followers
    let followers = await axios.get(
        `https://api.github.com/users/${process.env.USER}/followers?per_page=10000`
    );
    followers = followers.data;

    // getting following
    let following = await axios.get(
        `https://api.github.com/users/${process.env.USER}/following?per_page=10000`
    );
    following = following.data;

    // creating object with {login: html_url}
    const f1 = {},
        f2 = {};
    for (let user of followers) {
        f1[user.login] = user.html_url;
    }
    for (let user of following) {
        f2[user.login] = user.html_url;
    }
    return [f1, f2];
};

export default getUsers;
