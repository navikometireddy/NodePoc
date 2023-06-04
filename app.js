const { google } = require('googleapis');
const express = require('express');
const app = express();
const port = 3000; // Choose a port number
// Service Account Key File
const keyFile = './creds.json';

// Google Analytics View ID
const viewId = '291503426';

// Create a new JWT client using the service account key file
const auth = new google.auth.GoogleAuth({
  keyFile,
  scopes: ['https://www.googleapis.com/auth/analytics.readonly']  
});

// Endpoint to retrieve most popular pages
app.get('/top-page-views', async (req, res) => {
  try {
    // Create a Google Analytics Reporting API client
    const analyticsreporting = google.analyticsreporting({
      version: 'v4',
      auth
    });

    // Calculate the start and end dates for the last 30 days
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30).toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    // Build the request object
    const request = {
      requestBody: {
        reportRequests: [
          {
            viewId,
            dateRanges: [
              {
                startDate,
                endDate,
              },
            ],
            dimensions: [
              {
                name: 'ga:pagePath',
              },
            ],
            metrics: [
              {
                expression: 'ga:pageviews',
              },
            ],
            orderBys: [
              {
                fieldName: 'ga:pageviews',
                sortOrder: 'DESCENDING',
              },
            ],
            pageSize: 10, // Adjust this value to retrieve more or fewer pages
          },
        ],
      },
    };

    // Make the request to the Google Analytics Reporting API
    const response = await analyticsreporting.reports.batchGet(request);
    var count = response.data.reports[0].data.totals[0].values[0]; 
    const data = response.data.reports[0].data.rows;

    // Extract the page views data
    if (!response.data || !response.data.reports || !response.data.reports[0].data) {
      const popularPages = data?.map((row) => {
        const pagePath = row.dimensions[0];
        const views = row.metrics[0].values[0];
        const pagePathIndex = dimensionHeaders.indexOf('ga:pagePath');
       const pageViewsIndex = metricHeaders[0].name === 'ga:pageviews' ? 0 : -1;
       const pageViews = pageViewsIndex !== -1 ? metrics[pageViewsIndex] : 0;
        return { pagePath, views,pageViewsIndex,count };
      });
      res.status(200).json(popularPages);
    }else{
      res.status(200).json({"count" : count});
    }
     
  } catch (error) {
    console.error('Error retrieving popular pages:', error);
    res.status(500).json({ error: 'Failed to retrieve popular pages' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
