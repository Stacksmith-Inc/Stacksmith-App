
import express from 'express';
import controller from './controllers/stackController'
import pg from 'pg';
import { Request, Response, NextFunction } from 'express';
const path = require('path');
const app = express();

const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client')));
app.get('/', (req: Request,res: Response) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})


//add routes here
app.get('/api/frontend', controller.getTechFrontend, (req: Request, res: Response) => {
  return res.status(200).send(res.locals.info);
})

app.get('/api/test', (req: Request, res: Response) => {
  return res.status(200).send('hi');
})


app.use('*', controller.getTechFrontend, (req: Request, res: Response) => {
    res.sendStatus(404);
  });

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
      log: 'Express error handler hii caught unknown middleware error',
      status: 400,
      message: { err: 'An error global occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });



app.listen(PORT, () => {
  console.log('listening on port: ', PORT)
});

