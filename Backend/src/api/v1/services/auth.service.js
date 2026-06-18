/**
 * Auth Service
 * Business logic for authentication
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../model/user.model');

class AuthService {
  async register(userData) {
    const { email, password, fullName } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
    });

    return this.generateAuthResponse(user);
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return this.generateAuthResponse(user);
  }

  generateAuthResponse(user) {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    };
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

module.exports = new AuthService();
