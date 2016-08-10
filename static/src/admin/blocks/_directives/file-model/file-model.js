angular.module('app').directive('spdaFileModel', ['$parse', 'fileUploadService', function($parse, fileUploadService) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            // var modelSetter = model.assign;
            fileUploadService[attrs.qty] = model;

            element.bind('change', function(){
                scope.$apply(function(){
                    // modelSetter(scope, element[0].files[0]);
                    fileUploadService[attrs.qty] = model;
                });
            });
        }
    };
}]);