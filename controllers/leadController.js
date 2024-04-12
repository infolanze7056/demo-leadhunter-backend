const LeadData = require("../model/LeadData")


// Create a new lead
exports.createLead = async (req, res) => {
    try {
        const leadData = new LeadData(req.body);
        const savedData = await leadData.save();
        res.status(201).json(savedData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Get all leads
exports.getAllLeads = async (req, res) => {
    try {
        // const leads = await LeadData.find();
        const leads = await LeadData.find().sort({ createdAt: -1});
        res.status(200).json(leads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Delete a lead by ID
exports.deleteLeadById = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedLead = await LeadData.findByIdAndDelete(id);
        if (!deletedLead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json({ message: 'Lead deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Fetch leads by tag
exports.getLeadsByTag = async (req, res) => {
    let selectedtags;
    // Check if tags are provided in the request body
    if (req.query.tags && typeof req.query.tags === 'string') {
        // Split the string by comma and trim extra whitespace
        selectedtags = req.query.tags.split(',').map(tag => tag.trim());
    } else if (Array.isArray(req.query.tags)) {
        selectedtags = req.query.tags;
    } else {
        return res.status(400).json({ message: "Tags parameter is required as a non-empty array or comma-separated string" });
    }

    try {
        if (selectedtags.length === 0) {
            return res.status(400).json({ message: "Tags parameter is required as a non-empty array" });
        }

        // Construct a regex pattern to match any of the selected tags
        const regexPattern = selectedtags.map(tag => `\\b${tag}\\b`).join('|');
        const regex = new RegExp(regexPattern, 'i');

        // Find leads that contain any of the selected tags
        const leads = await LeadData.find({ tags: { $regex: new RegExp(selectedtags.join('|'), 'i') } });

        if (leads.length === 0) {
            return res.status(404).json({ message: `No leads found for the tag(s) "${selectedtags.join(', ')}"` });
        }

        res.status(200).json(leads);
    } catch (err) {
        console.error("Error fetching leads by tag:", err);
        res.status(500).json({ message: "An error occurred while fetching leads" });
    }
};