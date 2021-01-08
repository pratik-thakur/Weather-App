const request = require('request')

const forecast = (latitude , longitude , callback) =>{

    const url ='https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid=5ae84c9dac9e6560b6834414b89401d0&units=metric'

request({url,json:true},(error,{ body })=>{
 // const data = JSON.parse(response.body)
   
   if(error)
   {
       callback('unable to connect to weather services!',undefined)
   }
   else if (body.message)
   {
        callback(body.message,undefined)
   }
   else
   {
        callback(undefined,'<br>Todays weather : '+body.weather[0].main+'<br><br> Wheather Description : '+body.weather[0].description+'<br><br>Temperature : '+body.main.temp)
   }
})


}

module.exports = forecast

