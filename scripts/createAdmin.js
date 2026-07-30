/**
 * One-time script to create the first admin user.
 *
 * Usage:
 *   1. npm install dotenv (if not already installed)
 *   2. Edit the ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD values below
 *   3. Run:  node scripts/createAdmin.js
 *
 * There is intentionally no public "sign up" page for admins —
 * new admin accounts should only ever be created this way, directly
 * against the database.
 */

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ADMIN_NAME = "Dr. S.K. Sachin";
const ADMIN_EMAIL = "admin@skhealthcare.org";
const ADMIN_PASSWORD = "ChangeThisPassword123!"; // change before running, then change again after first login

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set. Check your .env.local file.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const AdminSchema = new mongoose.Schema(
    {
      name: String,
      email: { type: String, unique: true, lowercase: true },
      password: String,
    },
    { timestamps: true }
  );

  const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

  const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (existing) {
    console.log(`An admin with email ${ADMIN_EMAIL} already exists. Nothing was created.`);
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await Admin.create({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL.toLowerCase(),
    password: hashedPassword,
  });

  console.log("Admin account created successfully:");
  console.log(`  Email: ${ADMIN_EMAIL}`);
  console.log(`  Password: ${ADMIN_PASSWORD}`);
  console.log("Please log in and note this down somewhere safe. This password is not recoverable once you lose it.");

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});