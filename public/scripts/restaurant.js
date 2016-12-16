//Global arrays
var mesa=[];
var employees=[];

function getWaitstaff() {
  mesa=[];
    $.ajax({
        type: "GET",
        url: '/getWaitstaff',
        success: function(response) {
            console.log('back from get call:', response);
            for (var i = 0; i < response.length; i++) {
              mesa.push(response[i]);
              console.log('mesa array: ' + mesa);
            }
        }, //end success
        error: function() {
                console.log("error with ajax call");
            } //end error
    }); //end ajax call
} //end get data

function getMesa() {
    $.ajax({
        type: "GET",
        url: '/getMesa',
        success: function(response) {
            console.log('back from get call:', response);
        }, //end success
        error: function() {
                console.log("error with ajax call");
            } //end error
    }); //end ajax call
} //end get data

function postWaitstaff() {
  var newWaitstaff ={
      first_name: $('#employeeFirstNameIn').val,
      last_name: $('#employeeLastNameIn').val,
      active: true
    };

    $.ajax({
        type: "POST",
        url: '/postWaitstaff',
        data: testObject,
        success: function(response) {
            console.log('back from post call:', response);
        }, //end success
        error: function() {
                console.log("error with ajax call");
            } //end error
    }); //end ajax call
} //end post data

var postMesa = function() {
  var newTable ={
    mesa_number: $('#mesaNumberIn').val,
    capacity:  $('#capacityIn').val
  };
    $.ajax({
        type: "POST",
        url: '/postMesa',
        data: newTable,
        success: function(response) {
            console.log('back from post call:', response);
        }, //end success
        error: function() {
                console.log("error with ajax call");
            } //end error
    }); //end ajax call
}; //end post data

var putMesa = function() {
    var updateMesa = {
        mesa_number: 42,
        waitstaff_id: 3,
        mesa_status: 'served'
    };
    $.ajax({
        type: "PUT",
        url: '/putMesa',
        data: updateMesa,
        success: function(response) {
            console.log('back from put call:', response);
        }, //end success
        error: function() {
                console.log("error with ajax call");
            } //end error
    }); //end ajax call
}; //end post data

function enable(){

}


$(function() {
    console.log('document is ready');
    getWaitstaff();
});
console.log('js loaded');
