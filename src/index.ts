import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import routes from './routes';
import errormiddleware from './middleware/error.middleware';
import db from './database';

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
//middleware to parse incomming requests
app.use(express.json());
// HTTP request logger middleware
app.use(morgan('common'));
//HTTP security middleware
app.use(helmet());
//apply the rate limiting middleware to all requests
app.use(
    RateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message: 'Too many requests from this IP'
    })
);

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'WELCOME TO THE MAIN PAGE'
    });
});

db.connect().then((client) => {
    return client
        .query('SELECT NOW()')
        .then((res) => {
            client.release();
        })
        .catch((err) => {
            client.release();
            console.log(err.stack);
        });
});

app.use(errormiddleware);
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        message: 'I think you have lost your way'
    });
});
// start express server
app.listen(PORT, () => {
    console.log(`Server is starting at prot:${PORT}`);
});

export default app;
