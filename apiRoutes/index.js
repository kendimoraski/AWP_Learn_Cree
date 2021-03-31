const router = require('express').Router();

router.use('/asari', require('./asari'));
router.use('/salarians', require('./salarians'));
router.use('/turians', require('./turians'));

router.use((req, res, next) => {
  const err = new Error('API Route not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
