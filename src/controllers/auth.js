import User from '../entities/user';
import logger from '../utils/logger';
import Misc from './../utils/misc';

/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const login = (req, res) => {
	if( !req.body.username || !req.body.password ) {
		Misc.responseHandler(res, 401, 'Email and Password Required');
	}
	User.findOne( { username: req.body.username }, ( err, user ) => {
		if( err || !user ) {return Misc.responseHandler(res, 401, 'User not Found')};
		user.verifyPassword(req.body.password).then(valid => {
			if (valid) {
				let payload = {
					_id : user._id,
					email: user.email,
					username: user.username,
					name: user.name
				}
				let _token = Misc.generateToken(payload);
		
				Misc.responseHandler (res, 200, "login_successful", {token: _token});
			  } else {
				Misc.responseHandler (res, 401, "invalid_credentials");
			  }
		}).catch (err => { Misc.responseHandler (res, 401, "failed"); })
	})
};
/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Create a new user and return some authentication token 
 * which can be used to verify protected resources'
 * {"user": <{...}>, "token": "<...>""}
 */
export const signup = (req, res) => {

	let new_user = new User(req.body);
	new_user.save((err, user) => {
		if (err) return Misc.responseHandler(res, 400, 'Could not add User', err);
		
		/**
		 * Node =< 8.2.1  !support spread operator
		 */
		let payload = {
			_id : user._id,
			email: user.email,
			username: user.username,
			name: user.name
		}
		let _token = Misc.generateToken(payload);

		Misc.responseHandler (res, 200, "user_created", {token: _token});
	})
};
/**
 * Implement a way to recover user accounts
 */
export const forgotPassword = (req, res) => {
	
	res.status(404).json({ err: "not implemented" })
};

export default {
	login,
	signup,
	forgotPassword
}