import bodyParser from 'body-parser';
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

class CustomError extends Error {
  
  statusCode = 404;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  getErrorMessage() {
    return 'Something went wrong: ' + this.statusCode;
  }
}
class ICustomError extends Error {
  status: string;
  statusCode = 500
  constructor(message: string, status: string, statusCode: number) {
    super(message);

    this.status = status;

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  getErrorMessage() {
    return 'Something went wrong: ' + this.status;
  }
}

const app = express().use(cors()).use(bodyParser.json());

app.post("/home", (req, res) => {
  console.log(req.body)
})

const port = config.get<number>('port');
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  connectDB();
});

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true,
  })
);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.get(
  '/api/healthChecker',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      message: 'welcome',
    });
  }
);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as unknown;
  if (err instanceof CustomError) {
  err.statusCode = 404;
  next(err);
}});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ICustomError) {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}});
