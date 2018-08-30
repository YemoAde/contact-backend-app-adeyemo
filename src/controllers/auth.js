import User from '../entities/user';
import logger from '../utils/logger';
import Misc from './../utils/misc';
import PasswordReset from './../entities/passwordReset';

/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const login = (req, res) => {
	if( !req.body.username || !req.body.password ) {
		return Misc.responseHandler(res, 401, 'Email and Password Required');
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
		
				return Misc.responseHandler (res, 200, "login_successful", {token: _token});
			  } else {
				return Misc.responseHandler (res, 401, "invalid_credentials");
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

		return Misc.responseHandler (res, 200, "user_created", {token: _token});
	})
};
/**
 * Implement a way to recover user accounts
 */
export const forgotPassword = (req, res) => {
	if(!req.body.email) {
		return Misc.responseHandler(res, 400, 'provide_email');
	}
	User.findOne({email: req.body.email}, (err, user) => {
		if(err || !user){
			return Misc.responseHandler(res, 400, 'invalid email');
		}
		PasswordReset.findOne({user: user._id}, (err, _reset) => {
			if(!_reset){
				let new_reset = new PasswordReset({ user : user._id});
				new_reset.save((err, reset) => {
					if(err || !reset){
						return Misc.responseHandler(res, 400, 'failed');
					}
					//alternatively send to mail
					/**
					 * @todo Send Token to mail
					 */
					return Misc.responseHandler(res, 200, 'reset_token', {reset_token: reset._id})
				})
			}else {
				return Misc.responseHandler(res, 200, 'reset_token', {reset_token: _reset._id})
			}
		})
		

	})
};

export const resetPassword = (req, res) => {
	const new_password  = req.body.new_password
	let token = req.body.reset_token
	PasswordReset.findById(token, (err, reset) => {
		if(err || !reset){
			return Misc.responseHandler(res, 400, 'No Reset History');
		}
		console.log(new_password);
		User.findByIdAndUpdate(reset.user, { password: new_password }, (err, user) => {
			if(err || !user){
				return Misc.responseHandler(res, 400, 'update_operation_failed');
			}else{
				PasswordReset.findOneAndDelete({user: user._id}, (err, uReset) => {
					//pass
				})
				return Misc.responseHandler(res, 200, 'updated');
				
			}
		})
		
	})
};

export default {
	login,
	signup,
	forgotPassword,
	resetPassword
}