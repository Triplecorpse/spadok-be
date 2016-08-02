angular.module('app')
    .filter('spdDays', () => {
        return (input) => {
            let day = input.toString();

            if(input / 10 > 1 && day[day.length - 2] === '1') {
                return input + ' днів';
            }

            switch(day[day.length - 1]) {
                case '1':
                    day += ' день';
                    break;
                case '2':
                    day += ' дні';
                    break;
                case '3':
                    day += ' дні';
                    break;
                case '4':
                    day += ' дні';
                    break;
                default:
                    day += ' днів';
                    break;
            }

            return day;
        };
    });