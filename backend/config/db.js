import mongoose from 'mongoose';

export const connectDb = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      const db = mongoose.connection;
      console.log(` MongoDB connected`);
      console.log(` Database Name: ${db.name}`);
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error.message);
    });
};
