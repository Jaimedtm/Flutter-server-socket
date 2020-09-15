const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Metallica"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Megadeth"));
bands.addBand(new Band("Arch Enemy"));

io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
  client.on("mensaje", (payload) => {
    console.log(payload);
    io.emit("mensaje", {
      admin: "New message",
    });
  });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("add-band", (payload) => {
    bands.addBand(new Band(payload.name));
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (payload) => {
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  /* client.on("emitir-mensaje", (payload) => {
    io.emit("nuevo-mensaje", {
      message: payload,
    });  esto se emite a todos
    client.broadcast.emit("nuevo-mensaje", { message: payload });//Emite a todos menos al que lo emitio
    console.log(payload);
  }); */
});
