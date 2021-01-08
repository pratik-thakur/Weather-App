const request = require('request')

const geocode =(address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHJhdGlrNDIxIiwiYSI6ImNramdtY3Rpbzkyd3YzMXFqbjhmbXp5OXoifQ.yg-iBzZVgGOPuRIvwTNi8w&limit=1'

    request({url,json:true},(error,{ body })=>{
        // const data = JSON.parse(response.body)
        //   
        if(error)
        {
            callback('unable to connect to location services!',undefined)
        }
        else if (body.features.length===0)
        {
            callback('unable to find loaction . Try another search.',undefined)
        }
        else
        {
            callback(undefined,{
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
            
        }
       
    })

}

module.exports = geocode
