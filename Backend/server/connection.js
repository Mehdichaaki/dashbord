const mongoose = require("mongoose");

const mongodbUri = `mongodb+srv://SalimCH:SalimCH@cluster0.nu12cl7.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;

mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });

module.exports = mongoose.connection;
