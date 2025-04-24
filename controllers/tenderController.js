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

        console.log("Jesteśmy w rekordzie " + results.title);

        Offer.getByTenderId(req.params.id, (err, offer) => {
            if (err) {
                return res.status(500).json({error: "Nie udało się pobrać ofert przetargu. Spróbuj ponownie później."});
            }
            // sprawdz typ offer.amount
            console.log("Typ oferty: " + typeof offer.amount);
            console.log("typ max_budget: " + typeof results.max_budget);

            const validOffers = offer.filter(offer => Number(offer.amount) <= Number(results.max_budget));
            validOffers.sort((a, b) => Number(a.amount) - Number(b.amount));
            console.log(validOffers);

            const noValidOffers = validOffers.length === 0;
            console.log("Przekazane elementy do widoku:\n Result: " + JSON.stringify(results) + "\n Offer: " + offer.length + "\n Valid: " + validOffers.length + "\n NoValid: " + noValidOffers);

            // Wypisz oferty:
            console.log("Oferty przetargu:");
            validOffers.forEach(offer => {
                console.log(`Nazwa oferenta: ${offer.bidder_name}, Kwota: ${offer.amount}`);
                // print type of offer
                console.log(`Typ oferty: ${typeof offer}`);
                console.log(`Offer: ` + offer);
            })
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

// exports.createTender = (req, res) => {
//     Tender.createTender(req.body, (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Nie udało się utworzyć przetargu. Upewnij się, że wszystkie dane są poprawne i spróbuj ponownie." });
//         }
//         res.status(201).json({ message: "Przetarg został utworzony pomyślnie.", id: results });
//     });
// }

