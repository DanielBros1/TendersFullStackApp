const Tender = require('../models/Tender');
const db = require('../config/db');

// Get all tenders
exports.home = (req, res) => {
    res.render('home', { title: 'Tender Management System' });
};

exports.listTenders = (req, res) => {
    db.query(Tender.getAllTenders, (err, results) => {
        res.render("tenders/list", { tenders: results });
    });


};