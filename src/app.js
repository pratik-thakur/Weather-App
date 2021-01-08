const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')

//setup handlebard engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'pratik'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'pratik'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is some helpful',
        title:'Help',
        name:'Pratik'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error, forecastdata )=>{
            if(error)
            {
                return res.send({error})
            }

            res.send({
                forecast : forecastdata,
                location,
                address : req.query.address
            })
        })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404'
        ,name:'Pratik'
        ,errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404'
        ,name:'Pratik'
        ,errorMessage:'Page not found'
    })
})

app.listen(port,()=>{
    console.log('server is up on port 3000')
})