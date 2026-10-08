const express = require('express');
const cors = require('cors');

const app = express();
const port = Number(process.env.PORT) || 3000;

// Разрешаем запросы из любого источника.
app.use(cors());

app.get('/', (_request, response) => {
  response.type('text').send('Hello from Express server!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
