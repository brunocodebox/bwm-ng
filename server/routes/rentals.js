const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");

// Look for all documents in the database
router.get("", function(req, res) {
  Rental.find({}, function(err, foundRentals) {
    res.json(foundRentals);
  });
});

// Look for one document in the database. The id in /:id is in req.params.id and must be spelled the same
router.get("/:id", function(req, res) {
  const rentalId = req.params.id;

  Rental.findById(rentalId, function(err, foundRental) {
    if (err) {
      res.status(422).send({
        errors: [
          {
            status: 422,
            title: "Rental Error!",
            detail: "Could not find Rental!"
          }
        ]
      });
    }
    res.json(foundRental);
  });
});

module.exports = router;
