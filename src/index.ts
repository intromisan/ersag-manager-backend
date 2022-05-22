import express, { Response, Request } from 'express';
import config from 'config';
import logger from './utils/logger';
import connect from './utils/connect';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';

const port = config.get<number>('port');
const host = config.get<string>('host');

const app = express();

// Parse the body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(deserializeUser);

// API Access Policy
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.listen(port, host, async () => {
  logger.info(`Server listening at http://${host}:${port}`);

  await connect();

  routes(app);
});
