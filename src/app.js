//Imports
const express = require("express");

// Server configurations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json())

// Routes
app.use(require('./routes/todos'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server started at port ${app.get('port')}`);
});