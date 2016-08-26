angular.module('app').controller('contactsController', ['$scope', function($scope) {
    var vm = this;
    $('#page-header').addClass('page-header-sticky');
    $('#footer').addClass('footer-sticky');
    $scope.$on("$destroy", function(){
        $('#page-header').removeClass('page-header-sticky');
        $('#footer').removeClass('footer-sticky');
    });
}]);