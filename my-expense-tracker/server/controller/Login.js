const bcrypt = require('bcrypt');


const login = async (req, res, db) => {
    console.log("Inside login");
    const { email, password } = req.body;

    if (!email || !password) {
        console.error('Missing email or password');
        return res.status(400).json({ error: 'Missing email or password' });
    }

    try {
        const user = await db.users.findOne({ where: { email } });
        if (!user) {
            console.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.error('Incorrect password');
            return res.status(401).json({ error: 'Incorrect password' });
        }

        console.log('Login successful');
        return res.status(200).json({ message: 'Login successful' });
    } catch (e) {
        console.error(e);
        return res.status(503).json({ error: 'Server error' });
    }
}

module.exports = {
    login
}

