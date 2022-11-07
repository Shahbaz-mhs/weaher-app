const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const ViewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup Habndlebars engine and views loaction
app.set('view engine', 'hbs')
app.set('views', ViewsPath)
hbs.registerPartials(partialsPath)


//Setup Static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shahbaz Khan'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Shahbaz Khan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hello this is a Forecast Weather App',
        title: 'Help Page',
        name: 'Shahbaz Khan'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    address = req.query.address
    // console.log(req.query.address)
    // res.send({
    //     forecast: 50,
    //     location:'Mumbai',
    //     address: req.query.address
    // })


    geocode(address,(error, {latitude, longitude, temp} = {})=>{
        // console.log('Error', error)
        // console.log('Data',data)
        if(error){
        // return console.log(error)
         return res.send({
            error
         })
        }
       
         forecast(latitude,longitude,(error,{name} = {}) => {
           if(error){
            // return console.log(error)
             return res.send({
                error
             })
           }
          // console.log('Error', error)
           //console.log(data.latitude)
          // console.log(name)
           res.send({
            address: name,
            latitude,
            longitude,
            temperature: temp+'C'
           })
         })
       
       })




})

// app.get('/search',(req, res) => {
//     if(!req.query.address){
//         return res.send({
//             error: 'You must provide address'
//         })
//     }

//     console.log(req.query.address)
//     res.send({
//         forecast: 50,
//         location:'Mumbai',
//         address: req.query.address
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help articles not found',
        name: 'Shahbaz Khan'
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Shahbaz Khan'
    })
})

app.listen(port, () => {
    console.log('Server is up on '+port)
})