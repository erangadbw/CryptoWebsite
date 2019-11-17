const request = require('request');
const moment = require('moment-timezone');

//calculate some unix hours we use late
var gmtaddDST = 11*60*60*1000;
var gmtadd = 10*60*60*1000



function isDateGreaterThan2018(timeStamp){
  return moment(timeStamp).tz('Australia/Melbourne').isAfter('2017-12-31')
}


//Creates a url which is sent to the BTCMarkets API to recieve actual exchange data
function createUrl(currency,timestamp){
    //actual Lambda servers only returnx unixTimestamps in gmtadd
    //below we convert the  unix timeStamps to melbourne time
    if(moment(timestamp).tz('Australia/Melbourne').isDST()){
     var unixTimeStamp = moment(timestamp).tz('Australia/Melbourne').valueOf()-gmtaddDST;
    } else {
       var unixTimeStamp = moment(timestamp).tz('Australia/Melbourne').valueOf()-gmtadd;
    }
  var baseurl = 'https://api.btcmarkets.net//v2/market/'+currency+'/AUD/tickByTime/hour?since='+unixTimeStamp+'&limit=24&indexForward=true&sortForward=true';
return baseurl
}

//function below calculates the maximum potential profit which could be made over the day
//We do this buy only assuming we can purchase or sell the asset at the opening price at each hourly interval.
//hence only the open price is used to calculate the maximum profit.
function findMinMax(pricedata) {

  let minlocation = 0;
  let maxlocation = 0;
  let maxProfit = 0;
  let curProfit = 0;

  for(var i=0, len = pricedata.length; i< len-1;i++){
    for(var j=i+1, len=pricedata.length; j <len;j++){
      curProfit = pricedata[j].open-pricedata[i].open
      if(curProfit >maxProfit) {
        maxProfit=curProfit
        minlocation=i;
        maxlocation =j
      }

    }
  }
  return [minlocation,maxlocation]
}

//creates the  payload to return to the front end.
function createDataToReturn(event,data, locations){
  var dataToReturn = {
    "currency":event.currency,
    "date":event.timestamp,
    "calcData" : {
        "minValue":data[locations[0]].open/100000000,
        "minTimeStamp":moment(data[locations[0]].timestamp).tz('Australia/Melbourne').format('h:mm:ss A'),
        "highValue":data[locations[1]].open/100000000,
        "highTimeStamp":moment(data[locations[1]].timestamp).tz('Australia/Melbourne').format('h:mm:ss A'),
        "profit":(data[locations[1]].open - data[locations[0]].open)/100000000,
        "unixTimeStamp": moment(event.timestamp).tz('Australia/Melbourne').valueOf(),
        "locations":locations,
        "url":createUrl(event.currency,event.timestamp),
        "isDTS":moment('2019-08-17').tz('Australia/Melbourne').isDST()
    }

  }

  return dataToReturn
}

exports.retrievePrice = function(event,context,callback) {

  const options = {
    url:createUrl(event.currency,event.timestamp),
    headers: {
      'Accept': 'application/json',

    }
  };

//Here we send the request to the BTCmarkets server to receive the price data
// and calculate the results to respond to the api request
request(options,function(err,res,body){
  if(err){
    callback(err,null)
  } else {

  let jsonData = JSON.parse(body);
  var data = jsonData.ticks;
  var locations = findMinMax(data)
  //create data to return to react

  //if the API does not receive any price data a Future date has been chosen
  //and  a error message is sent back
  if(data.length < 1) {
          var dataToReturn = {
              'errorMessage':"dateisGreaterThanToday"
      }
  //if a date before 2018 is chosen a error message is returned
  } else if(!isDateGreaterThan2018(event.timestamp)) {
    var dataToReturn = {
      'errorMessage':'dateIsBefore2018'
    }
  } else {
     dataToReturn = createDataToReturn(event,data, locations);
  }

  callback(err,dataToReturn);
  }
})

}
