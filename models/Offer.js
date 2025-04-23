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
    }
};

module.exports = Offer;
