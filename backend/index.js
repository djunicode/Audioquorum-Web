// Importing modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./connection');

// Initializing an express app
const app = express();

// Server Port
const PORT = process.env.PORT || 5001;

// Formatting incoming data
app.use(cors());
app.use(express.json());

// Logging
app.use(morgan('dev'));

// Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDocs = YAML.load('./api.yaml');
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

// Importing Routes
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const studentRouter = require('./routes/student');
const testRouter = require('./routes/test');
//const fileUpload = require('express-fileupload');

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/student', studentRouter);
app.use('/api/test', testRouter);
//app.use(fileUpload());

app.get('/api', (req, res) => {
    res.json({ message: "Hello from server!" });
});
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});