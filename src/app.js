const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
 
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Weather Forecast team.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'Weather Forecast team.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Weather Forecast team.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'         
        })
    }

    geocode(req.query.address, (error, {lat, lon, loc} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(lat, lon, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                loc,
                address: req.query.address
            })
        }) 
    })
})

app.get('/products', (req, res) => {
    res.send({

        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Weather Forecast team.',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Weather forecast team.',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server listening on port: 3000')
})