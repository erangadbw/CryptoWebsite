const retrievePriceDataTest = require('./retrievePriceDataTest')


test('checks if response Message Comes out', ()=> {

    expect(retrievePriceDataTest.requestCallback(null,require('./data.json'),{"timestamp":"2019-10-12","currency":"BTC"}))
    .toStrictEqual({
          "currency": "BTC",
          "date": "2019-10-12",
          "calcData": {
            "minValue": 12237.65,
            "minTimeStamp": "11:00:00 AM",
            "highValue": 12346.82,
            "highTimeStamp": "9:00:00 PM",
            "profit": 109.17
          }
        }
  )

})


test('if min max location is correct', ()=>{

  expect(retrievePriceDataTest.findMinMax(require('./data.json').ticks))
  .toStrictEqual([11,21]);

})

test('if URL creation is correct', ()=>{
  expect(retrievePriceDataTest.createUrl('BTC','2019-10-12'))
  .toBe("https://api.btcmarkets.net//v2/market/BTC/AUD/tickByTime/hour?since=1570798800000&limit=24&indexForward=true&sortForward=true")

})

test('check if date greater than today Error Message Correct', ()=>{
  expect(retrievePriceDataTest.requestCallback(null,{ticks:[]},{"timestamp":"2019-12-12","currency":"BTC"}))
  .toStrictEqual({'errorMessage':"dateisGreaterThanToday"})
})

test('check if date is before 2018 Error Message Correct', ()=>{
  expect(retrievePriceDataTest.requestCallback(null,require('./data.json'),{"timestamp":"2015-12-12","currency":"BTC"}))
  .toStrictEqual({'errorMessage':"dateIsBefore2018"})
})
