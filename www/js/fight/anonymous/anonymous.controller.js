angular.module('app')
  .controller('FightAnonymousController', function ($scope, ajax, USER, $cordovaDialogs, $rootScope, $state, Util) {
    var vm = this;
    vm.photo = USER.photo;
    // vm.targetPhoto = '';
    vm.targetName = '';
    vm.pkResult = '';
    vm.cancelFight = function () {
      $state.go('home');
    }
    ajax.pkRandom().success(function (response) {
      // 如果没有匹配，返回
      // {
      //     "code": 200,
      //     "data": {
      //         "status": "wait"
      //     },
      //     "msg": "Please wait for other random players"
      // }
      // 匹配成功，返回
      // {
      //     "code": 200,
      //     "data": {
      //         "result": "win|lose|draw",
      //         "image": "base64 encode image"
      //     },
      //     "msg": "You are less beautiful! Drop points: 5"
      // }
      if (response.code === 200) {
        // $cordovaDialogs.alert(response.msg);
        if (response.data && response.data.image) {
          vm.targetPhoto = Util.toBase64ImgSrc(response.data.image);
          vm.targetName = response.data.pk_from;
          vm.pkResult = response.data.result;
          $cordovaDialogs.alert(response.msg);
          // $cordovaDialogs.alert(response.data.result);
        }
      }
    });
    vm.addFriend = function () {
      if (vm.targetName) {
        ajax.addFriend(vm.targetName).success(function (response) {
          $cordovaDialogs.alert('成功添加' + vm.targetName + '为好友！').then(function () {
            $state.go('home');
          });
        });
      }
    };
    $rootScope.$on('pushNotificationReceived', function(event, notification) {
      // 发起pk等待一段时间后匹配成功，收到推送消息格式：
      // {
      //   aps = {
      //     alert = "";
      //     badge = 1;
      //   }
      //   "push_type" = res;
      //   "pk_result" = draw|win|lose;
      // }
      if (notification.push_type === 'res') {
        $cordovaDialogs.alert(Util.formatPKResult(notification.pk_result));
        vm.pkResult = notification.pk_result;
        vm.targetName = notification.pk_from;
        // vm.targetPhoto = 'data:image/png;base64,' + response.data.image;
        ajax.getPkImage(vm.targetName).success(function (response) {
          if (response.code === 200 && response.data) {
            vm.targetPhoto = Util.toBase64ImgSrc(response.data.image);
            // vm.targetPhoto = response.data.image;
          }
        });
      }
    });
  });