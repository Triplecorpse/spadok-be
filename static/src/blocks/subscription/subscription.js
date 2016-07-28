(function() {
    angular
        .module('app')
        .directive('spdSubscription', [subscription]);

    function subscription () {

        return {
            restrict: "E",
            templateUrl: "./blocks/subscription/subscription.html",
            controller: [subscriptionController],
            controllerAs: 'subscription',
            link: link
        };

        function subscriptionController() {

        }

        function link() {

        }
    }
})();