import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import userRoute from "./routes/user.js";


const app = express();
const server = http.createServer(app);

const port = 9091;

mongoose
  .connect(
    "mongodb://localhost:27017/tektai"
  )
  .then(() => console.log("connected"))
  .catch((error) => console.log(error));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes utilisateur
app.use("/user", userRoute);

// Gestion des erreurs
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Démarrage du serveur
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
