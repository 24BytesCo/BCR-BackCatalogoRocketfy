const mongoose = require("mongoose");

const bdConnection = async () => {
  try {
    await mongoose.connect(process.env.CCBD);

    console.log("BD Online");
  } catch (error) {
    console.log(error);

    throw new Error("Error al conectarse a la BD, mirar logs");
  }
};

module.exports = {
  bdConnection,
};
