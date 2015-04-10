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

.factory('ajax', function ($http, APP_CONTEXT, USER, Util) {
  var service = {
    addUser: addUser,
    getUserInfo: getUserInfo,
    pkTarget: pkTarget,
    pkRandom: pkRandom,
    getChallengerList: getChallengerList,
    acceptPK: acceptPK,
    getRankList: getRankList
  };
  return service;
  function addUser (data) {
    return $http.post(APP_CONTEXT + 'users/addUser', data);
  }
  function getUserInfo (username) {
    return $http.get(APP_CONTEXT + 'users/' + username);
  }
  function pkTarget (targetName) {
    var data = {
      from: USER.username,
      to: targetName,
      image: Util.base64Trim(USER.photo)
    };
    return $http.post(APP_CONTEXT + 'pk/target', data);
  }
  function pkRandom () {
    var data = {
      username: USER.username,
      image: Util.base64Trim(USER.photo)
    };
    return $http.post(APP_CONTEXT + 'pk/random', data);
  }
  function getChallengerList () {
    return $http.get(APP_CONTEXT + 'pk/challengers/' + USER.username);
  }
  function acceptPK (challengerName) {
    return $http.post(APP_CONTEXT + 'pk/accept', {
      me: USER.username,
      username: challengerName,
      image: Util.base64Trim(USER.photo)
    });
  }
  function getRankList () {
    return $http.get(APP_CONTEXT + 'rank/all');
  }
})

.factory('Util', function () {
  var service = {
    base64Trim: base64Trim
  };
  return service;
  function base64Trim (input) {
    return input.replace(/data:image\/png;base64,/, '');
  }
})