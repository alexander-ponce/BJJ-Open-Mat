// read enviroment variables
// require('dotenv').config()

// express: js framework - interface to Node Server
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





// require('dotenv').config();
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const userRoutes = require('./routes/user.routes');
// const CONTROLLER = require('./controllers/user.controller');
// const openMatRoutes = require('./routes/openmat.routes');
// const verifyToken = require("./controllers/auth.middleware");

// require('./config/mongoose.config');

// app.use(cors());
// app.use(express.json());
// userRoutes(app);
// openMatRoutes(app);

// const corsOptions = {
//     origin: 'http://localhost:3000', // specify the origin 
//     credentials: true,  // allow credentials
//     optionsSuccessStatus: 200, 
//   };
  
//   app.use(cors(corsOptions));


// app.get("/user", verifyToken, CONTROLLER.getUser)
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.use((err, req, res, next) => {
//     if (err.name === 'ValidationError') {
//         res.status(400).json({ errors: err.errors });
//     } else {
//         console.log(err);
//         res.status(500).json({ message: "An unexpected error occurred. Please try again." });
//     }
// });

// app.use((req, res, next) => {
//     res.status(404).json({ message: "Route not found" });
// });

// const port = process.env.PORT || 8000;
// app.listen(port, () => console.log(`Server running on port ${port}`));


// LOGIN REG INSTALL
// npm i bcrypt dotenv cookie-parser jsonwebtoken


// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.json());

// app.post('/submit-form', (req, res) => {
//     console.log(req.body);  // print the form data to console
//     res.status(200).send("Form submitted successfully");
// });

// const port = process.env.PORT || 3001;
// app.listen(port, () => console.log(`Server is running on port ${port}`));


