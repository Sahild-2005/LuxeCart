const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const Admin = require("./models/Admin");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne({
      email: "admin@luxecart.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      "LuxeCart@Admin2026",
      10
    );

    await Admin.create({
      name: "LuxeCart Admin",
      email: "admin@luxecart.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully.");
    console.log("Email: admin@luxecart.com");
    console.log("Password: LuxeCart@Admin2026");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();