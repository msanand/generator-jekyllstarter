/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('jekyllstarter:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        someOption: true,
        blogTitle:'Hello Blog!',
        tagline:'This is a test blog',
        desc:'This is the description',
        blogUrl:'http://www.test.com',
        authorName:'Anand Mani Sankar',
        twitterHandle:'msanand',
        disqusId:'disqusid',
        addthisPubId:'addthispubid',
        gaTrackingId:'gatrackingid',
        gaSuperProxyUrl:'http://www.gasuperproxyurl.com',
        githubRepo:'http://github.com/msanand',
        feedbackUrl:'http://github.com/msanand/feedback/issues/new'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '404.html',
      'about.md',
      'archive.md',
      'atom.xml',
      'Gruntfile.js',
      'index.html',
      'LICENSE',
      'LICENSE.md',
      'tags.html',
      '_drafts/draft-post.md',
      '_includes/add_this.html',
      '_includes/comments.html',
      '_includes/follow_me.html',
      '_includes/ga_data_fetch.html',
      '_includes/google_analytics.html',
      '_includes/head.html',
      '_includes/sidebar.html',
      '_layouts/default.html',
      '_layouts/page.html',
      '_layouts/post.html',
      '_posts/2014-08-15-hello-jekyll-starter.md',
      'assets/css/all.min.css',
      'assets/css/custom.css',
      'assets/css/lanyon.css',
      'assets/css/poole.css',
      'assets/css/syntax.css',
      'assets/images/profile.png',
      'assets/images/profile_small.png',
      'assets/favicon.ico',
      'assets/apple-touch-icon-precomposed.png',
      'bower.json',
      'package.json',
      'README.md',
      '.editorconfig',
      '.jshintrc'
    ]);
  });
});
