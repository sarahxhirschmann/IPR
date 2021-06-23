// SERVER
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')
const db = new sqlite3.Database('./db/Kochbuch.db');

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/public', express.static(process.cwd() + '/public'));


//__________________________________INDEX ABLAUF START________________________________________________________

app.set('view engine', 'ejs');

//fotos
app.use(express.static('public'));

// use res.render to load up an ejs view file
// index page
app.get('/index', function(req, res) {
  res.render('pages/index');
});
// addRecipes page
app.get('/addRecipes', function(req, res) {
  res.render('pages/addRecipes');
});
/*// addBooks page
app.get('/addBooks', function(req, res) {
  res.render('pages/addBooks');
});*/
/*// changeRecipes page
app.get('/changeRecipes', function(req, res) {
  res.render('pages/changeRecipes');
});*/
//deleteRecipes page
app.get('/deleteRecipes', function(req, res) {
  res.render('pages/deleteRecipes');
});
/*// login page
app.get('/login', function(req, res) {
  res.render('pages/login');
});*/
// add page
// recipe page
app.get('/recipe', function(req, res) {
  res.render('pages/recipe');
});
app.get('/book', function(req, res) {
  res.render('pages/book');
});

//__________________________________INDEX ABLAUF ENDE________________________________________________________


//__________________________________DB START_________________________________________________________________

app.post('/api/recipes', (req, res) => {
  if (req.body.title) {
    db.run('INSERT INTO recipes(title, book, incredients, preparation) VALUES (?, ?, ?, ?);', [req.body.title, req.body.books, req.body.incredients, req.body.preparation], function (err) {
      if(err) {
        res.json({error: err});
      } else {
        res.json({
          ...req.body,
          ID: this.lastID,
        });
      } 
    });
  } else {
    res.json({error:"Request body is not correct"});  
  }
});


app.post("/api/recipes", (req, res) => {
  console.log("Test123")
  if (req.body.e) {
  db.run('DELETE recipes WHERE ID == ?;', [req.body.e], function (err) {
    if(err) {
      res.json({error: err});
    } else {
      res.json({
        ...req.body,
      });
    } 
  });
} else {
  res.json({error:"Request body is not correct"});  
}
});




app.get("/api/recipes", (req, res) => {
  db.all("SELECT * FROM recipes", (err, recipes) => {
    res.json(recipes);
  });
});




//__________________________________DB START_________________________________________________________________




const server = app.listen(port, () => {
 console.log(`Server listening on port ${port}…`)
});

module.exports = server
