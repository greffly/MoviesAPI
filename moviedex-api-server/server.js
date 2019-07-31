require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const MOVIEDATA = require('./movie-data.json');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(function validateToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  if (!authToken || authoToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized Request' });
  }
  next();
});

app.use(express.json());

app.get('/movie', function handleGetMovies(req, res) {
  let response = MOVIEDATA;

  if (req.query.genre) {
    response = response.filter(movie =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }

  if (req.query.country) {
    response = response.filter(movie =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }

  if (req.query.vote) {
    response = response.filter(movie =>
      movie.avg_vote.toLowerCase().includes(req.query.vote.toLowerCase())
    );
  }

  response.json(response);
});

const port = 8100;

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
