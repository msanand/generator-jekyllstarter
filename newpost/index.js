'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var JekyllStarterPostGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Jekyll Starter Blog Post generator!'
    ));

    var prompts = [
    {
      type    : 'input',
      name    : 'postTitle',
      message : 'Your post title',
      default : 'Jekyll Starter'
    },{
      type    : 'input',
      name    : 'categories',
      message : 'Categories'
    },{
      type    : 'input',
      name    : 'tags',
      message : 'Tags (separated by space)'
    },{
      type    : 'confirm',
      name    : 'comments',
      message : 'Do you want to include comments?',
      default : true
    },
    {
      type    : 'confirm',
      name    : 'googleAnalytics',
      message : 'Do you want to track views for this post?',
      default : true
    }];

    this.prompt(prompts, function (props) {
      this.postTitle = props.postTitle;
      this.categories = props.categories;
      this.tags = props.tags;
      this.comments = props.comments ? "true" : "false";
      this.analytics = props.analytics ? "true" : "false";

      var today = new Date();
      var zeroBasedMonth = today.getMonth();
      var month = zeroBasedMonth < 9 ? "0" + (zeroBasedMonth + 1) : (zeroBasedMonth + 1);
      this.date = today.getFullYear() + "-" + month + "-" + today.getDate();
      this.time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      this.tidyPostTitle = this.postTitle.replace(/\s+/g, '-').toLowerCase();

      this.fileName = this.date + "-" + this.tidyPostTitle + ".md";

      done();
    }.bind(this));
  },

  writing: {
    newpost: function () {
      var newPostContext = {
        postTitle : this.postTitle,
        categories : this.categories,
        tags : this.tags,
        comments : this.comments,
        analytics : this.analytics,
        date : this.date + " " +  this.time
      };

      //TODO: Check if _posts folder exists. If not, ask user to generate jekyll blog first, before generating post.

      this.template('new-post.md', '_posts/' + this.fileName, newPostContext);

    }
  }
});

module.exports = JekyllStarterPostGenerator;
