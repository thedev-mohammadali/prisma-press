import { Pool } from "pg";
import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const PORT = config.port;
const pool = new Pool({ connectionString: config.database_url });

const main = async () => {
  try {
    await pool.query(`SELECT NOW();`);
    console.log("Connected to the database successfully");
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server: ", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
