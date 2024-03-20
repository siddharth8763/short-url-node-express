const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleFindAllUrls,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/", handleFindAllUrls);

module.exports = router;
