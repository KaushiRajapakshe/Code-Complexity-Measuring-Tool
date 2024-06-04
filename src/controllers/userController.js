const Rule = require('../models/rule');
const MockData = require('../models/mockData'); // Import the MockData model

const getUserResult = async (req, res) => {
    try {
        const id = req.query.id || 1; // Replace with actual user ID logic
        const userResult = await MockData.findOne({ id });

        if (!userResult) {
            return res.status(404).send('User result not found');
        }

        const grade = calculateGrade(userResult);
        const suggestedRules = await getSuggestedRules(userResult);

        res.render('userResults', {
            userResult,
            grade,
            suggestedRules
        });
    } catch (err) {
        console.error('Error getting user result:', err);
        res.status(500).send('Internal Server Error');
    }
};

const calculateGrade = (userResult) => {
    const factors = ['Cs', 'Ctc', 'Cnc', 'Ci', 'TW', 'Cps', 'Cr', 'Cp'];
    const scores = factors.map(factor => userResult[factor]);
    const countAboveThreshold = scores.filter(score => score >= 5).length;

    switch (countAboveThreshold) {
        case 1:
            return 'A';
        case 3:
            return 'B';
        case 5:
            return 'C';
        case 6:
            return 'D';
        default:
            return 'F';
    }
};

const getSuggestedRules = async (userResult) => {
    const factors = ['Cs', 'Ctc', 'Cnc', 'Ci', 'TW', 'Cps', 'Cr', 'Cp'];
    const rules = await Rule.find({});
    const suggestions = [];

    factors.forEach(factor => {
        const score = userResult[factor];
        let severity = '';

        if (score < 2) {
            severity = 'Good';
        } else if (score >= 2 && score <= 5) {
            severity = 'Medium';
        } else {
            severity = 'Bad';
        }

        const factorRules = rules.filter(rule => rule.factor === factor && rule.severity === severity);
        suggestions.push(...factorRules.map(rule => rule.description));
    });

    return suggestions;
};

module.exports = {
    getUserResult
};
