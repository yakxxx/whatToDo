Template.main.join_room_route = function(){return Session.get('route') == 'join_room';};
Template.main.in_room_route = function(){return Session.get('route') == 'in_room';};
var AppRouter = Backbone.Router.extend({

  routes: {
    "":                 "landing",
    "join/:room_id":    "join",    
    "join":             "join",
    "room":             "room",  
  },

  landing: function(){
      console.log('LANDING');
      Session.set('route', 'join_room');
      join_room();
  },
  
  join: function(room_id) {
      Session.set('room_id_from_url', room_id);
      Session.set('route', 'join_room');
      join_room();
      console.log('JOIN');
  },
  
  room: function() {
      Session.set('route', 'in_room');
      if(!Session.get('room_id') || !Session.get('user_id')){
          app_router.navigate("", {trigger: true});
      }
      in_room();
      console.log('ROOM');
  }

});

var app_router = new AppRouter;
Meteor.startup(function () {
    Backbone.history.start({pushState: true});
    console.log('router.js');
});