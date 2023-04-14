import mongoose from "mongoose";

try {
  const url = process.env.MONGO_URI;
  await mongoose.connect(url);
  console.log(
    `connected to mongo via mongoose on: ${mongoose.connection.host}`
  );
} catch (e) {
  console.error(e.message);
}

export default mongoose;
