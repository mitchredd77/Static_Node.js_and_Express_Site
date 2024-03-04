const express = require('express');

// Project data in data.json
const { projects } = require('./data.json')
const app = express();

// Serving static files from public
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

// Main index page
app.get('/', function(req, res, next) {
  res.render('index', { projects });
  });

// About page
app.get('/about', function(req, res, next) {
    res.render('about', { projects });
  });

// Individual project page
app.get('/project/:id', function(req, res, next) {
  // Find the project with the matching ID
  const projectId = req.params.id;
  const project = projects.find(project => project.id === projectId);

  // Check if project is found, otherwise handle error 
  if (!project) {
    next (new Error('Project not found'));
  }
  // Render the template with the specific project
  res.render('project', { project });
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
  console.log("There has been a 404 error!");
});
// Error handling middleware
app.use(function(err, req, res, next) {
  // Set status code based on error (or default to 500)
  let status = err.status || 500;

  // Render appropriate template based on status code
  let template = status === 404 ? 'page-not-found.pug' : 'error';
  res.locals.error = err;
  res.status(500);
  console.log("There has been an error!");
  res.render(template);
});
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});