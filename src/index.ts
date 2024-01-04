import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
dotenv.config();

// middlewares
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(morgan('common'));

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/assets', express.static(path.join(__dirname, '/assets')));

const port = process.env.PORT || 3000;


app.listen(process.env.PORT, () => {
  console.log(`Server running ....`);
});
