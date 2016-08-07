var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var gs = require('github-scraper');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // res.send(url);
  res.render('index');
});

router.get('/githubContribution', function(req, res, next) {
  url = "https://github.com/users/poissonj/contributions";

  request(url, function(error, response, html) {

    if (!error) {
      var $ = cheerio.load(html)
      console.log(html);
      res.status(200).json({
        image: html
      });
      // res.send(html);

    } else {
      res.send(error)
  }

  })
});

module.exports = router;
