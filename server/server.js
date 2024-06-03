require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const router = require("./router/auth-router");
const connectDB = require("./utils/db")
const cors = require('cors');

// const bookingApi = `${process.env.CLIENT_API}/bookinglist`;
// const clientApi = process.env.CLIENT_API;

app.use( express.json() );

// to allow all type of requests from any port
app.use(cors());

// to allow all type of requests from port:5173
// app.use(cors({
//     origin: `http://localhost:5173`
//   }));

  // to allow particular type of requests from port:5173
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type', 'Authorization']
//   }));

app.use("/api", router);

// app.use("/", (req,res) => {
//     res.status(200).send("Hello Welocme to Home Page")
// })

// after database connection we can activate our server 
connectDB().then( () => {
    app.listen(PORT, () => {
        console.log(`Server is runnning on ${PORT}`);
    });    
});


// Static Files
// app.use(express.static(__dirname + "../client/login.html"));
// Specific folder example
// app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/images'))