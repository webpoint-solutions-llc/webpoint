const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const formsubmit = require('./controllers/formsubmit');
const Process = require('process');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
  });


const app = express();

//BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//STATIC FOLDER
app.use('/public', express.static(path.join(__dirname, 'public')))

//SET VIEW ENGINE

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//ROOT ROUTE
app.get('/', (req, res)=> {
   res.render('index');
})

//SEND END POINT
app.post('/formsubmit', (req, res) => {formsubmit.handleFormSubmit(req, res, db)})

app.listen(Process.env.PORT || 3000, () => {
    console.log(`Server is running on port..${Process.env.PORT}` );
})