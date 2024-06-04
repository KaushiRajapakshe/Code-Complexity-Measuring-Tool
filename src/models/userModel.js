const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signUpUser(db, email, username, password) {
  console.log(
    "Signing up user... email=" +
      email +
      " username=" +
      username +
      " password=" +
      password
  );
  const encryptedPassword = bcrypt.hashSync(password, 10);

  const existingUser = await db
    .collection("users")
    .findOne({ $or: [{ email: email }, { username: username }] });
  if (existingUser) {
    console.log(
      "User with the same email or username already exists email=" + email
    );
    return {
      status: false,
      errorMessage: "User with the same email or username already exists",
    };
  }

  await db.collection("users").insertOne({
    email: email,
    username: username,
    password: encryptedPassword,
  });

  return { status: true, errorMessage: "" };
}

async function updateUser(db, email, newUsername, newPassword) {
  console.log("Updating user...");
  let encryptedPassword;
  if (newPassword) {
    encryptedPassword = bcrypt.hashSync(newPassword, 10);
  }

  await db
    .collection("users")
    .updateOne(
      { email: email },
      { $set: { username: newUsername, password: encryptedPassword } }
    );

  const user = await db.collection("users").findOne({ username: newUsername });
  return { status: true, data: user };
}

async function findByUsername(db, username) {
  console.log("Finding user by username...");
  return await db.collection("users").findOne({ username: username });
}

async function checkLogin(db, email, password) {
  console.log("Checking login...");
  const user = await db.collection("users").findOne({ email: email });
  if (!user) {
    return { status: false, data: "User not found with given email " + email };
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return { status: false, data: "Incorrect password" };
  }

  const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { status: true, data: user, token: token };
}

const authenticateToken = (req, res, next) => {
  if (req.user) {
    console.log("User authenticated" + req.user);
  }

  console.log("Authenticating token...");
  // Get the JWT token from cookies,
  const token = req.cookies.token;
  console.log("token", token);
  // If no token is found, return an unauthorized error
  if (!token) {
    console.log("No token found");
    return res.status(401).redirect("/login"); // Redirect to the login page
  }

  try {
    console.log("Verifying token...");
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("User authenticated" + { decoded });
    // Attach the decoded token payload to the request object
    req.user = decoded;
    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return an unauthorized error
    return res.status(401).redirect("/login"); // Redirect to the login page
  }
};

async function deactivateUser(db, email) {
  const result = await db.collection("users").deleteOne({ email: email });
  if (result.deletedCount === 1) {
    return { status: true };
  } else {
    return { status: false };
  }
}
module.exports = {
  signUpUser,
  updateUser,
  findByUsername,
  checkLogin,
  authenticateToken,
  deactivateUser,
};
