const Tender = require('../models/Tender');


exports.listTenders = (req, res) => {
    Tender.getActiveTenders((err, results) => {
        if (err) {
            return res.status(500).json({ error: "Wystąpił problem z pobraniem listy przetargów. Spróbuj ponownie później." });
        }
        res.render("tenders", { tenders: results });
    });
}

exports.getTender = (req, res) => {
    Tender.getTenderById(req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Nie udało się pobrać danych przetargu. Spróbuj ponownie później." });
        }
        if (!results) {
            return res.status(404).json({ error: "Nie znaleziono przetargu o podanym identyfikatorze." });
        }
        res.render("tender_detail", { tender: results });
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

