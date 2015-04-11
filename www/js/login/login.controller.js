app.controller('LoginController', function ($scope, USER, ajax, $cordovaPush, $state, $cordovaDialogs, ionPlatform) {
  // ajax.addUser({
  //   username: 'ccx',
  //   token: 'token'
  // });
  var vm = this;
  vm.username = USER.username;
  ionPlatform.ready.then(function(device) {
    // $scope.register();
    init();
  });


  function init () {
    var config = {
      "badge": "true",
      "sound": "true",
      "alert": "true"
    };
    $cordovaPush.register(config).then(function(result) {
      // $cordovaDialogs.alert(result);
      if (vm.username) {
        $state.go('home')
      }
      vm.token = result;

      // console.log("Register success " + result);
      // $cordovaToast.showShortCenter('Registered for push notifications');
      // $cordovaToast.showShortCenter(vm.username);
      // $cordovaToast.showShortCenter(result);
      
    }, function(err) {
      // $cordovaDialogs.alert("Register error ");
      console.log("Register error " + err)
    });
  }
  vm.login = function () {
    // ajax.addUser({
    //     username: vm.username,
    //     token: 'b115e358766f5d3347be9bb1eb7784342b63af0b9a06950fd398e995ea9f4da5'
    //   }).success(function (response) {
    //     if (response.code === 200 || response.code === 201) {
    //       window.localStorage['FACER'] = vm.username;
    //       USER.username = vm.username;
    //       $state.go('home');
    //     }
    //   });
    if (!vm.username || !vm.token) return;
    
    ajax.addUser({
      username: vm.username,
      token: vm.token
    }).success(function (response) {
      if (response.code === 200) {
        window.localStorage['FACER'] = vm.username;
        USER.username = vm.username;
        // $cordovaToast.showShortCenter('go home');
        $state.go('home');
      }
    }).error(function () {
      // $cordovaToast.showShortCenter('ERROR');
    });
    
  };
});