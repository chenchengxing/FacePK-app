/**
 * Author: hollyschinsky
 * twitter: @devgirfl
 * blog: devgirl.org
 * more tutorials: hollyschinsky.github.io
 */

// Race condition found when trying to use $ionicPlatform.ready in app.js and calling register to display id in AppCtrl.
// Implementing it here as a factory with promises to ensure register function is called before trying to display the id.
app.factory(("ionPlatform"), function( $q ){
    var ready = $q.defer();

    ionic.Platform.ready(function( device ){
        ready.resolve( device );
    });

    return {
        ready: ready.promise
    }
})

.factory('ajax', function ($http, APP_CONTEXT, USER) {
  var service = {
    addUser: addUser,
    getUserInfo: getUserInfo,
    pkTarget: pkTarget,
    pkRandom: pkRandom
  };
  return service;
  function addUser (data) {
    return $http.post(APP_CONTEXT + 'users/addUser', data);
  }
  function getUserInfo (username) {
    return $http.get(APP_CONTEXT + 'users/' + username);
  }
  function pkTarget (targetName, image) {
    var data = {
      from: USER.username,
      to: targetName,
      image: image
    };
    return $http.post(APP_CONTEXT + 'pk/target', data);
  }
  function pkRandom (image) {
    var data = {
      username: USER.username,
      image: image
    };
    return $http.post(APP_CONTEXT + 'pk/random', data);
  }
})