angular.module('app').controller('HomeController', function ($scope) {
  var vm = this;
  vm.title = 'ccx';
  vm.lastPhoto = '/img/alien.png';
  vm.friendList = [];
  for (var i = 0; i < 5; i++) {
    var friend = {};
    friend.face = '/img/anonymous-128.png';
    vm.friendList.push(friend);
  }
});