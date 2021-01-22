const express = require('express');
const cors = require('cors');

const Routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routes);

app.listen(3333, () => console.log('Server in port 3333'));
