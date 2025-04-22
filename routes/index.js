const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tenderController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/tenders", tenderController.listTenders);
// router.get("/tenders/:id", tenderController.getTender);


module.exports = router;
