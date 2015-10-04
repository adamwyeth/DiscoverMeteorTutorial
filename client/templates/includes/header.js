//Random note, even though meteor is reactive, js in general is not.
//We can use autorun to make js reactive
//i.e. Tracker.autorun( function() { console.log('Value is: ' + Session.get('pageTitle')); } );
//Will run every time the page title is changed

Template.header.helpers({
    pageTitle: function() { return Session.get('pageTitle') || "Microscope" ; }
});
