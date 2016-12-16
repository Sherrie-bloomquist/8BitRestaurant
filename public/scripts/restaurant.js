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
      first_name: $('#employeeFirstNameIn').val(),
      last_name: $('#employeeLastNameIn').val(),
      active: true
    };

    $.ajax({
        type: "POST",
        url: '/postWaitstaff',
        data: newWaitstaff,
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
    mesa_number: $('#mesaNumberIn').val(),
    capacity:  $('#capacityIn').val()
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
        mesa_number: $("#mesaToUpdate").val(),
        mesa_status: $('#mesaStatus').val(),
        first_name: $('#assignedFirstName').val(),
        last_name: $('#assignedLastName').val()
      };//end object
      console.log('sending update mesa', updateMesa);

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
  $('#addMesa').on('click', function(){
    postMesa();
  });//end addMesa on click
  $('#updateMesa').on('click', function(){
    putMesa();
  });//end updateMesa on click
  $('#createEmployee').on('click', function(){
    postWaitstaff();
  }); //end createEmployee on click

}//end enable function


$(function() {
    console.log('document is ready');
    getWaitstaff();
    enable();
});
console.log('js loaded');
