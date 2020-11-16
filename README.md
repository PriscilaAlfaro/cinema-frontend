
# Cinema CR 
Our goal is to create a simply app to recreate a small movie theather in two languajes(Swedish and Spanish). This project is the final exam of the course of junior full stack of `SmartCoding`, developed in Swedish between octuber and november 2020. 

# Idea
We are a cinema chain located in Sweden dealing with mostly an immigrant population from
Latinamerica and Spain.
We would like to make everyone feel inclusive by offering movie options in their original language dialect by providing a dubbing or subtitles to the movies we cast.
Our company goals include and are not limited to the following:
• Increase our brand awareness
• Improve our online presence with a modern and mobile responsive adaptive website
• Increase sales by accepting online payments end not just on-premise payments
• Handle booking management online

Assumptions
- There is no COVID-19 situation
- It is business as usual (bookings can happen between 8.00 and 21.30 every day)

### Tech

We are using a number of open source tools:

- [React] - A JavaScript library for building user interfaces
- [Axios] - Promise based HTTP client for the browser and node.js

### Installation

Install all dependencies and start the project.

```sh
$ cd cinema-frontend
$ npm install
$ npm start
```

### Setup

Eslint must be installed globally: `npm install -g eslint`

Create an `.env.local` file at the root directory of the application. Just add the variables REACT_APP_BASE_URL, REACT_APP_STRIPE_API_KEY.

```
REACT_APP_BASE_URL="http://localhost:4001"
```

Since we're using create-react-app, It does some tricks for you and simulates the same behavior inside the browser, only if you put the REACT*APP* prefix before your env variables.

Note:

> You must create custom environment variables beginning with REACT*APP*. Any other variables except NODE_ENV will be ignored to avoid accidentally exposing a private key on the machine that could have the same name. Changing any environment variables will require you to restart the development server if it is running.


