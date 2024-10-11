import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config();
const port = process.env.PORT;

app.get('/', (req, res) => {
	res.send('hello world');
});

app.listen(port, () => {
	console.log(`Example listening on port: ${port}`);
});
