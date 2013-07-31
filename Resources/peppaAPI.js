function createMethodURL(_method, _data, stringify) {
    var url = "";
    url = "production" == Ti.App.deployType ? "http://" + prod_endpoint + "/" + _method : "http://" + demo_endpoint + "/" + _method;
    var params = false;
    if (_data) {
        for (var key in _data) if (_data.hasOwnProperty(key)) {
            params ? params += "&" : params = "?";
            params += key + "=" + encodeURI(stringify ? JSON.stringify(_data[key]) : _data[key]);
        }
        url += params;
    }
    Ti.API.info(url);
    return url;
}

function createRESTRequest(_callback) {
    var request = Ti.Network.createHTTPClient({
        autoRedirect: true,
        cache: false,
        enableKeepAlive: true,
        onload: function() {
            Ti.API.info(this.responseText);
            var data = JSON.parse(this.responseText);
            data.statusCode = this.status;
            _callback && _callback(data);
        },
        onerror: function(e) {
            Ti.API.info("call error: " + this.status);
            var data = {};
            data.error = e;
            data.success = false;
            data.statusCode = this.status;
            _callback && _callback(data);
        }
    });
    return request;
}

var key = "bb6eeef347cf4ecf0a1f24e888ef4e10";

var prod_endpoint = "peppa.c2h4.co.uk/peppa/api/1";

var demo_endpoint = prod_endpoint;

var object = {
    Create: function(objectname, data, callback) {
        var request = createRESTRequest(callback);
        request.open("POST", createMethodURL("object/" + objectname));
        request.setRequestHeader("X-PEPPA-SESSIONID", user.current().sid);
        request.setRequestHeader("X-PEPPA-API-KEY", key);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));
    },
    Get: function(objectname, data, callback) {
        var request = createRESTRequest(callback);
        request.open("GET", createMethodURL("object/" + objectname + "/" + data));
        request.setRequestHeader("X-PEPPA-SESSIONID", user.current().sid);
        request.setRequestHeader("X-PEPPA-API-KEY", key);
        request.send();
    },
    GetAll: function(objectname, callback) {
        var request = createRESTRequest(callback);
        request.open("GET", createMethodURL("object/" + objectname));
        request.setRequestHeader("X-PEPPA-SESSIONID", user.current().sid);
        request.setRequestHeader("X-PEPPA-API-KEY", key);
        request.send();
    },
    Delete: function(objectname, data, callback) {
        var request = createRESTRequest(callback);
        request.open("DELETE", createMethodURL("object/" + objectname + "/" + data));
        request.setRequestHeader("X-PEPPA-SESSIONID", user.current().sid);
        request.setRequestHeader("X-PEPPA-API-KEY", key);
        request.send();
    },
    Update: function(objectname, oid, data, callback) {
        var request = createRESTRequest(callback);
        request.open("PUT", createMethodURL("object/" + objectname + "/" + oid));
        request.setRequestHeader("X-PEPPA-SESSIONID", user.current().sid);
        request.setRequestHeader("X-PEPPA-API-KEY", key);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));
    }
};

var user = {
    current: function() {
        return Ti.App.Properties.getObject("peppauser", false);
    },
    Create: function(data, callback) {
        var request = createRESTRequest(function(e) {
            e.success && e.data && Ti.App.Properties.setObject("peppauser", e.user);
            callback && callback(e);
        });
        request.open("POST", createMethodURL("user"));
        request.setRequestHeader("X-PEPPA-API-KEY", key);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));
    },
    Login: function(data, callback) {
        var request = createRESTRequest(function(e) {
            e.success && Ti.App.Properties.setObject("peppauser", e.user);
            callback && callback(e);
        });
        request.open("GET", createMethodURL("user", data));
        request.setRequestHeader("X-PEPPA-API-KEY", key);
        request.send();
    },
    Logout: function(callback) {
        var request = createRESTRequest(function(e) {
            Ti.App.Properties.setObject("peppauser", false);
            callback && callback(e);
        });
        request.open("GET", createMethodURL("user/logout"));
        request.setRequestHeader("X-PEPPA-SESSIONID", user.current().sid);
        request.setRequestHeader("X-PEPPA-API-KEY", key);
        request.send();
    }
};

exports.User = user;

exports.Object = object;