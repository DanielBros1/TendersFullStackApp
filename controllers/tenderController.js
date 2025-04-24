const Tender = require('../models/Tender');
const Offer = require("../models/Offer");


exports.listTenders = (req, res) => {
    Tender.getActiveTenders((err, results) => {
        if (err) {
            return res.status(500).json({error: "Wystąpił problem z pobraniem listy przetargów. Spróbuj ponownie później."});
        }
        res.render("tenders", {tenders: results});
    });
}

exports.getTenderRecord = (req, res) => {
    Tender.getTenderById(req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({error: "Nie udało się pobrać danych przetargu. Spróbuj ponownie później."});
        }
        if (!results) {
            return res.status(404).json({error: "Nie znaleziono przetargu o podanym identyfikatorze."});
        }

        res.render("tender_detail", {tender: results});
    });
}

exports.getEndedTenderRecord = (req, res) => {
    Tender.getTenderById(req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({error: "Nie udało się pobrać danych przetargu. Spróbuj ponownie później."});
        }
        if (!results) {
            return res.status(404).json({error: "Nie znaleziono przetargu o podanym identyfikatorze."});
        }

        Offer.getByTenderId(req.params.id, (err, offer) => {
            if (err) {
                return res.status(500).json({error: "Nie udało się pobrać ofert przetargu. Spróbuj ponownie później."});
            }

            const validOffers = offer.filter(offer => Number(offer.amount) <= Number(results.max_budget));
            validOffers.sort((a, b) => Number(a.amount) - Number(b.amount));
            const noValidOffers = validOffers.length === 0;

            res.render("ended_detail", {tender: results, validOffers: validOffers, noValidOffers: noValidOffers });
        })
    });
}

exports.listEndedTenders = (req, res) => {
    Tender.getEndedTenders((err, results) => {
        if (err) {
            return res.status(500).json({error: "Nie udało się pobrać zakończonych przetargów. Spróbuj ponownie później."});
        }
        res.render("ended", {tenders: results});
    });
}

exports.tenderForm = (req, res) => {
    res.render("add_tender");
}

exports.submitTender = (req, res) => {
    const tenderData = {
        title: req.body.title,
        description: req.body.description,
        institution: req.body.institution,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        max_budget: req.body.max_budget
    };

    if (!tenderData.title || !tenderData.description || !tenderData.institution || !tenderData.start_date || !tenderData.end_date || tenderData.max_budget <= 0) {
        return res.status(400).json({error: "Wszystkie pola są wymagane."});
    }

    Tender.createTender(tenderData, (err, results) => {
        if (err) {
            return res.status(500).json({error: "Nie udało się dodać przetargu. Spróbuj ponownie później."});
        }
        res.redirect("/tenders");
    });
}

