/*
Compile the entire src directory and output it to the lib directory by using either --out-dir or -d. This doesn't overwrite any other files or directories in lib.

"build": "babel server -d dist",
*/

import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import helmet from 'koa-helmet';
import cors from 'koa2-cors';
import routing from './routes/';
import { port, connexionString } from './config';

mongoose.connect(connexionString);
mongoose.connection.on('open', ()=>{
// console.log('wds');
});
mongoose.connection.on('error', console.error);

// Create Koa Application
const app = new Koa();

app.use(logger())
   .use(bodyParser())
   .use(cors())
   .use(helmet());

routing(app);

// Start the application
app.listen(port, () =>
  console.log(`✅  The server is running at http://localhost:${port}/`)
);

export default app;
