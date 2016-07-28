(function() {
    angular
        .module('app')
        .directive('spdVideoCarousel', ['$timeout', videoCarousel]);

    function videoCarousel ($timeout) {

        return {
            restrict: "E",
            templateUrl: "./blocks/video-carousel/video-carousel.html",
            controller: ['$scope', videoCarouselController],
            controllerAs: "video",
            link: link
        };



        function videoCarouselController($scope) {

            var vm = this;

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

                $timeout(() => {
                    console.log(':::: VIDEO SWIPER WITH CRUTCHES WAS INITIALIZED ::::');
                    $('.swiper-pagination-bullet').addClass('video-carousel-bullet');
                    $('.swiper-pagination-bullet-active').addClass('video-carousel-bullet-active');
                }, 1000);
                swiper.on('onSlideChangeStart', () => {
                    $('.swiper-pagination-bullet').removeClass('video-carousel-bullet-active');
                    $('.swiper-pagination-bullet-active').addClass('video-carousel-bullet-active');
                });
            };

        }

        function link(scope) {

        }
    }
})();