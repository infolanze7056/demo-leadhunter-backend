const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leadDataSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Schema.Types.Mixed, required: true },
    level: { type: String, required: true },
    duration: String,
    budget: String,
    link: String,
    platforms: { type: Schema.Types.Mixed, required:true } 
}, { timestamps: true });

// Middleware to adjust createdAt and updatedAt times by adding 5 hours and 30 minutes
leadDataSchema.pre('save', function(next) {
    const currentTime = new Date();
    this.createdAt = new Date(currentTime.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));
    this.updatedAt = new Date(currentTime.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));
    next();
});

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
    } else if (diffInDays <= 1 && now.getDate() === createdAt.getDate()) { // Check if the difference is less than or equal to 1 and it's the same day
        return 'Today';
    } else {
        return `${diffInDays}d ago`;
    }
});
// Ensure virtual fields are included in JSON output
leadDataSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('LeadData', leadDataSchema);
