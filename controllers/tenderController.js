const Tender = require('../models/Tender');



exports.listTenders = (req, res) => {
    Tender.getActiveTenders((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log(results);
        res.render("tenders", { tenders: results });
    });
}

//    getTenderById: function(id, callback) {
//         db.query('SELECT * FROM tenders WHERE id = ?', [id], (err, results) => {
//             if (err) {
//                 return callback(err);
//             }
//             callback(null, results[0]);
//         });
//     },

exports.getTender = (req, res) => {
    Tender.getTenderById(req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log(results);
        res.render("tender_detail", { tender: results });
    })
}