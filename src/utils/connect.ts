import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';
import _default from '../../config/default';

async function connect() {
  const dbUri = _default.dbUri as string;

  try {
    await mongoose.connect(dbUri);
    logger.info('DB connected');
  } catch (error) {
    logger.error('Could not connect to db');
    process.exit(1);
  }
}

export default connect;
