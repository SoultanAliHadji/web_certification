import express from "express";
import cors from "cors";
import OrderRoute from "./routes/OrderRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(OrderRoute);

app.listen(5000, () => console.log("Server up and running..."));
