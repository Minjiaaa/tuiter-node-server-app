// 3.1 Requesting data from a Web server with a browser
import express from 'express';
import cors from 'cors'                                         // import the new cors library
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"        // import controller
import AuthController from "./users/auth-controller.js";        // make sure to include the extension
import TuitsController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";                          // import new server session library

// const express = require('express')
const app = express()

// configure cors right after instantiating express
app.use(
    cors({      
        credentials: true,                                          // restrict cross origin resource sharing to the react application
        origin: ["http://localhost:3000","https://a5--comforting-pie-745b0e.netlify.app"]    //  origin : "http://localhost:3000",
    })
);

app.use(express.json());            // parse JSON from HTTP request body
// Express defines a JSON middleware to parse data from the body. 
// All requests will first go through this middleware parsing the HTTP body into a JSON object added to the request object 
// in a new body property that later HTTP handlers can access.
app.use(                        // configure server session
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
    })
);

TuitsController(app);
HelloController(app)
UserController(app)                 // pass it app
AuthController(app);

app.listen(process.env.PORT || 4000);

// app.use((req, res, next)) => {
//     const allowedOrigins = ["http://localhost:3000", "https://a5--comforting-pie-745b0e.netlify.app/"]
//     const orgin = req.headers.origin;

//     if (allowedOrigins.includes(origin)) {
//         res.header("Access-Control-Allow-Origin", origin);
//     }

//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

// });
   
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})





