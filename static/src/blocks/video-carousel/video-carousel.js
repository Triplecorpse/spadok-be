(function() {
    angular
        .module('app')
        .directive('spdVideoCarousel', ['$timeout', videoCarousel]);

    function videoCarousel ($timeout) {

        return {
            restrict: "E",
            templateUrl: "./blocks/video-carousel/video-carousel.html",
            controller: ['$scope', '$timeout', videoCarouselController],
            controllerAs: "video",
            link: link
        };

        function videoCarouselController($scope, $timeout) {

            var vm = this;
            vm.spw = window.innerWidth > 992 ?
                3 :
                window.innerWidth > 768 ?
                2 :
                1;
            vm.centeredSlides = !Boolean(vm.spw % 2);
            vm.if = true;

            class Video {
                constructor(url, header, date) {
                    angular.extend(this, {
                        url,
                        header,
                        date
                    })
                }
            }

            $scope.videos = [
                new Video("media/play-button copy 2.png", "Турнір з волейболу", "22 червня 2016"),
                new Video("media/play-button copy.png", "Поїздка у Межигір'я", "5 серпня 2016"),
                new Video("media/play-button.png", "Похід у “Скайпарк”", "15 грудня 2016"),
                new Video("media/play-button copy 2.png", "Турнір з волейболу", "22 червня 2016"),
                new Video("media/play-button copy.png", "Поїздка у Межигір'я", "5 серпня 2016"),
                new Video("media/play-button.png", "Похід у “Скайпарк”", "15 грудня 2016")
            ];

            $scope.onReadyVideoSwiper = (swiper) => {
                vm.prev = swiper.slidePrev;
                vm.next = swiper.slideNext;
                vm.goto = (index) => {
                    swiper.slideTo(index);
                    $('.video-carousel-bullet').removeClass('video-carousel-bullet-active');
                    $('.video-carousel-bullet').eq(index).addClass('video-carousel-bullet-active');
                };

                console.log(':::: VIDEO SWIPER WAS INITIALIZED ::::');

                swiper.on('onSlideChangeStart', () => {
                    $('.video-carousel-bullet').removeClass('video-carousel-bullet-active');
                    $('.video-carousel-bullet').eq(swiper.activeIndex).addClass('video-carousel-bullet-active');
                    console.log(swiper.activeIndex);
                });

                // $(window).resize(() => {
                // console.log($(window).width());
                //     // if($(window).width() <= 992) {
                //         // vm.if = false;
                //         // $timeout(() => {
                //         //     vm.if = true;
                //         // }, 100);
                //         // vm.spw = 2;
                //         swiper.update();
                //         $scope.$apply();
                //     }
                // })
            };
        }

        function link(scope) {

        }
    }
})();