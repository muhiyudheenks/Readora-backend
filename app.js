const express = require('express')
const errorHandler = require('./middleware/errorMiddleware')
const userRoutes = require('./routes/userRouter')
const bookRoutes = require('./routes/bookRouter')
const cors = require('cors')
const categoryRoutes = require('./routes/categoryRoute')
const homeRoutes = require('./routes/homeRoutes')
const cartRoutes = require('./routes/cartRoutes')
const wishlistroutes = require('./routes/wishlistRoute');
const orderRoutes = require('./routes/orderRouter');
const paymentRoute = require('./routes/paymentRoute');
const dashboardRoutes = require('./routes/dashbordRoute');
const messgeroute = require('./routes/messageRute')

const app = express()

app.get('/', (req, res) => {
    res.send('Server is running!')
})


app.use(cors({
    origin: ["http://localhost:5173",
        "http://localhost:4173",
        'https://readora-chi.vercel.app',
        "https://readora-app.netlify.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json())



app.use("/api", bookRoutes)
app.use("/api/users", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", homeRoutes)
app.use("/api", cartRoutes)
app.use("/api", wishlistroutes)
app.use("/api", orderRoutes)
app.use('/api/payment', paymentRoute);
app.use('/api', dashboardRoutes)
app.use('/api', messgeroute)
app.use(errorHandler)
module.exports = app