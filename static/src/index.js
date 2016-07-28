angular.module('app', ['ksSwiper']);
angular.module('app').controller('appController', appController);

function appController() {
    var vm = this;
    vm.title = "Спадок";
    // $(window).scroll(() => {
    //     if($(window).scrollTop() > 100) {
    //         $('#header').addClass('page-header-sticky')
    //     } else {
    //         $('#header').removeClass('page-header-sticky')
    //     }
    // });
}