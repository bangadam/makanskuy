const axios = require("axios");
const Favorite = require("../models/recipesFavorite");

exports.index = async (req, res) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await axios
    .get(
      "https://api.edamam.com/search?q=chicken&app_id=" +
        process.env.EDAMAM_ID +
        "&app_key=" +
        process.env.EDAMAM_KEY +
        "&from=0&to=20",
      { headers }
    )
    .catch((error) => {
      console.log(error);
    });
  //   console.log(response.data);
  res.render("pages/recipes/recipes", {
    recipes: response.data,
  });
};

exports.search = async (req, res) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await axios
    .get(
      "https://api.edamam.com/search?q=" +
        req.query.recipes +
        "&app_id=" +
        process.env.EDAMAM_ID +
        "&app_key=" +
        process.env.EDAMAM_KEY +
        "&from=0&to=20",
      { headers }
    )
    .catch((error) => {
      console.log(error);
    });
  //   console.log(response.data);
  res.render("pages/recipes/recipes", {
    recipes: response.data,
  });
};

exports.addToFavorite = (req, res) => {
  let data = JSON.parse(req.body.recipes);
  let user = req.user;
  const favorite = new Favorite({
    title: data.label,
    user_id: user._id,
    image: data.image,
    dietLabels: data.dietLabels,
    healthLabels: data.healthLabels,
    ingredients: data.ingredients,
  });

  Favorite.findOne({ title: data.label }, (error, existingRecipes) => {
    if (error) {
      next(error);
    }
    if (existingRecipes) {
      req.flash("errors", {
        msg: "Recipes already exists.",
      });
      return res.redirect("/recipes");
    }

    favorite.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/myfavorite");
    });
  });
};
