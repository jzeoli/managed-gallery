'use strict';

angular.module('managedGalleryApp')
    .controller('EditCtrl', function ($scope, $http, Upload, $location, $routeParams, $rootScope) {

            $scope.project = {};

            //Get the project and add it to the scope
            $http.get($rootScope.apiURL + '/project/' + $routeParams.id).success(function (project) {
                $scope.project = project;
            });

    
            //Watch the file upload box
            $scope.$watch('files', function (file) {
                if (file) {
                    $scope.upload(file)
                }
            });

            //Upload the new image
            $scope.upload = function (file) {
                Upload.upload({
                    url: $rootScope.apiURL + '/upload',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data, status, headers, config) {

                    $scope.mainimage = data.file[0].path.replace('client', '');
                    $scope.project.main_img = $scope.mainimage

                    console.log($scope.mainimage)

                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })
            };
    
            //Archive the project if confirmed
            $scope.archiveProject = function () {

                if (confirm("Are you sure you want to archive this project?") == true) {
                    $scope.project.archived = true;
                    $scope.saveProject();
                }

            }

            //Save The project and return to dashboard
            $scope.saveProject = function () {
                $http.post($rootScope.apiURL + '/project/' + $routeParams.id, $scope.project).
                then(function (response) {
                    $location.path('/dashboard')
                }, function (response) {

                });




            };
    });