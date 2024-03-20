const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleFindAllUrls(req, res) {
  try {
    // Retrieve all URLs in descending order based on creation time
    const allUrls = await URL.find({}, null, { sort: { createdAt: -1 } });
    
    // Handle potential errors during retrieval
    if (!allUrls) {
      return res.status(500).json({ error: "Failed to retrieve URLs" });
    }

    // Respond with retrieved URLs, excluding sensitive fields if necessary
    // const sanitizedUrls = allUrls.map((url) => ({
    //   shortId: url.shortId,
    //   // Consider removing sensitive fields like redirectURL depending on your requirements
    //   // redirectURL: url.redirectURL,
    //   // createdAt: url.createdAt,
    //   // updatedAt: url.updatedAt,
    // }));

    // return res.json(sanitizedUrls);
    return res.json(allUrls)
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleFindAllUrls,
};
