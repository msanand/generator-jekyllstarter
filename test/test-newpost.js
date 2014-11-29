/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('jekyllstarter:newpost', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../newpost'))
      //.inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        postTitle:'Test Post',
        categories: 'category',
        tags : 'tag1 tag2 tag3',
        comments : true,
        analytics : false
      })
      .on('end', done);
  });

  it('creates new post', function () {

    var today = new Date();
    this.date = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
    this.fileName = "_posts/" + this.date + "-" + "test-post.md";

    assert.file([
      this.fileName
    ]);
  });
});
