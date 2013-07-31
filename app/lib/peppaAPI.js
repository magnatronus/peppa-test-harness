/**
 * peppaAPI.js
 * 
 * CommonJS module that interfaces to the Drupal 7 Peppa REST API V1.
 * 
 * version 1.00
 * author: Stephen Rogers
 * www.spiralarm.co.uk/peppa
 * 
 */

// change this to suit your  App (if a key is required)
var key = '{PUT YOUR APIKEY HERE}';

// allows automatic selection of endpoint based on environment
var prod_endpoint = 'peppa.c2h4.co.uk/peppa/api/1';
var demo_endpoint = prod_endpoint;
//var demo_endpoint = 'localhost/peppa/api/1';


/*
 * Generate the complete URL request and add any passed params
 */
function createMethodURL(_method,_data,stringify){
		
	// first sort our URL
	var url='';
	if(Ti.App.deployType=='production'){
		url = 'http://' +  prod_endpoint + "/"+_method;	
	}	
	else{
		url = 'http://' + demo_endpoint + "/"+_method;
	}	
		
	// if data passed then url encode each
	var params=false;
	if(_data){
		for (var key in _data) {
  			if (_data.hasOwnProperty(key)) {
    			if(!params){
     				params='?';
    			}
    			else{
     			params+='&';   				
    			}
    			params+=key+'='+encodeURI((stringify)?JSON.stringify(_data[key]):_data[key]);
  			}
		}	
		url+=params;
	}

	Ti.API.info(url);
	return url;	
}

/*
 * Common Function to generate a Peppa REST API request
 */
function createRESTRequest(_callback) {

    var request = Ti.Network.createHTTPClient({
    	
        autoRedirect:  true,
        cache:  false,
        enableKeepAlive:  true,
        
        onload: function(e){
     		Ti.API.info(this.responseText);
    		var data = JSON.parse(this.responseText);
        	data.statusCode = this.status;
        	if (_callback) {
        		_callback(data);
        	}
        },
        onerror: function(e){
    		Ti.API.info('call error: ' + this.status);
 			var data={};
 			data.error = e;
        	data.success = false;
 			data.statusCode = this.status;
 			
        	if (_callback) {
        		_callback(data);
        	}
        }
        
    });
  
    return request;
}



/*
 * Define object API
 */
var object = {
	
	// Create New object
	Create: function(objectname, data, callback){
		
		// now process request
		var request = createRESTRequest(callback);
		request.open('POST',createMethodURL('object/'+objectname));
		request.setRequestHeader("X-PEPPA-SESSIONID",user.current().sid);
		request.setRequestHeader("X-PEPPA-API-KEY",key);
		request.setRequestHeader("Content-Type","application/json");
		request.send(JSON.stringify(data));
	},
	
	// Get Detail of 1 specific object
	Get: function(objectname,data,callback){
		var request = createRESTRequest(callback);
		request.open('GET',createMethodURL('object/'+objectname+'/'+data));
		request.setRequestHeader("X-PEPPA-SESSIONID",user.current().sid);
		request.setRequestHeader("X-PEPPA-API-KEY",key);
		request.send();
	},	

	// Get a List of all objects
	GetAll: function(objectname,callback){
		var request = createRESTRequest(callback);
		request.open('GET',createMethodURL('object/'+objectname));
		request.setRequestHeader("X-PEPPA-SESSIONID",user.current().sid);
		request.setRequestHeader("X-PEPPA-API-KEY",key);
		request.send();
	},
	
	// Delete Object
	Delete: function(objectname, data, callback){		
		var request = createRESTRequest(callback);
		request.open('DELETE',createMethodURL('object/'+objectname+'/'+data));
		request.setRequestHeader("X-PEPPA-SESSIONID",user.current().sid);
		request.setRequestHeader("X-PEPPA-API-KEY",key);
		request.send();	
	},
	
	// Update an object
	Update: function(objectname, oid, data, callback){
		
		// now process request
		var request = createRESTRequest(callback);
		request.open('PUT',createMethodURL('object/'+objectname+'/'+oid));
		request.setRequestHeader("X-PEPPA-SESSIONID",user.current().sid);
		request.setRequestHeader("X-PEPPA-API-KEY",key);
		request.setRequestHeader("Content-Type","application/json");
		request.send(JSON.stringify(data));
	},
	
	
	
};

/*
 * Define Our User API
 */
var user = {
	
	// The currently logged in user
	current: function(){
		return Ti.App.Properties.getObject('peppauser', false);
	},
	
	// Create New User
	Create: function(data, callback){
		var request = createRESTRequest(function(e){
			if(e.success && e.data){
				Ti.App.Properties.setObject('peppauser', e.user);
			}
			if(callback){
				callback(e);
			}			
		});
		request.open('POST',createMethodURL('user'));
		request.setRequestHeader("X-PEPPA-API-KEY",key);
		request.setRequestHeader("Content-Type","application/json");
		request.send(JSON.stringify(data));
	},
	
	// Login Existing User
	Login: function(data,callback){
		
		// modified so we store the returned user object
		var request = createRESTRequest(function(e){
			if(e.success){
				Ti.App.Properties.setObject('peppauser', e.user);
			}
			if(callback){
				callback(e);
			}
		});
		request.open('GET',createMethodURL('user',data));
		request.setRequestHeader("X-PEPPA-API-KEY",key);
		request.send();		
	},

	// User logout
	Logout: function(callback){
		var request = createRESTRequest(function(e){
			Ti.App.Properties.setObject('peppauser', false);		
			if(callback) callback(e);	
		});	
		request.open('GET',createMethodURL('user/logout'));
		request.setRequestHeader("X-PEPPA-SESSIONID",user.current().sid);
		request.setRequestHeader("X-PEPPA-API-KEY",key);
		request.send();					
	},
	
	
};

/*
 * Exports
 */
exports.User = user;
exports.Object = object;
