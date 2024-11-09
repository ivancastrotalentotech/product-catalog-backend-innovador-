const express = require('express');
const { exec } = require('child_process');
const app = express();

app.post('/webhook', (req, res) => {

  const serverTime = new Date().toLocaleString();
  console.log(`Webhook triggered at server time: ${serverTime}`);

  exec('/home/ubuntu/deploy.sh', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    //console.log(`Output: ${stdout}`);
    res.status(200).send('Deploy script executed');
  });
});

app.listen(3000, () => console.log('Webhook server running on port 3000'));