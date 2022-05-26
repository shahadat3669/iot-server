require('dotenv').config();
const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
const PORT = process.env.port || 8000;
const app = require('./src/app');


mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT,  () => {
      // eslint-disable-next-line no-console
      console.log(`Server is listening in port ${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log('database connection failed. Server not started');
    console.log(err);
  });
