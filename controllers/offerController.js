const Offer = require('../models/Offer');
const { getTenderById } = require("../models/Tender");


exports.offerForm = (req, res) => {
    getTenderById(req.params.id, (err, results) => {
        if (err) {
            return res.status(404).send("Przetarg nie istnieje");
        }

        const now = new Date();
        const endDate = new Date(results.end_date);

        if (now > endDate) {
            return res.status(400).send("Termin składania ofert minął");
        }

        res.render("offers", { tender: results });
    })
}

exports.submitOffer = (req, res) => {
    getTenderById(req.params.id, (err, results) => {
        if (err) {
            return res.status(404).send("Przetarg nie istnieje");
        }

        const now = new Date();
        const endDate = new Date(results.end_date);

        if (now > endDate) {
            return res.status(400).send("Termin składania ofert minął");
        }

        const offerData = {
            tender_id: req.params.id,
            bidder_name: req.body.bidder_name,
            amount: req.body.amount
        };

        Offer.create(offerData, (err) => {
            if (err) {
                return res.status(500).send("Nie udało się złożyć oferty. Spróbuj ponownie później.");
            }

            res.redirect(`/tenders/${req.params.id}`);
        })
    })
}
