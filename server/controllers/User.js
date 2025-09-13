const User = require('../models/User');
const jwt = require('jsonwebtoken');
const handleErrors = require('../utils/handleErrors');

const createToken = (_id) => {
  if (!process.env.SECRET) {
    throw new Error("JWT SECRET is not defined in environment variables");
  }
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '90d' });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      dateofbirth: user.dateofbirth,
      token
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, name, dateofbirth } = req.body;
  try {
    const user = await User.signup(email, password, name, dateofbirth);
    const token = createToken(user._id);

    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      dateofbirth: user.dateofbirth,
      token
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports = { signupUser, loginUser };
