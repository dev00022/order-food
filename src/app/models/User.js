const { Schema, models, model } = require("mongoose");
const UserSchema = new Schema(
  {
    name: { type: "String" },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: { type: String },
    phone: { type: String },
    streetAdress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = models?.User || model("User", UserSchema);

export default User;
