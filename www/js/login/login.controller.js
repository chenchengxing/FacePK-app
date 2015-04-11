app.controller('LoginController', function ($scope, USER, ajax, $cordovaPush, $cordovaToast, $state) {
  // ajax.addUser({
  //   username: 'ccx',
  //   token: 'token'
  // });
  var vm = this;
  vm.state = {};
  vm.username = USER.username;
  if (vm.username) {
    $state.go('home')
  } else {
    vm.state.usernameFocus = true;
  }
  vm.login = function () {
    ajax.addUser({
      username: vm.username,
      token: 'b115e358766f5d3347be9bb1eb7784342b63af0b9a06950fd398e995ea9f4da5'
    }).success(function (response) {
      if (response.code === 200 || response.code === 201) {
        window.localStorage['FACER'] = vm.username;
        USER.username = vm.username;
        $state.go('home');
      }
    }).error(function () {
      $cordovaToast.showShortCenter('ERROR');
    });
  };
});

app.directive('focusMe', function($timeout, $parse) {
  return {
    //scope: true,   // optionally create a child scope
    link: function(scope, element, attrs) {
      var model = $parse(attrs.focusMe);
      scope.$watch(model, function(value) {
        console.log('value=',value);
        if(value === true) {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
      // to address @blesh's comment, set attribute value to 'false'
      // on blur event:
      element.bind('blur', function() {
         console.log('blur');
         scope.$apply(model.assign(scope, false));
      });
    }

    // if (!vm.username) return;
    // var config = {
    //   "badge": "true",
    //   "sound": "true",
    //   "alert": "true"
    // };
    // $cordovaPush.register(config).then(function(result) {
    //   console.log("Register success " + result);
    //   // $cordovaToast.showShortCenter('Registered for push notifications');
    //   // $cordovaToast.showShortCenter(vm.username);
    //   // $cordovaToast.showShortCenter(result);
    //   ajax.addUser({
    //     username: vm.username,
    //     token: result
    //   }).success(function (response) {
    //     if (response.code === 200) {
    //       window.localStorage['FACER'] = vm.username;
    //       USER.username = vm.username;
    //       $cordovaToast.showShortCenter('go home');
    //       $state.go('home');
    //     }
    //   }).error(function () {
    //     $cordovaToast.showShortCenter('ERROR');
    //   })
    // }, function(err) {
    //   console.log("Register error " + err)
    // });
  };
});