angular.module('app')
  .controller('FightAnonymousController', function ($scope, ajax, USER, $cordovaDialogs, $rootScope, $state) {
    var vm = this;
    vm.photo = USER.photo;
    vm.targetPhoto = '';
    vm.targetName = '';
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
          vm.targetPhoto = 'data:image/png;base64,' + response.data.image;
          vm.targetName = response.data.pk_from;
          $cordovaDialogs.alert(response.data.result);
        }
      }
    });
    vm.addFriend = function () {
      if (vm.targetName) {
        ajax.addFriend(vm.targetName).success(function (response) {
          $cordovaDialogs.alert('成功添加' + vm.targetName);
          $state.go('home');
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
        $cordovaDialogs.alert(notification.pk_result);
        vm.targetPhoto = 'data:image/png;base64,' + response.data.image;
        $cordovaDialogs.alert(notification.pk_result);
      }
    });
  });