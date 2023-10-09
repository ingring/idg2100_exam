//adding mongoose + modules
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const socket = require("./socket");
const swaggerDoc = require("swagger-ui-express");
const swaggerDocumentation = require("./documentation");
//socket

socket.configureSocket(server);

//Routes
const refresh = require("./routers/refreshRoute");
const logout = require("./routers/logoutRoute");
const players = require("./routers/playerRoutes");
const matches = require("./routers/matchRoutes");

//Adding settings for the CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    console.log("Connected to MongoDB...", "on", process.env.MONGO_URL)
  )
  .catch(() =>
    console.log("Could not connect to MongoDB...", process.env.MONGO_URL)
  );

//running request through JSON
app.use(express.json());

//Route for players
app.use("/players", players);

//Route for matches
app.use("/matches", matches);

//route for refreshtoken
app.use("/refresh", refresh);

//route to logout
app.use("/logout", logout);

//swagger
app.use("/documentation", swaggerDoc.serve);
app.use("/documentation", swaggerDoc.setup(swaggerDocumentation));

//Running the server on a set port
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening on port ${port}`));
