const express = require('express');
const path = require('path');
const app = express();

// Middleware to check working hours (Monday to Friday, 9am to 5pm)
const checkWorkingHours = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = date.getHours();

    if (dayOfWeek === 0 || dayOfWeek === 6 || hour < 9 || hour >= 17) {
        res.send('Sorry, the website is only available during working hours (Monday to Friday, 9am to 5pm).');
    } else {
        next();
    }
};

// Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use custom middleware to check working hours for all routes
app.use(checkWorkingHours);

// Define routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
