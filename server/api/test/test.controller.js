'use strict';

var _ = require('lodash');
var Test = require('./test.model');

// Get list of tests
exports.index = function(req, res) {
  var response = res;
  // Test.find(function (err, tests) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, tests);
  // });
  // return res.send('test!');
  // var webdriverio = require('webdriverio');
  // var options = {
  //     desiredCapabilities: {
  //         browserName: 'firefox'
  //     }
  // };
  // var client = webdriverio.remote(options).init();
  // webdriverio
  //     .remote(options)
  //     .init()
  //     .url('http://progress.devshopgo.me')
  //     // .title(function(err, res) {
  //     //     console.log('Title was: ' + res.value);
  //     //     response.send('Title was: ' + res.value);
  //     // })
  //     .getTitle(function(err, text) {
  //       console.log(text); // outputs: "WebdriverIO"
  //     })
  //     // .getText('*=Log In', function(err, text) {
  //     //   console.log(text); // outputs: "WebdriverIO"
  //     // })
  //     .end();

  // client
  //   .url('http://google.com/ncr')
  //   .getText('Gmail', function(err, text) {
  //     console.log(text); // outputs: "WebdriverIO"
  //   })
  //   .end();
  // var casper = require('casperjs').create();

  // casper.start('http://casperjs.org/', function() {
  //     this.echo(this.getTitle());
  // });

  // casper.thenOpen('http://phantomjs.org', function() {
  //     this.echo(this.getTitle());
  // });

  // casper.run();

  // module.exports = {
  //   "Demo test Google" : function (client) {
  //     client
  //       .url("http://www.google.com")
  //       .waitForElementVisible("body", 1000)
  //       .assert.title("Google")
  //       .assert.visible("input[type=text]")
  //       .setValue("input[type=text]", "nightwatch")
  //       .waitForElementVisible("button[name=btnG]", 1000)
  //       .click("button[name=btnG]")
  //       .pause(1000)
  //       .assert.containsText("#main", "The Night Watch")
  //       .end();
  //   }
  // };

  // var webdriver = require('selenium-webdriver');

  // var driver = new webdriver.Builder().
  //    withCapabilities(webdriver.Capabilities.firefox()).
  //    build();

  // driver.get('http://www.google.com');
  // driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
  // driver.findElement(webdriver.By.name('btnG')).click();
  // driver.wait(function() {
  //  return driver.getTitle().then(function(title) {
  //    // return title === 'webdriver - Google Search';
  //    console.log(title);
  //  });
  // }, 1000);

  // driver.quit();

};

// Get a single test
exports.show = function(req, res) {
  Test.findById(req.params.id, function (err, test) {
    if(err) { return handleError(res, err); }
    if(!test) { return res.send(404); }
    return res.json(test);
  });
};

// Creates a new test in the DB.
exports.create = function(req, res) {
  Test.create(req.body, function(err, test) {
    if(err) { return handleError(res, err); }
    return res.json(201, test);
  });
};

// Updates an existing test in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Test.findById(req.params.id, function (err, test) {
    if (err) { return handleError(res, err); }
    if(!test) { return res.send(404); }
    var updated = _.merge(test, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, test);
    });
  });
};

// Deletes a test from the DB.
exports.destroy = function(req, res) {
  Test.findById(req.params.id, function (err, test) {
    if(err) { return handleError(res, err); }
    if(!test) { return res.send(404); }
    test.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}