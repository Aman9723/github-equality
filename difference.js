import getUsers from './getUsers.js';

const difference = async () => {
    const [followers, following] = await getUsers();

    // find people who are followers and i am not following them
    let follow = [];
    for (let user in followers) {
        if (!following[user]) {
            follow.push(followers[user]);
        }
    }

    // find people whom i am following and are not following back
    let unfollow = [];
    for (let user in following) {
        if (!followers[user]) {
            unfollow.push(following[user]);
        }
    }

    return { follow, unfollow };
};

export default difference;
