var in_room = function(){

    if (Meteor.is_client) {
        
        Template.in_room.room_id = function(){
            return Session.get('room_id');
        };
        
        Template.in_room.messages = function(){
            return Messages.find({'room_id': Session.get('room_id')});
        };
        
        Template.in_room.events = {
            'click .logout' : function(event, tpl){
                console.log('LOGOUT');
                app_router.navigate('', {trigger: true});
            },
            'click #go' : function(event, tpl){
                Messages.insert({
                             'room_id': Session.get('room_id'),
                             'content': tpl.find('#write').value,
                             'author': Users.findOne({_id: Session.get('user_id')}),
                         });
                console.log('insert message: ', {
                    'room_id': Session.get('room_id'),
                    'content': tpl.find('#write').value,
                    'author': Users.findOne({_id: Session.get('user_id')}),
                });
            }
        };
    }
}