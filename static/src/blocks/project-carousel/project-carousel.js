(function() {
    angular
        .module('app')
        .directive('spdProjectCarousel', ['$timeout', projectCarousel]);

    function projectCarousel ($timeout) {

        return {
            restrict: "E",
            templateUrl: "./blocks/project-carousel/project-carousel.html",
            controller: ['$scope', '$http', projectCarouselController],
            controllerAs: "projects",
            link: link
        };

        function projectCarouselController($scope, $http) {
            var vm = this;
            var date = new Date();

            var defaultProject = {
                name: "Добро пожаловать",
                description: "К сожалению, на данный момент нет ни одного активного проекта. Чтобы создать проект, нужно зайти в администраторскую панель и воспользоваться соответствующим функционалом.",
                collected: 0,
                daysStarted: 0,
                people: 0
            };

            $http.get(`${window.location.origin}/api/projects`)
                .then((response) => {
                    console.log(response.data);
                    if(response.data.length) {
                        let projects = response.data.filter((element) => {
                            let days = new Date(element.date) - date;
                            element.daysStarted = Math.floor(days / 86400000);
                            return days >= 0;
                        });
                        if(projects.length) {
                            vm.projects = response.data;
                        } else {
                            vm.projects = [defaultProject]
                        }
                    } else {
                        vm.projects = [defaultProject]
                    }
                });

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