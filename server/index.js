const express = require('express');
const path = require('path');


// We moved the controller implementations to their own separate file.
const { 
    serveJokes,
    serveJoke,
    createJoke,
    updateJoke,
    deleteJoke
} = require('./controllers/dadJokesControllers')

const app = express();
const pathToFrontendDist = path.join(__dirname, '../frontend/dist');
const port = 8080;

////////////////////////
// Middleware
////////////////////////
const logRoutes = (req, res, next) => {
    const time = (new Date()).toLocaleString();
    req.time = time;
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next();
}

const serveStatic = express.static(pathToFrontendDist);

// This parses incoming requests with JSON data in the body. 
const parseJSON = express.json();



app.use(logRoutes); // Logs the incoming requests 
app.use(parseJSON); // Parses incoming raw JSON data
app.use(serveStatic); // Serves static assets 

////////////////////////
// Endpoints
////////////////////////
app.get('/api/jokes', serveJokes);
app.get('/api/joke/:id', serveJoke);
app.post('/api/joke', createJoke);
app.patch('/api/joke/:id', updateJoke);
app.delete('/api/joke/:id', deleteJoke);

// Fallback route 
// app.get('*', (req, res, next) => {
//     if (req.originalUrl.startsWith('/api')) return next();
//     res.sendFile(pathToFrontendDist);
//   });
  
// Listening the express server on the specified port.
app.listen(port, () => console.log(`listening at http://localhost:${port}`));