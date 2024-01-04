const express = require('express');
const app = express();
const dotenv = require('dotenv');

// Load environment variables from config.env
dotenv.config({ path: './config.env' });

// Read environment variables
const port = process.env.PORT || 3000;
const sourceDomain = process.env.SOURCEDOMAIN || 'accelerate.theodi.org';
const targetDomain = process.env.TARGETDOMAIN || 'open-data-essentials.learndata.info';

// Redirect all requests from source to target domain
app.get('*', (req, res) => {
  // Build the new URL by replacing the source domain with the target domain
  const newUrl = targetDomain + req.originalUrl.replace(sourceDomain, targetDomain);

  // Redirect to the new URL while preserving query parameters
  res.redirect(301, `https://${newUrl}`);
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port} and redirecting requests from ${sourceDomain} to ${targetDomain}`);
});