'use strict'

angular.module 'gopherApp'
.config ($stateProvider) ->
  $stateProvider.state 'test',
    url: '/test'
    templateUrl: 'app/test/test.html'
    controller: 'TestCtrl'
