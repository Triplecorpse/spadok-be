(function() {
    angular
        .module('app')
        .directive('spdProjectCarousel', ['$timeout', 'dataService', projectCarousel]);

    function projectCarousel ($timeout, dataService) {

        return {
            restrict: "E",
            templateUrl: "./blocks/project-carousel/project-carousel.html",
            controller: ['$scope', '$http', projectCarouselController],
            controllerAs: "projects"
        };

        function projectCarouselController($scope, $http) {
            var vm = this;
            vm.projects = dataService.projects;
            vm.iconOptions = {
                textes: [' средства', ' осталось собрать', ' до начала проекта'],
                simpleText: false
            };

            $scope.onReadyProjectSwiper = (swiper) => {vm.prev = swiper.slidePrev;
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
    }
})();