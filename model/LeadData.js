const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leadDataSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Schema.Types.Mixed, required: true },
    level: { type: String, required: true },
    duration: String,
    budget: String,
    link: String
}, { timestamps: true });

// Define a virtual property to represent the formatted timestamp
leadDataSchema.virtual('formattedCreatedAt').get(function() {
    const now = new Date();
    const createdAt = this.createdAt;

    const diffInMs = now - createdAt;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return 'Today';
    } else if (diffInDays === 1) {
        return '1d ago';
    } else {
        return `${diffInDays}d ago`;
    }
});

// Ensure virtual fields are included in JSON output
leadDataSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('LeadData', leadDataSchema);
