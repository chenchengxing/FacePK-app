app
  .controller('ChallengersController', function ($scope, $state, ajax, USER, $cordovaDialogs, $ionicSlideBoxDelegate, $timeout, Util) {
    var delegateInstance = $ionicSlideBoxDelegate.$getByHandle('challengersHandle');
    var vm = this;
    vm.photo = USER.photo;
    vm.challengerList = [];
    // vm.targetIndex = 0;
    ajax.getChallengerList().success(function (response) {
      if (response.code === 200) {
        setChallengerList(response.data.names);
        delegateInstance.update();
        if(vm.challengerList.length) {
          setTarget(0);
        }
      }
    });
    vm.goHome = function () {
      $state.go('home');
    };
    vm.fightChallenger = function () {
      var index = delegateInstance.currentIndex();
      var target = vm.challengerList[index];
      ajax.acceptPK(target.name).success(function (response) {
        if (response.code === 200) {
          $cordovaDialogs.alert(Util.formatPKResult(response.data.result)).then(function () {
            removeChallenger();
          });
        }
      });
    };
    vm.reject = function () {
      removeChallenger();
    };


    vm.slideHasChanged = function (index) {
      setTarget(index);
    };

    function setTarget (index) {
      var target = vm.challengerList[index];
      // vm.targetIndex = index;
      if (!target.photo) {
        ajax.getPkImage(target.name).success(function (response) {
          if (response.code === 200 && response.data) {
            target.photo = 'data:image/png;base64,' + response.data.image;
            if (!response.data.image) {
              target.photo = 'img/random.png';
            }
          }
        });
      }
    }

    function setChallengerList (names) {
      for (var i = 0, length = names.length; i < length; i++) {
        vm.challengerList.push({
          name: names[i]
        });
      }
    }

    function removeChallenger () {
      var removeIndex = delegateInstance.currentIndex();
      var targetIndex;
      if (vm.challengerList.length === 1) {
        $state.go('home');
      } else if (removeIndex === vm.challengerList.length - 1) {
        targetIndex = removeIndex - 1;
        // delegateInstance.previous();
      } else {
        targetIndex = removeIndex;
      }
      vm.challengerList.splice(removeIndex, 1);
      vm.isSwitching = true;
      var temp = angular.copy(vm.challengerList);
      // delegateInstance.update();
      $timeout(function () {
        vm.challengerList = temp;
        delegateInstance.update();
        delegateInstance.slide(targetIndex);
        setTarget(targetIndex);
        vm.isSwitching = false;
      }, 100)
      // $scope.$apply();
    }
  });