const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user, done) => {
	// console.log(user,'sadsa')
	// console.log(req.session.passport.user,'hahs')
	done(null, user);
})
passport.deserializeUser(function (user, done) {
	console.log(user);
	done(null, user);
});

passport.use(new GoogleStrategy({
	clientID: process.env.CLIENT_ID, // Your Credentials here. 
	clientSecret: process.env.CLIENT_SECRET, // Your Credentials here. 
	callbackURL: "http://localhost:3000/auth/google/callback",
	passReqToCallback: true
},
	function (request, accessToken, refreshToken, profile, done) {
		return done(null, profile);
	}
));
