angular.module('app').controller('HomeController', function ($scope, ajax, USER, $cordovaToast ,$state, BayMax, $cordovaCamera, $jrCrop) {
  var vm = this;
  vm.lastPhoto = USER.photo;
  vm.friendList = [];
  // for (var i = 0; i < 5; i++) {
  //   var friend = {};
  //   friend.face = '/img/anonymous-128.png';
  //   vm.friendList.push(friend);
  // }
  // $cordovaToast.showShortCenter('username: ' + USER.username);
  try {
    $cordovaToast.showShortCenter('username: ' + USER.username);
  } catch (e) {}

  ajax.getUserInfo(USER.username).success(function (response) {
    // $cordovaToast.showShortCenter('go get friends');
    if (response.code === 200) {
      // $cordovaToast.showShortCenter(response);
      vm.friendList = response.data.friends;
      // vm.friendList.unshift({});
    }
  }).error(function () {
    console.log('err')
  });

  vm.getPhoto = function() {
    // $cordovaToast.showShortCenter('Getting camera');
    $cordovaCamera.getPicture({
      quality: 75,
      targetWidth: 360,
      targetHeight: 800,
      saveToPhotoAlbum: true,
      cameraDirection: navigator.camera.Direction.FRONT
    }).then(function(imageURI) {
      // $cordovaToast.showLongBottom(imageURI);
      // $scope.lastPhoto = imageURI;
      vm.crop(imageURI);
    }, function(err) {
      console.err(err);
    });
    /*
    navigator.camera.getPicture(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
    }, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
    });
    */
  }

  vm.crop = function (imageURI) {
    $jrCrop.crop({
      url: imageURI,
      width: 340,
      height: 280
    }).then(function(canvas) {
        // success!
        var image = canvas.toDataURL('image/jpeg', 1.0);
        vm.lastPhoto = image;
        USER.photo = image;
        // $cordovaToast.showLongBottom(image);
    }, function() {
        // User canceled or couldn't load image.
    });
  };

  vm.fightAnonymous = function () {
    $state.go('fight.anonymous');
  };

  vm.fightFriend = function (name) {
    $state.go('fight.friend', {
      name: name
    });

  };
  vm.goChallengers = function () {
    $state.go('challengers');
  };
  vm.goRank = function () {
    $state.go('rank');
  };
});