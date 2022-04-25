// Importing modules
const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const db = require('./connection');
const cookieParser = require("cookie-parser")

// Initializing an express app
const app = express();

// Server Port
const PORT = process.env.PORT || 5001;

// Formatting incoming data
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// Logging
app.use(morgan('dev'));

//Swagger
const swaggerUI = require("swagger-ui-express");
//const fileUpload = require("express-fileupload");
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("./api.yaml");
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
//app.use(fileUpload());

//Importing Routes
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
//const studentRouter = require('./routes/student')

app.use('/api/users', userRouter)
app.use('/api/admin', adminRouter)
//app.use('/api/student', studentRouter)

app.get('/api', (req, res) => {
    res.json({ message: "Hello from server!" });
});
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});