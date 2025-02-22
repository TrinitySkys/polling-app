const { User, Poll } = require('../models'); // Import User & Poll models

module.exports = {
  getDashboard: async (req, res) => {
    try {
        console.log("📌 Entered getDashboard function");

        if (!req.session || !req.session.userId) {
            console.error('❌ Unauthorized access to dashboard');
            return res.redirect('/polling-app/login');
        }

        // Fetch user info
        const user = await User.findByPk(req.session.userId);
        if (!user) {
            console.error('❌ User not found for dashboard:', req.session.userId);
            return res.redirect('/polling-app/login');
        }

        // Fetch polls from the database
        let polls = await Poll.findAll().catch(err => {
            console.error("❌ Error fetching polls:", err);
            return [];
        });

        // Ensure `polls` is always an array
        if (!polls || !Array.isArray(polls)) {
            console.warn("⚠️ No polls found, setting empty array");
            polls = [];
        }

        console.log("✅ Dashboard accessed by:", user.username);
        console.log("📊 Polls Data:", polls);

        res.render('dashboard', { user, polls }); // ✅ Pass polls to EJS
    } catch (error) {
        console.error('❌ Dashboard Error:', error);
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  },

  postLogin: async (req, res) => {
    try {
        console.log('📥 Received req.body:', req.body); // Debugging log

        // Ensure req.body exists
        const { username, password } = req.body || {};
        if (!username || !password) {
            console.error('❌ Missing username or password:', req.body);
            return res.status(400).render('login', { message: 'Missing username or password' });
        }

        // Find user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.error('❌ User not found:', username);
            return res.render('login', { message: 'Invalid username or password' });
        }

        // Compare passwords (PLAIN TEXT - NO HASHING)
        if (password !== user.password) {
            console.error('❌ Incorrect password for user:', username);
            return res.render('login', { message: 'Invalid username or password' });
        }

        // Store user session
        req.session.userId = user.id;
        req.session.username = user.username;
        console.log('✅ Login successful:', username);

        res.redirect('/polling-app/dashboard');
    } catch (error) {
        console.error('❌ Login Error:', error);
        res.status(500).render('login', { message: 'Internal server error' });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('❌ Logout Error:', err);
        return res.status(500).send('Logout failed');
      }
      console.log('✅ User logged out');
      res.redirect('/polling-app/login');
    });
  }
};
