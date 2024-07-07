const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/submit-form', (req, res) => {
  console.log(req.body);
  res.send('Form submission successful');
});

app.get('/user/:name', (req, res) => {
  res.render('user', { name: req.params.name });
});

app.get('/download-image', (req, res) => {
  res.download(__dirname + '/public/image.jpg', 'downloaded-image.jpg', (err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
