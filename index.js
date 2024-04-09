const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config();

// 3 on use start (cors, express.json(), bodyParser.urlencoded)
app.use(cors())

// Get variable environment
const portServer = process.env.PORT_SERVER_RUNNING

// Connected on database ft mongodb
mongoose.connect(process.env.URL_MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Successfully connect on database')
})
.catch((error) => {
    console.log(error)
})

// Middleware untuk mengatur timeout
app.use((req, res, next) => {
    res.setTimeout(20000, () => {
        res.status(408).send('Request timeout');
    });
    next();
});

app.use(express.json({ limit: '250mb' }));
app.use(express.urlencoded({ limit: '250mb', extended: true }));

// Middleware
const checkToken = require('./middlewares/verifyToken')

// Routers
const accountRouter = require('./routers/accountRouter')

const articleRouter = require('./routers/articleRouter')
const tourRouter = require('./routers/tourRouter')
const islandRouter = require('./routers/islandRouter')

const articleRouterAPI = require('./routers/articlelRouterAPI')
const islandRouterAPI = require('./routers/islandRouterAPI')
const tourRouterAPI = require('./routers/tourRouterAPI')

app.use('/akun', accountRouter)
app.use('/article', checkToken, articleRouter)
app.use('/island', checkToken, islandRouter)
app.use('/tour', checkToken, tourRouter)

// Public API
app.use('/v1/api/article', articleRouterAPI)
app.use('/v1/api/island', islandRouterAPI)
app.use('/v1/api/tour', tourRouterAPI)

app.get('/test', (req, res) => {
    res.send('test success!')   
})

// Running test
app.listen(portServer,() => {
    console.log(`Running on port ${portServer}`)
})