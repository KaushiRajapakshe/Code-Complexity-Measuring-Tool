const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    factor: { type: String, required: true },
    severity: { type: String, required: true },
    description: { type: String, required: true }
});

const Rule = mongoose.model('Rule', ruleSchema);

module.exports = Rule;
