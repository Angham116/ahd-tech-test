const { signup, login } = require('../controllers/user');

const router = require('express').Router();


router.post('/signup', signup);
router.post('/login', login);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  res.status(404).send({ code: 401, msg: 'not found' });
});

// router.use(Routes.errors);

module.exports = router;

