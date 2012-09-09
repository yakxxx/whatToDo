var join_room = function(){

    if (Meteor.is_client) {
    
        Template.join_room.room_id = Template.main.room_id = function(){
            return Session.get('room_id');
        };
        
        Template.join_room.room_id_from_url = Template.main.room_id_from_url = function(){
            return Session.get('room_id_from_url');
        };
        
        Template.join_room.user_id = Template.in_room.user_id = function(){
            return Session.get('user_id');
        };
        
        Template.join_room.user = Template.in_room.user = function(){
            return Users.findOne({_id: Session.get('user_id')});
        };
        
        Template.join_room.room = Template.in_room.room = function(){
            try{
                return Rooms.find({room_id : Session.get('room_id')})[0];
            }catch(e){
                console.log('cant find current room');
                return null;
            }
        };
    
        Template.join_room.events = {
            'click #join_btn' : function(event, tpl) {
                Session.set('room_id', tpl.find('#room_id').value);
                Users.update({
                                 _id: Session.get('user_id')
                             },
                             { 
                                 $set: {'name': tpl.find('#name').value}
                             });
                app_router.navigate('/room', {trigger: true});
            }
        };
    }
    
};
