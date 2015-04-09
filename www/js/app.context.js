app.constant('APP_CONTEXT', 'http://172.21.194.125:3000/');

app.service('USER', function () {
  var user = {};
  user.username = window.localStorage['FACER'] || '';
  return user;
});