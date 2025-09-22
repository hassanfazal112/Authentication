import 'module-alias/register';
import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
} from 'express';
import { config } from '@/config';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import http from 'http';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import errorHandler from '@/middlewares/error';

// Import routes
import authRoutes from '@/routes/auth';

// Load environment variables
dotenv.config();

const app: Express = express();

app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.com'],
      connectSrc: ["'self'", 'http://localhost:3000'],
    },
  }),
);

if (config.node_env === 'production') {
  app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
}

// Create HTTP Server
const server = http.createServer(app);

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.send('Server is Running!');
});

app.use('/api/v1/auth', authRoutes);
app.use(errorHandler as unknown as ErrorRequestHandler);

server.listen(config.port, () => {
  console.log(`Express server running on port ${config.port}`);
});
