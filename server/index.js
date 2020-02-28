let express = require('express');
let bodyParser = require('body-parser');
let items = require('../database-mysql');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/heroes/:id', (req, res) => {
  let heroId = req.params.id;
  items.selectHeroById(heroId, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  })
})

app.get('/heroes_villians', (req, res) => {
  items.loadData((err, data) => {
    if (err) {
      console.log('error: ', err)
    } else {
      console.log('data loaded successfully')
    }
  });
  items.selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

