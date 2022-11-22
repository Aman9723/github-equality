## Github-Equality

## What can I do?
> You can use this repo to make your github followers = following. It means that you will follow only those people who are following you and you will unfollow people who are not following you. Not suggested to use for people who have big fan following. 

## How it works?
1. It fetches all the data of followers and following from the github api. 
2. Then it finds the difference between the two data sets. If a user is only present in one of the data set then it will take action on that. 
3. Finally it is ready with the differences. 
4. Now, it uses puppeteer for chrome automation and will visit the profiles of all user via signing into your account and will take reverse action on it (follow/unfollow). 
5. It is slow because it highly depends on the gui but fast enough than the human. Will not work if your two factor authentication is on.

## Getting Started
To use this repo run:
```
git clone https://github.com/Aman9723/github-equality.git
cd /github-equality
npm i
npm start
```
Create a `.env` file in the `github-equality` folder:
```
USER: <your github username as string>
PASSWORD: <your github password as string>
```
