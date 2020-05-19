/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render("pages/home/index", {
    title: "Home",
  });
};
