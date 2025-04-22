const db = require('../config/db');

const Tender = {
    getAllTenders: function(callback) {
        db.query('SELECT * FROM tenders', (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getTenderById: function(id, callback) {
        db.query('SELECT * FROM tenders WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    createTender: function(tenderData, callback) {
        db.query('INSERT INTO tenders SET ?', tenderData, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    updateTender: function(id, tenderData, callback) {
        db.query('UPDATE tenders SET ? WHERE id = ?', [tenderData, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.affectedRows);
        });
    },

    deleteTender: function(id, callback) {
        db.query('DELETE FROM tenders WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.affectedRows);
        });
    }
}

module.exports = Tender;