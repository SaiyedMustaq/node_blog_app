// async function userSingIn(res, req) {
//   try {
//     const { email, password } = req.body;
//     const token = await User.matchPasswordAndGenerateTokenForUser(
//       email,
//       password
//     );
//     return res.cookie("token", token).redirect("/");
//   } catch (error) {
//     return res.render("signin", {
//       error: "Incorrect email or password",
//     });
//   }
// }
