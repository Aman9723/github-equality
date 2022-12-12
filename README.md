## Github🟰Equality

## 🤷‍♂️ What can you do?

> You can use this repo to make your github followers = following. It means that you will follow only those people who are following you and you will unfollow people who are not following you. Not suggested to use for people who have big fan following. 

## ⚒️ How it works?

1. It fetches all the followers and following of the user from the github api.
2. Finds the difference between followers and following i.e, users not present in both.
3. Take action on the difference by creating a follow / unfollow request with the github api.
4. You can play around with the code to make something cooler or deploy it to run 24x7.

## 🚀 Getting Started

To use this repo follow below steps:

`Go to your github settings > Developer settings > Personal access tokens > token(classic) > Generate new token > name the token > check(✔️) user:follow scope > Generate token > copy the token`

Create a `.env` file and put `TOKEN = <generated token>` as string  after git clone.

```
git clone https://github.com/Aman9723/github-equality.git
cd .\github-equality\
npm i
npm start
```


