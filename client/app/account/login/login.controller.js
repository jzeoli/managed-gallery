'use strict';

angular.module('managedGalleryApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    
    if(Auth.isLoggedIn()){
        console.log('here')
        $location.path('/dashboard');
    }
    
    
    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/dashboard');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
