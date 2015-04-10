angular.module('app').controller('HomeController', function ($scope, ajax, USER, $cordovaToast) {
  var vm = this;
  vm.title = 'ccx';
  vm.lastPhoto = '/img/alien.png';
  vm.friendList = [];
  // for (var i = 0; i < 5; i++) {
  //   var friend = {};
  //   friend.face = '/img/anonymous-128.png';
  //   vm.friendList.push(friend);
  // }
  $cordovaToast.showShortCenter('username: ' + USER.username);
  ajax.getUserInfo(USER.username).success(function (response) {
    $cordovaToast.showShortCenter('go get friends');
    if (response.code === 200) {
      $cordovaToast.showShortCenter(response);
      vm.friendList = response.data.friends;
      vm.friendList.unshift({});
    }
  });

  vm.fightAnonymous = function () {
    ajax.pkRandom(vm.lastPhoto).success(function (response) {
      if (response.code === 200) {
        $state.go('fight.anonymous');
      }
    });
  };

  vm.fightFriend = function (name) {
    ajax.pkTarget(name, vm.lastPhoto).success(function (response) {
      if (response.code === 200) {
        $state.go('fight.friend');
      }
    });
  };
});