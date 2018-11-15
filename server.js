const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const PORT = 8081;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://localhost/todolistdb', { useNewUrlParser: true });

require('./routes/api_routes')(app);
require('./routes/html_routes')(app);

app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});
