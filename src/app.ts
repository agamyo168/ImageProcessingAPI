import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('./public'));
app.get('/', (req, res) => {
    res.send('Zebi');
});

const start = async () => {
    app.listen(port, () => {
        console.log(`SERVER IS LISTENING ON PORT http://localhost:${port}....`);
    });
};

start();
