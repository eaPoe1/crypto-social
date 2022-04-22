import { URL } from 'url';

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./database.js";
import routerUser from "./routes/users.js";
import routerFollow from './routes/follow.js';
import routerPost from './routes/posts.js';

const app = express();
connectDB();

app.use(express.json());


app.use('/api/users', routerUser);
app.use('/api/follow', routerFollow);
app.use('/api/posts', routerPost);


export default app;