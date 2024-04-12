const express = require("express")
const router = express.Router()
const leadController = require("../controllers/leadController")



// POST /leads - Create a new lead
router.post('/', leadController.createLead);

// GET /leads - Get all leads
router.get('/', leadController.getAllLeads);

// DELETE /leads/:id - Delete a lead by ID
router.delete('/:id', leadController.deleteLeadById);
// router.delete("/:id", adminAuth, leadController.deleteLeadById);

// Route to fetch leads by tag
router.get('/tag', leadController.getLeadsByTag);

// Route to search leads by tag
router.get('/search', leadController.getSearchByTag);

// GET /leads/platform - Get leads by platform
router.get("/platform", leadController.getLeadsByPlatform);

// Define route for getting leads by platform and tag
// router.get("/platformtag", leadController.getLeadsByPlatformAndTag); // Get leads by platform and tag
router.get('/leads/search', leadController.getLeadsByPlatformAndTag);

module.exports = router;