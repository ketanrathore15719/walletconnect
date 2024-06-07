const express = require('express');
const path = require('path');
const app = express();

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// Serve the static files from the React app in the /wallet subdirectory
app.use('/wallet', express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React app
app.get('/wallet/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


