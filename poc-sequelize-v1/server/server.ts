import express from 'express';
import * as bodyParser from 'body-parser';
import { userRouter } from './controllers/routes';

//initial setup
const app: express.Application = express();
const port = process.env.PORT || 3006;

app.use(bodyParser.json());

//routes
app.use('/', userRouter)

//error handling
app.use((err, req, res, next) => {
    console.error(err);
    if (err.status === undefined || err.status === null) {
        res.status(500).end();
    } else {
        res.status(err.status).end();
    }
});

//3, 2, 1, go!
app.listen(port, () => {
    console.info(`Listening on port: ${port}`);
});