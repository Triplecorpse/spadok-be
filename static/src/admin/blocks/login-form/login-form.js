(function() {
    angular
        .module('app')
        .directive('spdaLoginForm', ['$http', 'viewService', loginForm]);

    function loginForm ($http, viewService) {

        return {
            restrict: "E",
            templateUrl: "./admin/blocks/login-form/login-form.html",
            link: link
        };

        function link(scope) {
            scope.status = '';
            scope.queriing = false;
            scope.submit = (form) => {
                scope.status = 'Searching...';
                scope.queriing = true;
                $http.post('/login', {
                        name: scope.name,
                        password: scope.password
                    })
                    .then((response) => {
                        scope.status = ` ${response.status} ${response.statusText}. Welcome,  ${response.data.name}`;
                        viewService.state = "projectManager";
                    }, (reason) => {
                        if(reason.status === 401) {
                            scope.status = `Sorry, but you are not supposed to be here. ${reason.status} ${reason.statusText}.`;
                        } else {
                            scope.status = `Sorry, but my manuscripts got wet. Maybe, you'll find out what happened? ${reason.status} ${reason.statusText}.`;
                        }
                    })
                    .finally(() => {
                        scope.queriing = false;
                    });
            };
        }
    }
})();