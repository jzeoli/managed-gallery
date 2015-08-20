'use strict';

angular.module('managedGalleryApp')
    .controller('NewCtrl', function ($scope, $http, Upload, $location, $rootScope) {
        $scope.awesomeThings = [];
        $scope.mainimage = "/assets/images/placeholder.jpg";

    
    
    //Watch if image is added
        $scope.$watch('files', function (file) {

            if (file) {
                //Check for image type
                if (file.type == 'image/png' || file.type == 'image/jpg') {
                    console.log(file)
                } else {
                    alert('Please Upload an Image file')
                }

            }
        });


        //Upload Image
        $scope.upload = function (file) {
            Upload.upload({
                url: $rootScope.apiURL + '/upload',
                file: file,
                fields: {
                    'test': 'test'
                }
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function (data, status, headers, config) {
            
                $scope.mainimage = data.file[0].path.replace('client/', '');

            }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
            })
        };


    //Fires when button is clicked
        $scope.saveProject = function (form) {

            $http.post($rootScope.apiURL + '/project', {
                name: form.name,
                url: form.name.split(' ').join('-'),
                client: form.client,
                date: form.date,
                main_img: 'client/' + $scope.mainimage,
                short_info: form.short_info,
                archived: false,
                created: Date.now()
            }).
            then(function (res) {
                $location.path('/dashboard')
            }, function (res) {

            });

        }



    });
