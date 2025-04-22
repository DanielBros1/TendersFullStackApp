const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tenderController');


router.get("/", tenderController.home);
router.get("/tenders", tenderController.listTenders);
// router.get("/tenders{id}", tenderController.getTender);
// TODO: Add routes for creating, updating, and deleting tenders

module.exports = router;
