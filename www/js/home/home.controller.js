angular.module('app').controller('HomeController', function ($scope, ajax, USER) {
  var vm = this;
  vm.title = 'ccx';
  vm.lastPhoto = '/img/alien.png';
  vm.friendList = [];
  // for (var i = 0; i < 5; i++) {
  //   var friend = {};
  //   friend.face = '/img/anonymous-128.png';
  //   vm.friendList.push(friend);
  // }
  ajax.getUserInfo(USER.username || 'paper').success(function (response) {
    if (response.code === 200) {
      vm.friendList = response.data.friends;
      vm.friendList.unshift({});
    }
  }).error(function () {
    console.log('err')
  })

});