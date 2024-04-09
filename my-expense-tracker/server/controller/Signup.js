const { bcryptingPassword } = require("../../utils/bcrypting");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const userCreation = async (req, res, db) => {
  console.log(req, "request");
  console.log("inside user creation");
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
      console.error('Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      console.error('Invalid email format');
      return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
      const existingUser = await db.users.findOne({ where: { email } });
      if (existingUser) {
          console.error('Email already exists');
          return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = bcryptingPassword(password);
      console.log(hashedPassword);

      const user = {
          id: uuidv4(),
          name,
          email,
          password: hashedPassword,
      };

      await db.users.create(user);
      console.log('User created successfully');
      return res.status(201).json({ message: 'User created successfully' });
  } catch (e) {
      console.error(e);
      return res.status(503).json({ error: 'Server error' });
  }
}

// const userCreation = async (req, res, db) => {
//     console.log(req, "request");
//     console.log("inside user creation");
//     const { name, email, password, oauthToken } = req.body;

//     if ((!name || !email || !password) && !oauthToken) {
//         console.error('Missing required fields');
//         return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         console.error('Invalid email format');
//         return res.status(400).json({ error: 'Invalid email format' });
//     }

//     try {
//         let user;
//         if (oauthToken) {
//             const userInfo = await verifyOAuthToken(oauthToken);
//             if (!userInfo || !userInfo.email) {
//                 console.error('Invalid OAuth token');
//                 return res.status(401).json({ error: 'Invalid OAuth token' });
//             }
//             user = {
//                 id: uuidv4(),
//                 name: userInfo.name,
//                 email: userInfo.email,
//             };
//         } else {
//             const existingUser = await db.users.findOne({ where: { email } });
//             if (existingUser) {
//                 console.error('Email already exists');
//                 return res.status(400).json({ error: 'Email already exists' });
//             }
//             const hashedPassword = bcryptingPassword(password);
//             user = {
//                 id: uuidv4(),
//                 name,
//                 email,
//                 password: hashedPassword,
//             };
//         }

//         await db.users.create(user);
//         console.log('User created successfully');
//         return res.status(201).json({ message: 'User created successfully' });
//     } catch (e) {
//         console.error(e);
//         return res.status(503).json({ error: 'Server error' });
//     }
// }

module.exports = {
    userCreation
};