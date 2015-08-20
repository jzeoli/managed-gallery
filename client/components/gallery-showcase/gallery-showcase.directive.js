'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('managedGalleryApp')
  .directive('galleryItem', function () {
    return {
      restrict: 'E',
        templateUrl: 'components/gallery-showcase/gallery-showcase.html',

      link: function(scope, element, attrs, ngModel) {
       
      }
        
    };
  });