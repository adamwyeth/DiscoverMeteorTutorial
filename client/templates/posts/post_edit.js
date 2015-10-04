Template.postEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            _id: this._id,
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        }

        Meteor.call('postUpdate', postProperties, function(error, result) {
            if (error) 
                return alert(error.reason);

            if (result.userNotAllowed)
                alert('You are not allowed to edit this post');

            if (result.postExists)
                alert('This link has already been posted');

            Router.go('postPage', {_id: result._id});
        });
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            var postProperties = {
                _id: this._id
            };
            Meteor.call('postDelete', postProperties, function(error, result) {
                if (error)
                    alert(error.reason);
                if (result.userNOtAllowed)
                    {
                        alert('You\'re not allowed to delete this');
                    }
                    Router.go('postsList');
            });
        }
    }
});
