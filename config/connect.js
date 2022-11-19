import mongoose from "mongoose";
const connect = async (DATABASE_URL) => {
  try {
    const DB_OPTION = {
      dbName: "facebookapi",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTION);
    console.log("connnect to db");
  } catch (err) {
    console.log(err);
  }
};
export default connect;
