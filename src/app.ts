import express from 'express';
import imagesRoute from './routes/images';
import notFoundMiddleware from './middlewares/not-found';
import errorHandlerMiddleware from './middlewares/error-handler';
import 'express-async-errors';
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('./public'));

app.use('/api/v1', imagesRoute);

//last middleware stack
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    app.listen(port, () => {
        console.log(`SERVER IS LISTENING ON PORT http://localhost:${port}....`);
    });
};

start();

export default app;
