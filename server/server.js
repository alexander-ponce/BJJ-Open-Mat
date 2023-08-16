const express = require('express');
const app = express();

// cors cross-origin requests
const cors = require('cors')

// middleware for cookies
const cookieParser = require('cookie-parser')
const PORT = 8000;


app.use( express.json() )
app.use( express.urlencoded({extended:true}) )
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser())


// connect to mongooese and routes
require('./config/mongoose.config')
require('./routes/user.routes')(app)
require('./routes/openmat.routes')(app)

// app listen to port
app.listen(PORT, () => console.log(`Party on port: ${PORT}`) );

// LOGIN REG INSTALL
// npm i bcrypt dotenv cookie-parser jsonwebtoken
