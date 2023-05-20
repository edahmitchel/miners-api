import mongoose from "mongoose";



const connection = async (connectionString: string) => {
    try {
        const conn = await mongoose.connect(connectionString);
        console.log(`db connected ${conn.connection.host}`);
    } catch (error: any) {
        console.log(`error:${error.message}`);
    }
    //   process.exit();
};

export { connection }

