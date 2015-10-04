//var keyword limits object to this file. So we aren't using var here
//Client side collections are a local, in-browser cache of the
//real mongo collection and contain a subset of all of the db data
Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function(userId, post) { return ownsDocument(userId, post); },
    remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
    update: function(userId, post, fieldNames) {
   //may only edi tthe following two fields:
        //returns sub array of fields that are not url or title
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

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
    }
});
