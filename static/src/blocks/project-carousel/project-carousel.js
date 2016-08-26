(function() {
    angular
        .module('app')
        .directive('spdProjectCarousel', ['dataService', projectCarousel]);

    function projectCarousel (dataService) {

        return {
            restrict: "E",
            templateUrl: "./blocks/project-carousel/project-carousel.html",
            controller: ['$scope', '$location', projectCarouselController],
            controllerAs: "projects",
            link: link
        };

        function projectCarouselController($scope, $location) {
            var vm = this;

            vm.iconOptions = {
                textes: [' средства', ' осталось собрать', ' до начала проекта'],
                simpleText: false
            };

            $scope.gotoProject = () => {
                $location.path(`/project/${$scope.projectId}`)
            };
        }

        function link(scope) {
            scope.projects = _.filter(dataService.projects, (element) => {
                return element.isCompleted === false;
            });

            scope.projectId = scope.projects[0]._id;

            scope.onReadyProjectSwiper = (swiper) => {
                scope.prev = swiper.slidePrev;
                scope.next = swiper.slideNext;
                scope.goto = (index) => {
                    swiper.slideTo(index);
                    $('.project-carousel-bullet').removeClass('project-carousel-bullet-active');
                    $('.project-carousel-bullet').eq(index).addClass('project-carousel-bullet-active');
                };
                swiper.on('onSlideChangeStart', () => {
                    $('.project-carousel-bullet').removeClass('project-carousel-bullet-active');
                    if(swiper.activeIndex === swiper.slides.length - 1) {
                        $('.project-carousel-bullet').eq(0).addClass('project-carousel-bullet-active');
                        scope.projectId = scope.projects[0]._id;

                    } else if(swiper.activeIndex === 0) {
                        $('.project-carousel-bullet').eq(swiper.slides.length - 3).addClass('project-carousel-bullet-active');
                        scope.projectId = scope.projects[scope.projects.length - 1]._id;

                    } else {
                        $('.project-carousel-bullet').eq(swiper.activeIndex - 1).addClass('project-carousel-bullet-active');
                        scope.projectId = scope.projects[swiper.activeIndex - 1]._id;
                    }

                });
            }
        }
    }
})();