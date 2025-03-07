const { Router } = require("express");
const User = require("../models/user_model");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateTokenForUser(
      email,
      password
    );
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render(
      'signin', {
        error:"Incorrect email or password"
      }
    );
  }
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

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
}); 

module.exports = router;
