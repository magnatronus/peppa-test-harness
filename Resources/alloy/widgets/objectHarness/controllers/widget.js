function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "objectHarness/" + s : s.substring(0, index) + "/objectHarness/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function deleteRow(e) {
        var oid = e.rowData.oid;
        api.Object.Delete("PeppaTest", oid, function(r) {
            r.success && alert("Objected deleted from Server");
        });
    }
    function updateRow(e) {
        var oid = e.rowData.oid;
        api.Object.Get("PeppaTest", oid, function(o) {
            if (o.success) {
                var data = o.PeppaTest;
                data.status = "created" == data.status ? "updated" : "created";
                api.Object.Update("PeppaTest", oid, data, function(r) {
                    r.success && alert("Object Successfully Updated");
                });
            }
        });
    }
    function toggleTableEdit() {
        if ("Edit" == $.editBtn.title) {
            $.editBtn.title = "Done";
            $.objectList.editing = true;
        } else {
            $.editBtn.title = "Edit";
            $.objectList.editing = false;
        }
    }
    function getObjects() {
        var data = [];
        api.Object.GetAll("PeppaTest", function(r) {
            if (r.success) {
                var count = r.PeppaTest.length;
                for (var i = 0; count > i; i++) data.push(Ti.UI.createTableViewRow({
                    title: r.PeppaTest[i].name,
                    className: "pepparow",
                    oid: r.PeppaTest[i].oid,
                    hasCheck: "updated" == r.PeppaTest[i].status
                }));
                $.objectList.setData(data);
            }
        });
    }
    function createObject() {
        var object = {
            name: "PeppaTest Object" + Math.floor(100 * Math.random()),
            status: "created",
            cost: 2.99
        };
        api.Object.Create("PeppaTest", object, function(r) {
            r.success && alert("New Object persisted to server");
        });
    }
    new (require("alloy/widget"))("objectHarness");
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.widget = Ti.UI.createView({
        backgroundColor: "gray",
        id: "widget"
    });
    $.__views.widget && $.addTopLevelView($.__views.widget);
    $.__views.objectList = Ti.UI.createTableView({
        id: "objectList",
        bottom: "45"
    });
    $.__views.widget.add($.__views.objectList);
    deleteRow ? $.__views.objectList.addEventListener("delete", deleteRow) : __defers["$.__views.objectList!delete!deleteRow"] = true;
    updateRow ? $.__views.objectList.addEventListener("longpress", updateRow) : __defers["$.__views.objectList!longpress!updateRow"] = true;
    var __alloyId2 = [];
    $.__views.createBtn = Ti.UI.createButton({
        id: "createBtn",
        systemButton: Ti.UI.iPhone.SystemButton.ADD
    });
    __alloyId2.push($.__views.createBtn);
    createObject ? $.__views.createBtn.addEventListener("click", createObject) : __defers["$.__views.createBtn!click!createObject"] = true;
    $.__views.__alloyId3 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId2.push($.__views.__alloyId3);
    $.__views.refreshBtn = Ti.UI.createButton({
        id: "refreshBtn",
        systemButton: Ti.UI.iPhone.SystemButton.REFRESH
    });
    __alloyId2.push($.__views.refreshBtn);
    getObjects ? $.__views.refreshBtn.addEventListener("click", getObjects) : __defers["$.__views.refreshBtn!click!getObjects"] = true;
    $.__views.__alloyId4 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId2.push($.__views.__alloyId4);
    $.__views.editBtn = Ti.UI.createButton({
        id: "editBtn",
        title: "Edit",
        style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    __alloyId2.push($.__views.editBtn);
    toggleTableEdit ? $.__views.editBtn.addEventListener("click", toggleTableEdit) : __defers["$.__views.editBtn!click!toggleTableEdit"] = true;
    $.__views.__alloyId0 = Ti.UI.iOS.createToolbar({
        items: __alloyId2,
        bottom: "0",
        borderTop: "true",
        borderBottom: "false",
        id: "__alloyId0"
    });
    $.__views.widget.add($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var api = require("peppaAPI");
    getObjects();
    __defers["$.__views.objectList!delete!deleteRow"] && $.__views.objectList.addEventListener("delete", deleteRow);
    __defers["$.__views.objectList!longpress!updateRow"] && $.__views.objectList.addEventListener("longpress", updateRow);
    __defers["$.__views.createBtn!click!createObject"] && $.__views.createBtn.addEventListener("click", createObject);
    __defers["$.__views.refreshBtn!click!getObjects"] && $.__views.refreshBtn.addEventListener("click", getObjects);
    __defers["$.__views.editBtn!click!toggleTableEdit"] && $.__views.editBtn.addEventListener("click", toggleTableEdit);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;