var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  ObjectID = require('mongodb').ObjectID,
  Question = mongoose.model('Question'),
  Answer = mongoose.model('Answer'),
  User = mongoose.model('User'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Question.findOne({}, function(err, q) {
    if (err) res.render('index');
    Answer.find({ _id: { $in: q.answer_ids } }, function(err, answers) {
      res.render('index', {
        question: q,
        answers: answers
      });
    });
  });
});

router.get('/questions', function (req, res, next) {
  Question.find(function (err, questions) {
    if (err) return next(err);
    res.render('questions', {
      title: 'Generator-Express MVC',
      questions: questions
    });
  });
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/questions',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.post('/signup', function (req, res, next) {
  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    year: req.body.year,
    major: req.body.major
  });

  newUser.save();

  res.render('login');
});

router.get('/questions/show/:id', function(req, res) {
  Question.findOne({_id: new ObjectID(req.params.id)}, function(err, q) {
    if (err) return;
    Answer.find({ _id: { $in: q.answer_ids } }, function(err, answers) {
      res.render('question', {
        question: q,
        answers: answers
      });
    });
  });
});

router.get('/questions/results/:id', function(req, res) {
  Question.findOne({_id: new ObjectID(req.params.id)}, function(err, q) {
    if (err) return;
    Answer.find({ _id: { $in: q.answer_ids } }, function(err, answers) {
      res.render('results', {
        question: q,
        answers: answers
      });
    });
  });
});

router.get('/questions/new', function (req, res, next) {
  res.render('new_question');
});

router.post('/questions/new', function (req, res, next) {
  var answerCount = Object.keys(req.body).length - 1;
  var answers = [];

  for (var i = 1; i <= answerCount; ++i) {
    var newAnswer = new Answer({
      answer: req.body["answer" + i],
      votes: 0
    });

    answers.push(newAnswer._id);

    newAnswer.save(function(err, a) {
      if (err) console.log(err);
    });
  }

  var newQuestion = new Question({
    question: req.body.question,
    answer_ids: answers,
    author_id: "Greg",
    votes: 0
  });

  newQuestion.save(function(err, a) {
    if (err) console.log(err);

    Question.find(function (err, questions) {
      if (err) return next(err);
      res.render('questions', {
        questions: questions
      });
    });
  });
});

router.post('/questions/:id', function (req, res, next) {
  Question.update({ _id: new ObjectID(req.params.id) }, { $inc: { votes: 1 } }, function(err) {
    if (err) console.error(err);
  });

  Answer.update({ _id: new ObjectID(req.body.answer) }, { $inc: { votes: 1 } }, function(err) {
    if (err) console.error(err);
  });

  res.redirect('/questions/results/' + req.params.id)
});