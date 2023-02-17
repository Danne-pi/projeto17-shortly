import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.routes.js"

dotenv.config();
const port = process.env.PORT || 5000;
//config//
const app = express();
app.use(cors());
app.use(express.json());

//routes//
app.use(usersRoutes);


///init///
app.listen(port, () => console.log(`Server running in port: ${port}`));