/**
 * This widget is an example of using the Peppa REST API to manage Drupal User accounts
 * The example shows the following API calls:
 * 
 * Logout - Remove the user session from the seerver
 * Create - Create a new user (username,password & email adddress)
 * Login - Login to an existing account and get a sessionId
 * 
 * One a valid login has taken place a user sessionid is stored and the Peppa Object API can be used
 *  
 */

var api = require('peppaAPI');


/**
 * Check the status of user log and set the options as needed
 */
function checkLoginStatus(e){
	
	// first check status of the current user
	if(api.User.current()){
		$.createBtn.enabled = false;
		$.loginBtn.enabled = false;
		$.logoutBtn.enabled = true;
	}
	else{
		$.logoutBtn.enabled = false;
		$.loginBtn.enabled = ( ($.username.value.length>0) && ($.password.value.length>0) && ($.email.value.length===0));
		$.createBtn.enabled  = ($.username.value.length>0 && $.password.value.length>0 && $.email.value.length>0);
	}
	
}

/**
 * Create a new account with the API. This requires 3 values:
 * - username
 * - password
 * - email
 * @param {Object} e
 */
function createAccount(e){
	
	api.User.Create({name: $.username.value,pass:$.password.value,mail: $.email.value,login:true},function(r){
		Ti.API.info(r);
		checkLoginStatus();
	});	
	
}

/**
 * Attempt to log a user into the remote system
 * @param {Object} e
 */
function userLogin(e){

	api.User.Login({name: $.username.value, pass: $.password.value}, function(r){
		Ti.API.info(r);
		checkLoginStatus();		
	});	
}

/**
 * Log a user out from the remote system
 * @param {Object} e
 */
function userLogout(e){
	api.User.Logout(function(r){
		Ti.API.info(r);
		checkLoginStatus();		
	});	
}

// Set initial app Status
checkLoginStatus();
