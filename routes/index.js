const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tenderController');
const offerController = require("../controllers/offerController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/tenders", tenderController.listTenders);
router.get("/tenders/:id", tenderController.getTender);

router.get("/tenders/:id/offer", offerController.offerForm); // formularz
router.post("/tenders/:id/offer", offerController.submitOffer); // obsługa POST


module.exports = router;
