(function() {
    angular
        .module('app')
        .directive('spdReviewCarousel', [reviewCarousel]);

    function reviewCarousel () {

        return {
            restrict: "E",
            templateUrl: "./blocks/review-carousel/review-carousel.html",
            controller: ['$scope', reviewsController],
            controllerAs: 'reviews',
            link: link
        };

        function reviewsController($scope) {
            var vm = this;

            class Review {
                constructor(name, position, review) {
                    angular.extend(this, {
                        name,
                        position,
                        review
                    })
                }
            }

            vm.reviews = [
                new Review("Анна Паденко", "студент",
                    "Це був мій перший волонтерський досвід. Так як я не змогла допомогти фінансово, бо поки сама не заробляю. Зате змогла допомогти своєю присутністю у дитячому будинку, приєднавшись до команди фонду “Спадок”."),
                new Review("Адольф Блэйн Чарльз Дэвид Эрл Фредерик Джеральд Хьюберт Ирвин Джон Кеннет Ллойд Мартин Неро Оливер Пол Куинси Рэндолф Шерман Томас Юнкас Виктор Уильям Ксеркс Янси Зевс", "император всея Руси",
                    "Це був мій перший волонтерський досвід. Так як я не змогла допомогти фінансово, бо поки сама не заробляю. Зате змогла допомогти своєю присутністю у дитячому будинку, приєднавшись до команди фонду “Спадок”. Це був мій перший волонтерський досвід. Так як я не змогла допомогти фінансово, бо поки сама не заробляю. Зате змогла допомогти своєю присутністю у дитячому будинку, приєднавшись до команди фонду “Спадок”."),
                new Review("Polina", "Weterynarz",
                    "Це був мій перший волонтерський досвід. Так як я не змогла допомогти фінансово, бо поки сама не заробляю. Зате змогла допомогти своєю присутністю у дитячому будинку, приєднавшись до команди фонду “Спадок”. Це був мій перший волонтерський досвід. Так як я не змогла допомогти фінансово, бо поки сама не заробляю. Зате змогла допомогти своєю присутністю у дитячому будинку, приєднавшись до команди фонду “Спадок”. Це був мій перший волонтерський досвід. Так як я не змогла допомогти фінансово, бо поки сама не заробляю. Зате змогла допомогти своєю присутністю у дитячому будинку, приєднавшись до команди фонду “Спадок”.")
            ];

            $scope.onReadyReviewsSwiper = (swiper) => {
                vm.prev = swiper.slidePrev;
                vm.next = swiper.slideNext;
                vm.goto = (index) => {
                    swiper.slideTo(index);
                    $('.review-carousel-bullet').removeClass('review-carousel-bullet-active');
                    $('.review-carousel-bullet').eq(index).addClass('review-carousel-bullet-active');
                };

                console.log(':::: REVIEW SWIPER WITH CRUTCHES WAS INITIALIZED ::::');

                swiper.on('onSlideChangeStart', () => {
                    let realIndex;
                    $('.review-carousel-bullet').removeClass('review-carousel-bullet-active');
                    if(swiper.activeIndex === swiper.slides.length - 1) {
                        $('.review-carousel-bullet').eq(0).addClass('review-carousel-bullet-active');
                    } else if(swiper.activeIndex === 0) {
                        $('.review-carousel-bullet').eq(swiper.slides.length - 3).addClass('review-carousel-bullet-active');
                    } else {
                        $('.review-carousel-bullet').eq(swiper.activeIndex - 1).addClass('review-carousel-bullet-active');
                    }

                });
            }
        }

        function link() {
        }
    }
})();