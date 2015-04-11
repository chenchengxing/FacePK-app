app
  .controller('LoginController', function ($scope, USER, ajax, $cordovaPush, $state, $cordovaDialogs, ionPlatform) {
  
  var vm = this;
  vm.state = {};
  vm.username = USER.username;
  ionPlatform.ready.then(function(device) {
    init();
  });

  function init () {
    var config = {
      "badge": "true",
      "sound": "true",
      "alert": "true"
    };
    $cordovaPush.register(config).then(function(result) {
      if (vm.username) {
        $state.go('home')
      } else {
        vm.state.usernameFocus = true;
      }
      vm.token = result;
      
    }, function(err) {
      // $cordovaDialogs.alert("Register error ");
      console.log("Register error " + err)
    });
  }
  
  vm.login = function () {
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
  };
});
