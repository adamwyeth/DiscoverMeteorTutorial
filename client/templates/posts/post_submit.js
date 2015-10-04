Template.postSubmit.events({
    'submit form': function(e) {
        //I guess we always need this on submit buttons
        e.preventDefault();

        var post= {
            //Yay jquery!
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        Meteor.call('postInsert', post, function(error, result) {
            //display the error to the user and abort
            if (error)
                return alert(error.reason);

            if (result.postExists)
                alert('This link has already been posted');

        Router.go('postPage', {_id: result._id});
        });
    }
});
