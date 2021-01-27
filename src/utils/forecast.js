const request = require('request')

const forecast = (latitude , longitude , callback) =>{

    const url ='https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid='+encodeURIComponent(process.env.OPENW_API_KEY)+'&units=metric'

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
       //console.log(body)
        callback(undefined,'<br>Todays weather : '+body.weather[0].main+'<br><br> Wheather Description : '+body.weather[0].description+'<br><br>Temperature : '+body.main.temp+' degree C<br><br>Temperature Max : '+body.main.temp_max+' degree C<br><br>Temperature Min : '+body.main.temp_min+' degree C<br><br>Humidity : '+body.main.humidity+' %')
   }
})


}

module.exports = forecast

