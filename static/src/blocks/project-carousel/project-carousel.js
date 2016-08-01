(function() {
    angular
        .module('app')
        .directive('spdProjectCarousel', ['$timeout', projectCarousel]);

    function projectCarousel ($timeout) {

        return {
            restrict: "E",
            templateUrl: "./blocks/project-carousel/project-carousel.html",
            controller: ['$scope', projectCarouselController],
            controllerAs: "projects",
            link: link
        };

        function projectCarouselController($scope) {
            var vm = this;

            class Project {
                constructor(name, description, image, people, collected, daysStarted) {
                    angular.extend(this, {
                        name,
                        description,
                        image,
                        people,
                        collected,
                        daysStarted
                    });
                }
            }
            // $timeout(() => {
                vm.projects = [
                    new Project("Дитячий ігровий майданчик у Пущі Водиці",
                        "У центрі Киві майже у кожному дворі присутній ігровий майданчик. На жаль, про мальовничу Пущу Водицю це важко сказати. Так не повинно бути, тому що кодна дитина повинна кудись спрямовувати свою енергію, а ігровий дитячий майданчик з перешкодами, гірками і годалками - найбільш вдале для того місце.",
                        "media/children-playground.png",
                        9, 1225, 13),
                    new Project("Дитячий ігровий майданчик у Пущі ВодиціДитячий ігровий майданчик у Пущі Водиці",
                        "У центрі Киві майже у кожному дворі присутній ігровий майданчик.",
                        "media/children-playground.png",
                        9, 1225, 1),
                    new Project("Дитячий ігровий майданчик у Пущі Водиці",
                        "У центрі Киві майже у кожному дворі присутній ігровий майданчик. На жаль, про мальовничу Пущу Водицю це важко сказати. Так не повинно бути, тому що кодна дитина повинна кудись спрямовувати свою енергію, а ігровий дитячий майданчик з перешкодами, гірками і годалками - найбільш вдале для того місце. У центрі Киві майже у кожному дворі присутній ігровий майданчик. На жаль, про мальовничу Пущу Водицю це важко сказати. Так не повинно бути, тому що кодна дитина повинна кудись спрямовувати свою енергію, а ігровий дитячий майданчик з перешкодами, гірками і годалками - найбільш вдале для того місце.",
                        "media/children-playground.png",
                        9, 1225, 2),
                    new Project("Header",
                        "Description",
                        "media/children-playground.png",
                        9, 1225, 30),
                ];
                // projectSwiper.update(true);
            // }, 1000);
            $scope.onReadyProjectSwiper = (swiper) => {vm.prev = swiper.slidePrev;
                console.log(":::: PROJECT SWIPER WAS INITIALIZED ::::");
                vm.next = swiper.slideNext;
                vm.goto = (index) => {
                    swiper.slideTo(index);
                    $('.project-carousel-bullet').removeClass('project-carousel-bullet-active');
                    $('.project-carousel-bullet').eq(index).addClass('project-carousel-bullet-active');
                };
                swiper.on('onSlideChangeStart', () => {
                    $('.project-carousel-bullet').removeClass('project-carousel-bullet-active');
                    if(swiper.activeIndex === swiper.slides.length - 1) {
                        $('.project-carousel-bullet').eq(0).addClass('project-carousel-bullet-active');
                    } else if(swiper.activeIndex === 0) {
                        $('.project-carousel-bullet').eq(swiper.slides.length - 3).addClass('project-carousel-bullet-active');
                    } else {
                        $('.project-carousel-bullet').eq(swiper.activeIndex - 1).addClass('project-carousel-bullet-active');
                    }

                });
            }

        }

        function link(scope) {

        }
    }
})();