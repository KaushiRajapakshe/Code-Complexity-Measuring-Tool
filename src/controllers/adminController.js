const Rule = require('../models/rule');
const io = require('../app').io;

const getRules = async (req, res) => {
    try {
        const rules = await Rule.find({});
        res.json(rules);
    } catch (err) {
        console.error('Error fetching rules:', err);
        res.status(500).send('Internal Server Error');
    }
};

const addRule = async (req, res) => {
    try {
        const { factor, severity, description } = req.body;
        const newRule = new Rule({ factor, severity, description });
        await newRule.save();

        req.io.emit('ruleAdded', newRule);
        res.status(201).json(newRule);
    } catch (err) {
        console.error('Error adding rule:', err);
        res.status(500).send('Internal Server Error');
    }
};

const updateRule = async (req, res) => {
    try {
        const { id } = req.params; 
        const { description, severity } = req.body;
        const updatedRule = await Rule.findByIdAndUpdate(id, { description, severity }, { new: true });

        req.io.emit('ruleUpdated', updatedRule);
        res.json(updatedRule);
    } catch (err) {
        console.error('Error updating rule:', err);
        res.status(500).send('Internal Server Error');
    }
};

const deleteRule = async (req, res) => {
    try {
        const { id } = req.params;
        await Rule.findByIdAndDelete(id);

        req.io.emit('ruleDeleted', id);
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting rule:', err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getRules,
    addRule,
    updateRule,
    deleteRule
};
