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

// formularz dodawania przetargu
router.get("/tenders/add", tenderController.tenderForm); // formularz
router.post("/tenders/add", tenderController.submitTender); // obsługa POST

router.get("/tenders/:id", tenderController.getTenderRecord);
router.get("/tenders/ended/:id", tenderController.getEndedTenderRecord);

// formularz składania oferty
router.get("/tenders/:id/offer", offerController.offerForm); // formularz
router.post("/tenders/:id/offer", offerController.submitOffer); // obsługa POST



module.exports = router;
