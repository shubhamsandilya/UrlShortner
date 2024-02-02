const shortid=require('shortid');
const URL = require("../models/url");
async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid(8);
  await URL.create({
    shortId: shortID,
    redirectedURL: body.url,
    visitHistory: [],
  });
  return res.json({ Id: shortID });
}

module.exports = {
  handleGenerateShortUrl,
};
