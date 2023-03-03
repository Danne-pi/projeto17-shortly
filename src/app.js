import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.routes.js"
import urlsRoutes from "./routes/urls.routes.js"
import sessionRefresh from "./session.js";

dotenv.config();
const port = process.env.PORT || 5000;
//config//
const app = express();
app.use(cors());
app.use(express.json());

//routes//
app.use(usersRoutes);
app.use(urlsRoutes);


///init///
app.listen(port, () => console.log(`Server running in port: ${port}`));

//sessions//
sessionRefresh(15, 2.5, 'minutes')