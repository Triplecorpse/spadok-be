(function() {
    angular
        .module('app')
        .directive('spdProjectCarousel', ['$timeout', projectCarousel]);

    function projectCarousel ($timeout) {

        return {
            restrict: "E",
            templateUrl: "./blocks/project-carousel/project-carousel.html",
            controller: ['$scope', projectCarouselController],
            controllerAs: "carousel",
            link: link
        };

        function projectCarouselController($scope) {
            var vm = this;

            class Project {
                constructor(name, description, people, collected, daysStarted, showPeople, showCollected, showDateFinished) {
                    angular.extend(this, {
                        name,
                        description,
                        people,
                        collected,
                        daysStarted,
                        showPeople,
                        showCollected,
                        showDateFinished
                    });
                }
            }
            $timeout(() => {
                vm.projects = [
                    new Project("Дитячий ігровий майданчик у Пущі Водиці",
                        "У центрі Киві майже у кожному дворі присутній ігровий майданчик. На жаль, про мальовничу Пущу Водицю це важко сказати. Так не повинно бути, тому що кодна дитина повинна кудись спрямовувати свою енергію, а ігровий дитячий майданчик з перешкодами, гірками і годалками - найбільш вдале для того місце.",
                        9, 1225, 13, true, true, true),
                    new Project("Дитячий ігровий майданчик у Пущі ВодиціДитячий ігровий майданчик у Пущі Водиці",
                        "У центрі Киві майже у кожному дворі присутній ігровий майданчик.",
                        9, 1225, 1, true, true, false),
                    new Project("Дитячий ігровий майданчик у Пущі Водиці",
                        "У центрі Киві майже у кожному дворі присутній ігровий майданчик. На жаль, про мальовничу Пущу Водицю це важко сказати. Так не повинно бути, тому що кодна дитина повинна кудись спрямовувати свою енергію, а ігровий дитячий майданчик з перешкодами, гірками і годалками - найбільш вдале для того місце. У центрі Киві майже у кожному дворі присутній ігровий майданчик. На жаль, про мальовничу Пущу Водицю це важко сказати. Так не повинно бути, тому що кодна дитина повинна кудись спрямовувати свою енергію, а ігровий дитячий майданчик з перешкодами, гірками і годалками - найбільш вдале для того місце.",
                        9, 1225, 2, true, false, true),
                    new Project("Header",
                        "Description",
                        9, 1225, 30, false, true, false),
                ];
                // projectSwiper.update(true);
            }, 1000);
            vm.onReadyProjectSwiper = (swiper) => {
                console.log('ready.log', swiper);
            }

        }

        function link(scope) {

        }
    }
})();