const { supabase } = require('../config/db'); // Supabase backend client

const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { fullName }
        }
    });

    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({ message: 'User registered successfully', user: data });
};

module.exports = { registerUser };
