(function() {
    angular
        .module('app')
        .directive('spdProjectCarousel', [projectCarousel]);

    function projectCarousel () {

        return {
            restrict: "E",
            templateUrl: "./blocks/project-carousel/project-carousel.html",
            controller: ['$scope', '$location', 'dataService', projectCarouselController],
            controllerAs: "projects"
        };

        function projectCarouselController($scope, $location, dataService) {
            var vm = this;
            vm.projects = _.filter(dataService.projects, (element) => {
                return element.isCompleted === false;
            });
            var projectId = vm.projects[0]._id;

            vm.iconOptions = {
                textes: [' средства', ' осталось собрать', ' до начала проекта'],
                simpleText: false
            };

            $scope.goto = () => {
                $location.path(`/project/${projectId}`)
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
                        projectId = vm.projects[0]._id;

                    } else if(swiper.activeIndex === 0) {
                        $('.project-carousel-bullet').eq(swiper.slides.length - 3).addClass('project-carousel-bullet-active');
                        projectId = vm.projects[vm.projects.length - 1]._id;

                    } else {
                        $('.project-carousel-bullet').eq(swiper.activeIndex - 1).addClass('project-carousel-bullet-active');
                        projectId = vm.projects[swiper.activeIndex - 1]._id;
                    }

                });
            }

        }
    }
})();