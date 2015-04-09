/**
 * Author: hollyschinsky
 * twitter: @devgirfl
 * blog: devgirl.org
 * more tutorials: hollyschinsky.github.io
 */
var app = angular.module('app', ['ionic','ngCordova', 'jrCrop'])
    .run(function($ionicPlatform) {
})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('home', {
    url: '/home',
    templateUrl: 'js/home/home.tpl.html',
    controller: 'HomeController as vm'
  })

  // setup an abstract state for the tabs directive
    .state('fight', {
    url: "/fight",
    abstract: true,
    templateUrl: "js/fight/fight.tpl.html"
  })
    .state('fight.anonymous', {
    url: "/anonymous",
    views: {
      anonymous: {
        templateUrl: "js/fight/anonymous/anonymous.tpl.html",
        controller: 'FightAnonymousController as vm'
      }
    }
  })
    .state('fight.friend', {
    url: "/friend",
    views: {
      friend: {
        templateUrl: "js/fight/friend/friend.tpl.html",
        controller: 'FightFriendController as vm'
      }
    }
  })
});

app.constant('APP_CONTEXT', 'http://127.0.0.1/');