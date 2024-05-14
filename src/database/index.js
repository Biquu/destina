import mongoose from "mongoose"; // Importing the Mongoose module

const configOptions = {
  useNewUrlParser: true, // Setting this option to true to use the new URL parser
  useUnifiedTopology: true, // Setting this option to true to use a unified topology
};

const connectToDB = async () => {
    const connectionUrl = process.env.MONGODB_URI; // Getting the MongoDB URI for the Mongoose connection
    
  mongoose
    .connect(connectionUrl, configOptions) // Connecting to MongoDB, specifying connection options using configOptions
    .then(() => console.log("DB connected successfully!")) 
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`) 
    );
};

export default connectToDB; // Exporting the connection function
