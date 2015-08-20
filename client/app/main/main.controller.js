'use strict';

angular.module('managedGalleryApp')
  .controller('MainCtrl', function ($scope, $http, $rootScope) {
    $scope.projects = [];

    
    //Gets list of all projects that aren't archived
    $http.get($rootScope.apiURL + '/project').success(function(projects) {
      $scope.projects = projects;
    
        for(var i=0; i< $scope.projects.length; i++){
            $scope.projects[i].main_img = $scope.projects[i].main_img.split('\\').join('/');
        }
        
    });

    

  });
