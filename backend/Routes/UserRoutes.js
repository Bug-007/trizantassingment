const Model = require("../Models/UserModel");
const router = require("express").Router();

// Regular expression for email validation
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Regular expression for valid Indian mobile numbers (10-digit)
const pnoRegex = /^[6-9]\d{9}$/;

// Regular expression for password validation (at least 6 characters, including one uppercase letter and one number)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

router.post("/add", async (req, res) => {
  const { email, pno, password } = req.body;

  // Validate email
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate phone number (pno)
  if (!pnoRegex.test(pno)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  // Validate password
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Invalid password format" });
  }

  try {
    const existingUser = await Model.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const newUser = new Model(req.body);
    await newUser.save();
    console.log("Data saved");
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving data" });
  }
});

router.post("/authenticate", (req, res) => {
  const { email, password } = req.body;

  Model.findOne({ email, password })
    .then((userdata) => {
      if (userdata) {
        res.status(200).json({ message: "SUCCESS" });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error during authentication" });
    });
});

module.exports = router;
