const axios = require("axios");
const Favorite = require("../models/recipesFavorite");

exports.index = (req, res, next) => {
  Favorite.find({ user_id: req.user._id }, (error, data) => {
    if (error) {
      next(error);
    }

    if (data) {
      res.render("pages/myfavorite/index", { recipes: data });
    }
  });
};

exports.detailFavorite = (req, res, next) => {
  Favorite.findById(req.params.id, (err, data) => {
    if (err) {
      next(err);
    }

    if (data) {
      res.render("pages/myfavorite/detailFavorite", { recipes: data });
    }
  });
};
