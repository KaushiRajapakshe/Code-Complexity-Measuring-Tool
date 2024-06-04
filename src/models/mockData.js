const mongoose = require('mongoose');

const mockDataSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    Cs: { type: Number, required: true },
    Ctc: { type: Number, required: true },
    Cnc: { type: Number, required: true },
    Ci: { type: Number, required: true },
    TW: { type: Number, required: true },
    Cps: { type: Number, required: true },
    Cr: { type: Number, required: true },
    Cp: { type: Number, required: true }
});

const MockData = mongoose.model('MockData', mockDataSchema);

module.exports = MockData;
