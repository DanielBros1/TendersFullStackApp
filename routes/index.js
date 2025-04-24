const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tenderController');
const offerController = require("../controllers/offerController");
const {route} = require("express/lib/application");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/tenders", tenderController.listTenders);
router.get("/tenders/ended", tenderController.listEndedTenders);
router.get("/tenders/:id", tenderController.getTenderRecord);
router.get("/tenders/ended/:id", tenderController.getEndedTenderRecord);

router.get("/tenders/:id/offer", offerController.offerForm); // formularz
router.post("/tenders/:id/offer", offerController.submitOffer); // obsługa POST


module.exports = router;
