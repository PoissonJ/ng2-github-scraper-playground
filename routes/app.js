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
      var count = 0

      var previousDate = null;
      var currentDate = null;

      var previousDateDataCount = 0;
      var currentDateDataCount = 0;

      var $ = cheerio.load(html)

      // Loop through each <rect> element
      $('.day').each(function(i, elem) {

        // Extract the data count for the day
        currentDateDataCount = $(this).attr('data-count')

        if (currentDateDataCount != 0 && count == 0) {
          // Start of new streak count
          count = 1;
        }

        // We only want to continue scraping if there is a streak happening
        if (count > 0) {

          //Grab the date from the current element and create new date object
          var dateString = $(this).attr('data-date');
          currentDate = moment(dateString);

          // Add to steak if the data count from previous is > 0
          if (previousDateDataCount != 0) {
            // console.log("current date: " +  currentDate.format())
            count++
          } else {
            count = 0;
          }

          previousDate = currentDate;
          previousDateDataCount = currentDateDataCount;
        }

      });
      console.log('total:' + count);


      res.status(200).json({
        image: html,
        streak: count
      });

    } else {
      res.send(error)
    }
  })
});

module.exports = router;
