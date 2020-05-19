const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user_id: String,
    title: String,
    image: String,
    dietLabels: [{}],
    healthLabels: [{}],
    ingredients: [{}],
  },
  { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
