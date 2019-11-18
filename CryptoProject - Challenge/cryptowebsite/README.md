

## Overview

Access the website using the link below. Please use Chrome for the best expierence! :)

http://cryptowebsite.erangadbw.com.s3-website-ap-southeast-2.amazonaws.com/?

## Backend Architecture

The backend was created using a combination of the AWS Api gateway and lambda Services to Create a REST api service which uses
24 hours worth of price data from a actual exchange. 

### API Design 

The API was created with one endpoint https://f1qrz44wh9.execute-api.ap-southeast-2.amazonaws.com/api/crypto which has one POST method.
This post method sends a get requests which hits the btc markets API to gather real exchange data to calculate the maximum profit for the day.

Below is an example of the BTC market endpoint 

https://api.btcmarkets.net/v2/market/BTC/AUD/tickByTime/hour?since=1537671600000&limit=4&indexForward=true&sortForward=true

Below is what the returned JSON data looks like.

>{"success":true,"paging":{"newer":"/v2/market/BTC/AUD/tickByTime/hour??>limit=4&sortForward=true&indexForward=true&since=1537682400000","older":"/v2/market/BTC/AUD/tickByTime/hour?>limit=4&sortForward=true&since=1537671600000"},"ticks":>[{"timestamp":1537671600000,"open":908800000000,"high":909771000000,"low":906053000000,"close":906935000000,"volume":1113664994},>{"timestamp":1537675200000,"open":908506000000,"high":909770000000,"low":906936000000,"close":909184000000,"volume":929443810},>{"timestamp":1537678800000,"open":909187000000,"high":909600000000,"low":909187000000,"close":909596000000,"volume":215936611},>{"timestamp":1537682400000,"open":909596000000,"high":909616000000,"low":907175000000,"close":907175000000,"volume":388776816}]}





### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
