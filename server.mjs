import { connect } from 'mongoose';
import app from './src/app.mjs';
import config from './config.mjs';

const port = config.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});

connect(config.DATABASE_URI, { dbName: config.DATABASE_NAME }).then(() => {
  console.log('Successfully connected to database...');
});
