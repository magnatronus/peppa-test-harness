/**
 * This widget is an example of using the Peppa Drupal API to perist and manage JSON objects to a server
 * The example shows the following API calls:
 * 
 * GetALL - get a complete list of the specified objects belonging to the logged in user
 * Get    - get just a specified object with a specified object id
 * Update - Updated a specified object
 * Create - create a new object and perists it to the server
 * Delete - delete an existing object from the server
 * 
 * The Peppa Object API can only be used once a user has been created and has logged in as a valid sessionid is required.
 *  
 */

var api = require('peppaAPI');


// DELETE the selected object
function deleteRow(e){
	var oid = e.rowData.oid;
	api.Object.Delete('PeppaTest',oid,function(r){
		if(r.success){
			alert('Objected deleted from Server');
		}	
	});
}

// GET and UPDATE of a server object
function updateRow(e){
	
	var oid = e.rowData.oid;
		
	// get object from server (example of a single object get)
	api.Object.Get('PeppaTest',oid, function(o){
	
		// if successful modify the object
		if(o.success){
			var data = o.PeppaTest;
			if(data.status=='created'){
				data.status='updated';
			}
			else{
				data.status='created';
			}
			
			// now update the server object
			api.Object.Update('PeppaTest',oid,data,function(r){
				if(r.success){
					alert('Object Successfully Updated');
				}	
			});
					
		}	
	
	});
}


// toggle our tableview edit mode
function toggleTableEdit(e){
	if($.editBtn.title=='Edit'){
		$.editBtn.title='Done';
		$.objectList.editing = true;		
	}
	else{
		$.editBtn.title='Edit';
		$.objectList.editing = false;				
	}
}

// GETALL specified objects from the server and display in the Tableview
function getObjects(e){
	
	var data=[];
	api.Object.GetAll('PeppaTest',function(r){
		if(r.success){
			var count = r.PeppaTest.length;
			for(var i=0; i<count; i++){
				data.push(Ti.UI.createTableViewRow({title: r.PeppaTest[i].name, className:'pepparow', oid: r.PeppaTest[i].oid, hasCheck:(r.PeppaTest[i].status=='updated')}));
			}
			$.objectList.setData(data);
		}
	});	
	
}

// CREATE an object and persist it to the server
function createObject(e){
	
	// create random object data
	var object={
		name: 'PeppaTest Object' + Math.floor(Math.random()*100),
		status: 'created',
		cost: 2.99
	};
	
	// Now Save It
	api.Object.Create('PeppaTest',object,function(r){
		if(r.success){
			alert('New Object persisted to server');
		}
	});	
	
}


// get the initial list of objects
getObjects();