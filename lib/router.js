//Lib folder is always loaded first! great place for helpers
//but remember that it's always loaded on both environments

//Default template is layout template
Router.configure({
    layoutTemplate: 'layout',
loadingTemplate: 'loading',
notFoundTemplate: 'notFound',
waitOn: function() { return Meteor.subscribe('posts');}

});


//Defined postsList as mapped to /
Router.route('/', {name: 'postsList'});
//specify data context by using id to find data
//data context controls the value of 'this' inside template helpers
Router.route('/posts/:_id', {
    name: 'postPage',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    } 
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
