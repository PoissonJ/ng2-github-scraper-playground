var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var moment = require('moment');
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
      var previousDate = null;
      var currentDate = null;

      var $ = cheerio.load(html)

      var count = 0
      $('.day').each(function(i, elem) {
        var dateString = $(this).attr('data-date')

        // console.log(dateString);
        var currentDate = moment(dateString);
        if (previousDate) { // make sure previous date is defined
          console.log('current  :' + currentDate.format());
          console.log('previous : ' +previousDate.format());
          if (currentDate.subtract(1, 'day').format() == previousDate.format()) {
            console.log('worked');
          }
        }

        currentDate.add(1, 'day'); // have to add a day becuase the subtract funciton
        // changes the value
        // console.log(date.format());
        previousDate = currentDate;
        count++
      });
      console.log('total:' + count);


      res.status(200).json({
        image: html
      });

    } else {
      res.send(error)
    }
  })
});

module.exports = router;
