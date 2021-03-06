

## Overview

Access the website using the link below. Please use Chrome for the best expierence! :)

http://cryptowebsite.erangadbw.com.s3-website-ap-southeast-2.amazonaws.com/?



## Backend Architecture

The backend was created using a combination of the AWS Api gateway and lambda Services to Create a REST Api service. 

The API further requests data from an actual exchange to do the computation. 

The Website itself is hosted on a s3 bucket. 


### API Design 

The API was created with one endpoint https://f1qrz44wh9.execute-api.ap-southeast-2.amazonaws.com/api/crypto which has one POST method.
This post method invokes a lambda function -this sends a get request which hits the btcmarkets API to gather real exchange data to calculate the maximum profit for the day.

Below is an example of the BTC market endpoint 

https://api.btcmarkets.net/v2/market/BTC/AUD/tickByTime/hour?since=1537671600000&limit=4&indexForward=true&sortForward=true

Below is what the returned JSON data looks like.

```
{"success":true,"paging":{"newer":"/v2/market/BTC/AUD/tickByTime/hour??
limit=4&sortForward=true&indexForward=true&since=1537682400000","older":"/v2/market/BTC/AUD/tickByTime/hour?
limit=4&sortForward=true&since=1537671600000"},"ticks":
[{"timestamp":1537671600000,"open":908800000000,"high":909771000000,"low":906053000000,"close":906935000000,"volume":1113664994},
{"timestamp":1537675200000,"open":908506000000,"high":909770000000,"low":906936000000,"close":909184000000,"volume":929443810},
{"timestamp":1537678800000,"open":909187000000,"high":909600000000,"low":909187000000,"close":909596000000,"volume":215936611},
{"timestamp":1537682400000,"open":909596000000,"high":909616000000,"low":907175000000,"close":907175000000,"volume":388776816}]}
```
The lambda function will then calculate the maximum potential profit possible if we buy and sell a currency of your choice at the open price at hourly intervals over a day. 

Below is and example of what the output reponse from the api looks like for a succesfull query. 

```
        {
          "currency": "BTC",
          "date": "2019-10-12",
          "calcData": {
            "minValue": 12237.65,
            "minTimeStamp": "11:00:00 AM",
            "highValue": 12346.82,
            "highTimeStamp": "9:00:00 PM",
            "profit": 109.17
         }

```



## Lambda Files

All of the code placed into the lambda function can be found in the below folder 
`CryptoWebsite/CryptoProject - Challenge/lambdaFunctions/retrievePriceData/` in the retreivePriceData.js file



## Testing

### Front End

All component and intergration tests were done using cypress 

Please find all of the test cases by looking in the 
`CryptoWebsite/CryptoProject - Challenge/cryptowebsite/cypress/integration/tests/` folder 

### Back End

Testing of the lambda functions functionality was done using Jest. 

Please find all of the tests cases by looking in the 

`CryptoWebsite/CryptoProject - Challenge/lambdaFunctions/lambdaAPITests/` Folder.

example test cases are provided in the data.json file and in the spec file. 






