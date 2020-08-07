import cors from 'cors';
import express from 'express';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port 3333.');
});