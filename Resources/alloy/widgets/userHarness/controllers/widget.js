function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "userHarness/" + s : s.substring(0, index) + "/userHarness/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function checkLoginStatus() {
        if (api.User.current()) {
            $.createBtn.enabled = false;
            $.loginBtn.enabled = false;
            $.logoutBtn.enabled = true;
        } else {
            $.logoutBtn.enabled = false;
            $.loginBtn.enabled = $.username.value.length > 0 && $.password.value.length > 0 && 0 === $.email.value.length;
            $.createBtn.enabled = $.username.value.length > 0 && $.password.value.length > 0 && $.email.value.length > 0;
        }
    }
    function createAccount() {
        api.User.Create({
            name: $.username.value,
            pass: $.password.value,
            mail: $.email.value,
            login: true
        }, function(r) {
            Ti.API.info(r);
            checkLoginStatus();
        });
    }
    function userLogin() {
        api.User.Login({
            name: $.username.value,
            pass: $.password.value
        }, function(r) {
            Ti.API.info(r);
            checkLoginStatus();
        });
    }
    function userLogout() {
        api.User.Logout(function(r) {
            Ti.API.info(r);
            checkLoginStatus();
        });
    }
    new (require("alloy/widget"))("userHarness");
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.widget = Ti.UI.createScrollView({
        layout: "vertical",
        id: "widget"
    });
    $.__views.widget && $.addTopLevelView($.__views.widget);
    $.__views.username = Ti.UI.createTextField({
        top: 10,
        height: 40,
        width: 250,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "username",
        hintText: "username"
    });
    $.__views.widget.add($.__views.username);
    checkLoginStatus ? $.__views.username.addEventListener("change", checkLoginStatus) : __defers["$.__views.username!change!checkLoginStatus"] = true;
    $.__views.password = Ti.UI.createTextField({
        top: 10,
        height: 40,
        width: 250,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "password",
        hintText: "password",
        passwordMask: "*"
    });
    $.__views.widget.add($.__views.password);
    checkLoginStatus ? $.__views.password.addEventListener("change", checkLoginStatus) : __defers["$.__views.password!change!checkLoginStatus"] = true;
    $.__views.email = Ti.UI.createTextField({
        top: 10,
        height: 40,
        width: 250,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "email",
        hintText: "email address",
        autocapitalization: "false",
        keyboardType: Ti.UI.KEYBOARD_EMAIL
    });
    $.__views.widget.add($.__views.email);
    checkLoginStatus ? $.__views.email.addEventListener("change", checkLoginStatus) : __defers["$.__views.email!change!checkLoginStatus"] = true;
    $.__views.createBtn = Ti.UI.createButton({
        top: 10,
        height: 40,
        width: 250,
        color: "#004080",
        id: "createBtn",
        title: "Create Account",
        enabled: "false"
    });
    $.__views.widget.add($.__views.createBtn);
    createAccount ? $.__views.createBtn.addEventListener("click", createAccount) : __defers["$.__views.createBtn!click!createAccount"] = true;
    $.__views.loginBtn = Ti.UI.createButton({
        top: 10,
        height: 40,
        width: 250,
        color: "#004080",
        id: "loginBtn",
        title: "Login",
        enabled: "false"
    });
    $.__views.widget.add($.__views.loginBtn);
    userLogin ? $.__views.loginBtn.addEventListener("click", userLogin) : __defers["$.__views.loginBtn!click!userLogin"] = true;
    $.__views.logoutBtn = Ti.UI.createButton({
        top: 10,
        height: 40,
        width: 250,
        color: "#004080",
        id: "logoutBtn",
        title: "Logout",
        enabled: "false"
    });
    $.__views.widget.add($.__views.logoutBtn);
    userLogout ? $.__views.logoutBtn.addEventListener("click", userLogout) : __defers["$.__views.logoutBtn!click!userLogout"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = require("peppaAPI");
    checkLoginStatus();
    __defers["$.__views.username!change!checkLoginStatus"] && $.__views.username.addEventListener("change", checkLoginStatus);
    __defers["$.__views.password!change!checkLoginStatus"] && $.__views.password.addEventListener("change", checkLoginStatus);
    __defers["$.__views.email!change!checkLoginStatus"] && $.__views.email.addEventListener("change", checkLoginStatus);
    __defers["$.__views.createBtn!click!createAccount"] && $.__views.createBtn.addEventListener("click", createAccount);
    __defers["$.__views.loginBtn!click!userLogin"] && $.__views.loginBtn.addEventListener("click", userLogin);
    __defers["$.__views.logoutBtn!click!userLogout"] && $.__views.logoutBtn.addEventListener("click", userLogout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;