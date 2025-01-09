const express = require('express');
const cors = require('cors');
const { serverError, notFound } = require('./middlewares/errorHandling');
const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());

const morgan = require('morgan');
app.use(morgan('dev'));

app.use('/api', require('./routes/indexRoute'));

// error handling
app.use(notFound);
app.use(serverError);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
