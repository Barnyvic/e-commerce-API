import app from '.';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
