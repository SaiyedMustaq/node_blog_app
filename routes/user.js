const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const user = User.matchPassword(email, password);
  console.log(`SING IN SUCCESS FULLY ${user}`);
  return res.redirect("/");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  var data = await User.create({
    fullName,
    email,
    password,
  });
  console.log(`User Data ${data}`);
  return res.redirect("/");
});

module.exports = router;
