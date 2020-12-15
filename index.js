require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const router = require('./src/routes');

app.use(express.json());

app.use(cors());

app.use('/api/v1/', router);

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
