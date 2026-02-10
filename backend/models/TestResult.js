const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    scores: {
        social: { type: Number, required: true },
        emotional: { type: Number, required: true },
        planning: { type: Number, required: true },
        confidence: { type: Number, required: true },
        focus: { type: Number, required: true }
    },
    personality: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TestResult', testResultSchema);
