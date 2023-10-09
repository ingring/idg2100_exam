const MongoClient = require("mongodb").MongoClient;
const { MongoMemoryServer } = require("mongodb-memory-server");
// const url = "mongodb://localhost:27017";
// const dbName = "NTNUppl";
const fs = require("fs");
const { exec } = require("child_process");
const { ObjectId } = require("mongodb");

async function initializedb() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const dbName = "NTNUppl";
  const client = new MongoClient(uri);
  const tofile = `
        Port = 5000
        Mongo_url = "${uri}NTNUppl"
        ACCESS_TOKEN_SECRET=1d30a45df41f1099f448c6e00cd4dec02e14fae25bb40852e9b5c60f73880c2fca5c210cfa171471202e03ee78dfb77a3b4f5d2ca662c1e72237336ee2c837c
        REFRESH_TOKEN_SECRET=c9d1a3b8dcc01d90e25d37258c07heicf5b66bc32fd366f1454bee28a07681664fd36982e9960bed309d0e837afaad94169e4477aa24852ef7413878f8d9e611
        
        `;

  fs.writeFile("./backend/.env", tofile, function (err) {
    if (err) throw err;
  });


  try {
    await client.connect();
    const db = client.db(dbName);

    const matchdata = JSON.parse(
      fs.readFileSync("./exampleDB/matches.json", "utf8")
    );
    const matches = db.collection("matches");
    await matches.insertMany(matchdata);

    const playerdata = JSON.parse(
      fs.readFileSync("./exampleDB/players.json", "utf8")
    );
    const playerdatawithid = playerdata.map((player) => ({
      ...player,
      _id: new ObjectId(player._id),
      favourites:
        player.favourites.length > 0
          ? player.favourites.map((item) => new ObjectId(item._id))
          : [],
    }));
    const players = db.collection("players");
    await players.insertMany(playerdatawithid);

    const valdata = JSON.parse(
      fs.readFileSync("./exampleDB/validations.json", "utf8")
    );
    const validation = db.collection("validations");
    await validation.insertMany(valdata);

    const refreshtokendata = JSON.parse(
      fs.readFileSync("./exampleDB/refreshtokens.json", "utf8")
    );
    const refreshtokens = db.collection("refreshtokens");
    await refreshtokens.insertMany(refreshtokendata);

  } catch (err) {
    console.log("Database failed to initialize with this error:", err);
  } finally {
    await client.close();
    exec("npm run backend", (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }
}

initializedb();
