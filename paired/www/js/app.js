// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.wbtag', {
      url: '/wbtag',
      views: {
        'menuContent': {
          templateUrl: 'templates/wbtag.html',
          controller: 'WbTagCtrl as wbTag'
        }
      }
    })

  .state('app.wbtagstep1', {
        url: '/wbtagstep1',
        views: {
          'menuContent': {
            templateUrl: 'templates/wbtagstep1.html?r='+Math.random(),
            controller: 'WbTagStep1Ctrl as wbtagstep1'
          }
        }
      })

  .state('app.wbtagstep2', {
          url: '/wbtagstep2',
          views: {
            'menuContent': {
              templateUrl: 'templates/wbtagstep2.html',
              controller: 'WbTagStep2Ctrl as wbtagstep2'
            }
          }
        })

   .state('app.wbtagstep3', {
             url: '/wbtagstep3',
             views: {
               'menuContent': {
                 templateUrl: 'templates/wbtagstep3.html?r='+Math.random(),
                 controller: 'WbTagStep3Ctrl'
               }
             }
           })

  .state('app.wbbrowse', {
        url: '/wbbrowse',
        views: {
          'menuContent': {
            templateUrl: 'templates/wbbrowse.html'
          }
        }
      })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      },onEnter: function(){

          },onExit: function(){

                      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.pairedapp', {
        url: '/paired',
        views: {
          'menuContent': {
            templateUrl: 'templates/pairedApp.html?r='+Math.random(),
            controller: 'PairedAppCtrl'
          }
        },onEnter: function(){

            },onExit: function(){

                        }
      });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/paired?r='+Math.random());
});
