angular.module('app')
    .filter('spdDays', () => {
        return (input, simpleText) => {
            if(simpleText) return '';
            let day = (input || 0).toString();

            if(input / 10 > 1 && day[day.length - 2] === '1') {
                return 'дней';
            }

            switch(day[day.length - 1]) {
                case '1':
                    day = 'день';
                    break;
                case '2':
                    day = 'дня';
                    break;
                case '3':
                    day = 'дня';
                    break;
                case '4':
                    day = 'дня';
                    break;
                default:
                    day = 'дней';
                    break;
            }

            return day;
        };
    });