const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to receive email body
app.post('/api/emailbody', (req, res) => {
  const { body } = req;

  console.log('Received email body:', body);

  // You can add logic here to process or store the email body as needed

  res.status(200).json({ message: 'Email body received successfully' });
});

// Health check endpoint (optional)
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
