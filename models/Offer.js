const db = require('../config/db');

const Offer = {
    create: function (offerData, callback) {
        db.query(
            'INSERT INTO offers (tender_id, bidder_name, amount) VALUES (?, ?, ?)',
            [offerData.tender_id, offerData.bidder_name, offerData.amount],
            (err, results) => {
                if (err) return callback(err);
                callback(null, results.insertId);
            }
        );
    },

    getByTenderId: function (tenderId, callback) {
        db.query(
            'SELECT * FROM offers WHERE tender_id = ?',
            [tenderId],
            (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            }
        );
    },
};

module.exports = Offer;
