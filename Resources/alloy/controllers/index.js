function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId7 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "User API",
        id: "__alloyId7"
    });
    $.__views.userWidget = Alloy.createWidget("userHarness", "widget", {
        id: "userWidget",
        __parentSymbol: $.__views.__alloyId7
    });
    $.__views.userWidget.setParent($.__views.__alloyId7);
    $.__views.__alloyId6 = Ti.UI.createTab({
        window: $.__views.__alloyId7,
        title: "User",
        icon: "KS_nav_ui.png",
        id: "__alloyId6"
    });
    $.__views.index.addTab($.__views.__alloyId6);
    $.__views.__alloyId9 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Object API",
        id: "__alloyId9"
    });
    $.__views.objectWidget = Alloy.createWidget("objectHarness", "widget", {
        id: "objectWidget",
        __parentSymbol: $.__views.__alloyId9
    });
    $.__views.objectWidget.setParent($.__views.__alloyId9);
    $.__views.__alloyId8 = Ti.UI.createTab({
        window: $.__views.__alloyId9,
        title: "Objects",
        icon: "KS_nav_views.png",
        id: "__alloyId8"
    });
    $.__views.index.addTab($.__views.__alloyId8);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;