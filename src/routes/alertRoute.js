import express from 'express';
const router = express.Router();

router.get('/alert', (req, res) => {
  res.send(`
    <html>
      <head><title>Alert</title></head>
      <body>
        <script>
          alert('This is an alert message!');
          window.location.href = '/'; // redirect to home after alert
        </script>
      </body>
    </html>
  `);
});

export default router;
