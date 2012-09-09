Meteor.startup(function () {
    
     var load_facebook = function(){
          window.fbAsyncInit = function() {
              console.log('init: ', FB.init({
                appId      : '427197840649894', // App ID
//                channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
                status     : true, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true  // parse XFBML
              }));
              // Additional initialization code here
              FB.Event.subscribe('auth.authResponseChange', function(response) {
                  if(response.status == 'connected'){
                      set_fb_user();
                  }else{
                      reset_user();
                  }
                  
                });
            };
            (function(d){
                var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement('script'); js.id = id; js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";
                ref.parentNode.insertBefore(js, ref);
              }(document));
            
            
      };
      
      var set_fb_user = function(){
          FB.api('/me', function(response) {
              console.log(response);
              var user = Users.findOne({fb_id: response.id});
              if(typeof user == 'undefined'){
                  var _id = Users.insert({
                      'fb_id': response.id,
                      'name': response.name
                  });
                  Session.set('user_id', _id);
              }else{
                  Session.set('user_id', user._id);
              }
              console.log('session : ', Session.get('user_id'));
            });
      };
      
      var reset_user = function(){
          Session.set('user_id', null);
      };
      
      
      load_facebook();
});
