var keys = {
    "stamp": "Letters (Stamped)",
    "meter": "Letters (Metered)",
    "flat": "Large Envelopes (Flats)",
    "premium": "First-Class Package Service—Retail"
};

function calculateTotal(weight, type) {
    switch (type) {
        case "stamp":
            return 0.55 + ((weight - 1) * 0.15);
        case "meter":
            return 0.5 + ((weight - 1) * 0.15);
        case "flat":
            return 1 + ((weight - 1) * 0.15);
        case "premium":
            if (weight < 5) {
                return 3.66;
            }
            else if (weight < 9) {
                return 4.39;
            }
            else if (weight < 13) {
                return 5.19;
            }
            else {
                return 5.71;
            }
        default:
            return 0;
    }
}

function calculateRate(req, res) {
    let weight = parseInt(req.query.weight);
    let type = req.query.type;
    let quantity = parseInt(req.query.quantity);
    let total = (calculateTotal(weight, type) * quantity).toFixed(2);
    let stuff = {weight: weight, type: keys[type], quantity: quantity, total: total};
    res.render("results", stuff);
}

module.exports = {calculateRate: calculateRate};