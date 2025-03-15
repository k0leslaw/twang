import 'dotenv/config';
import express, { response } from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await ____.connect(false)
    console.log(`Server listening on port ${PORT}...`)
});