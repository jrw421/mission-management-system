const express = require('express');
const bodyParser = require('body-parser');
const items = require('../database-mysql');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.get('/heroes/:id', (req, res) => {
  const heroId = req.params.id;
  items.selectHeroById(heroId, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/hero-stats/:id', (req, res) => {
  const heroId = req.params.id;
  items.selectHeroStatsById(heroId, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/villian-stats/:id', (req, res) => {
  const villianId = req.params.id;
  items.selectVillianStatsById(villianId, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/heroes_villians', (req, res) => {
  items.loadData((err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log('data loaded successfully');
    }
  });
  items.selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
