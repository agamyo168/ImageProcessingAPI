import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('./public'));
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.get('/api/v1/images', (req, res) => {
    res.send('Image!');
});

app.all('*', (req, res) => {
    res.status(404).send('Oops!');
});

const start = async () => {
    app.listen(port, () => {
        console.log(`SERVER IS LISTENING ON PORT http://localhost:${port}....`);
    });
};

start();

export default app;
