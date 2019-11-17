const request = require('request');
const moment = require('moment-timezone');

var gmtaddDST = 11*60*60*1000;
var gmtadd = 10*60*60*1000;

function isDateGreaterThan2018(timeStamp){
  return moment(timeStamp).tz('Australia/Melbourne').isAfter('2017-12-31')
}

function createUrl(currency,timestamp){
  var unixTimeStamp = moment(timestamp).tz('Australia/Melbourne').valueOf();
  var baseurl = 'https://api.btcmarkets.net//v2/market/'+currency+'/AUD/tickByTime/hour?since='+unixTimeStamp+'&limit=24&indexForward=true&sortForward=true';
return baseurl
}

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

function createDataToReturn(event,data, locations){
  var dataToReturn = {
    "currency":event.currency,
    "date":event.timestamp,
    "calcData" : {
        "minValue":data[locations[0]].open/100000000,
        "minTimeStamp":moment(data[locations[0]].timestamp).tz('Australia/Melbourne').format('h:mm:ss A'),
        "highValue":data[locations[1]].open/100000000,
        "highTimeStamp":moment(data[locations[1]].timestamp).tz('Australia/Melbourne').format('h:mm:ss A'),
        "profit":(data[locations[1]].open - data[locations[0]].open)/100000000
    }

  }

  return dataToReturn
}


 function requestCallback(err,body,event){
  if(err){
    return "Error"
  } else {

  let jsonData = body;
  var data = jsonData.ticks;
  var locations = findMinMax(data)
  //create data to return to react
  if(data.length < 1) {
          var dataToReturn = {
              'errorMessage':"dateisGreaterThanToday"
      }
  } else if(!isDateGreaterThan2018(event.timestamp)) {
    var dataToReturn = {
      'errorMessage':'dateIsBefore2018'
    }
  } else {
     dataToReturn = createDataToReturn(event,data, locations);
  }

  return dataToReturn;
  }
}

module.exports.requestCallback = requestCallback;
module.exports.createDataToReturn = createDataToReturn;
module.exports.findMinMax = findMinMax;
module.exports.createUrl = createUrl;
