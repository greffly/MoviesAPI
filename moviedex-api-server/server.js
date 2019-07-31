require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const MOVIEDATA = require('./movie-data.json');

const app = express();

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganSetting));
app.use(cors());

app.use(function validateToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
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
    response = response.filter(
      movie => parseInt(movie.avg_vote) > parseInt(req.query.vote)
    );
  }

  res.json(response);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
