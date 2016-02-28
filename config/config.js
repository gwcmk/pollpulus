var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'final'
    },
    port: 3000,
    db: 'mongodb://localhost/final-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'final'
    },
    port: 3000,
    db: 'mongodb://localhost/final-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'final'
    },
    port: 3000,
    db: 'mongodb://localhost/final-production'
  }
};

module.exports = config[env];
