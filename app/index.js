'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var JekyllStarterGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome Jekyll Starter project generator!'
    ));

    var prompts = [
    {
      type    : 'input',
      name    : 'blogTitle',
      message : 'Your blog title',
      default : 'Jekyll Starter'
    },{
      type    : 'input',
      name    : 'tagline',
      message : 'Your blog tag line',
      default : 'A starter project for Jekyll'
    },{
      type    : 'input',
      name    : 'desc',
      message : 'Describe yourself in a line',
      default : ''
    },{
      type    : 'input',
      name    : 'blogUrl',
      message : 'Your blog URL',
      default : ''
    },
    {
      type    : 'input',
      name    : 'authorName',
      message : 'Your name',
      default : 'Me'
    },{
      type    : 'input',
      name    : 'twitterHandle',
      message : 'Your twitter handle',
      default : ''
    },{
      type    : 'input',
      name    : 'disqusId',
      message : 'Your disqus ID',
      default : ''
    },{
      type    : 'input',
      name    : 'addthisPubId',
      message : 'Your AddThis pub ID',
      default : ''
    },{
      type    : 'input',
      name    : 'gaTrackingId',
      message : 'Your Google Analytics Tracking ID',
      default : ''
    },{
      type    : 'input',
      name    : 'gaSuperProxyUrl',
      message : 'Your Google Analytics Super Proxy URL',
      default : ''
    },{
      type    : 'input',
      name    : 'githubRepo',
      message : 'Your GitHub Repo',
      default : ''
    },{
      type    : 'input',
      name    : 'feedbackUrl',
      message : 'Your Feedback URL'
    }];

    this.prompt(prompts, function (props) {
      //this.someOption = props.someOption;
      this.blogTitle = props.blogTitle;
      this.tagline = props.tagline;
      this.desc = props.desc;
      this.blogUrl = props.blogUrl;

      this.authorName = props.authorName;
      this.twitterHandle = props.twitterHandle;
      this.disqusId = props.disqusId;
      this.addthisPubId = props.addthisPubId;
      this.gaTrackingId = props.gaTrackingId;
      this.gaSuperProxyUrl = props.gaSuperProxyUrl;
      this.githubRepo = props.githubRepo;
      this.feedbackUrl = props.feedbackUrl;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('_drafts');
      this.dest.mkdir('_includes');
      this.dest.mkdir('_layouts');
      this.dest.mkdir('_posts');
      this.dest.mkdir('assets');
      this.dest.mkdir('assets/css');
      this.dest.mkdir('assets/images');

      this.src.copy('_404.html', '404.html');
      this.src.copy('_about.md', 'about.md');
      this.src.copy('_archive.md', 'archive.md');
      this.src.copy('_atom.xml', 'atom.xml');
      this.src.copy('_Gruntfile.js', 'Gruntfile.js');
      this.src.copy('_index.html', 'index.html');
      this.src.copy('_LICENSE', 'LICENSE');
      this.src.copy('_LICENSE.md', 'LICENSE.md');
      this.src.copy('_tags.html', 'tags.html');

      this.src.copy('_drafts/draft-post.md', '_drafts/draft-post.md');
      this.src.copy('_includes/add_this.html', '_includes/add_this.html');
      this.src.copy('_includes/comments.html', '_includes/comments.html');
      this.src.copy('_includes/follow_me.html', '_includes/follow_me.html');
      this.src.copy('_includes/ga_data_fetch.html', '_includes/ga_data_fetch.html');
      this.src.copy('_includes/google_analytics.html', '_includes/google_analytics.html');
      this.src.copy('_includes/head.html', '_includes/head.html');
      this.src.copy('_includes/sidebar.html', '_includes/sidebar.html');

      this.src.copy('_layouts/default.html', '_layouts/default.html');
      this.src.copy('_layouts/page.html', '_layouts/page.html');
      this.src.copy('_layouts/post.html', '_layouts/post.html');

      this.src.copy('_posts/2014-08-15-hello-jekyll-starter.md', '_posts/2014-08-15-hello-jekyll-starter.md');

      this.src.copy('assets/css/all.min.css', 'assets/css/all.min.css');
      this.src.copy('assets/css/custom.css', 'assets/css/custom.css');
      this.src.copy('assets/css/lanyon.css', 'assets/css/lanyon.css');
      this.src.copy('assets/css/poole.css', 'assets/css/poole.css');
      this.src.copy('assets/css/syntax.css', 'assets/css/syntax.css');

      this.src.copy('assets/images/profile.png', 'assets/images/profile.png');
      this.src.copy('assets/images/profile_small.png', 'assets/images/profile_small.png');

      this.src.copy('assets/favicon.ico','assets/favicon.ico');
      this.src.copy('assets/apple-touch-icon-precomposed.png','assets/apple-touch-icon-precomposed.png');

      var packageJsonContext = {
        blog_tagline: this.tagline,
        github_repo: this.githubRepo
      };
      this.template('_package.json', 'package.json', packageJsonContext);

      var bowerJsonContext = {
        author_name: this.authorName,
        blog_tagline: this.tagline
      };
      this.template('_bower.json', 'bower.json', bowerJsonContext);

      var readmeContext = {
        blog_title: this.blogTitle,
        blog_tagline: this.tagline
      };
      this.template('_README.md', 'README.md', readmeContext);

      var configYmlContext = {
        blog_title: this.blogTitle,
        blog_tagline: this.tagline,
        blog_url: this.blogUrl,
        author_name: this.authorName,
        author_desc: this.desc,
        twitter_handle: this.twitterHandle,
        disqus_id: this.disqusId,
        addthis_pubid: this.addthisPubId,
        ga_tracking_id: this.gaTrackingId,
        ga_superproxy_url: this.gaSuperProxyUrl,
        github_repo: this.githubRepo,
        feedback_url: this.feedbackUrl
      };

    this.template("__config.yml", "_config.yml", configYmlContext);

      //this.src.copy('__config.yml', '_config.yml');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('gitignore', '.gitignore');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = JekyllStarterGenerator;
