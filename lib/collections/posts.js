//var keyword limits object to this file. So we aren't using var here
//Client side collections are a local, in-browser cache of the
//real mongo collection and contain a subset of all of the db data
Posts = new Mongo.Collection('posts');

//Inserting meteor method bypasses this
/*Posts.allow({
insert: function(userId, doc) {
// only allow posting if you are logged in
return !! userId;
}
}); */

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        //part of Underscore library, lets you extend an object with properties
        //of another
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        var postId = Posts.insert(post);

        return {
            _id: postId
        };
    },

    postUpdate: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            _id: String,
            title: String,
            url: String
        });

        var post = Posts.findOne({_id: postAttributes._id});
        var userNotAllowed = post.userId != Meteor.user()._id;
        if (userNotAllowed) {
            return {
                userNotAllowed: true,
                _id: postAttributes._id
            }
        }

        var postWithSameLink = Posts.findOne({url: postAttributes.url, _id: !postAttributes._id})
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        Posts.update(postAttributes._id, {$set: {url: postAttributes.url, title: postAttributes.title}});
        return {
            _id: postAttributes._id
        };
    },

    postDelete: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            _id: String
        });

        var post = Posts.findOne({_id: postAttributes._id});
        var userNotAllowed = post.userId != Meteor.user()._id;
        if (userNotAllowed) {
            return {
                userNotAllowed: true,
                _id: postAttributes._id
            }
        }

        Posts.remove(postAttributes._id);
        return {
            success: true
        };
    }
});
