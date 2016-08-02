angular.module('app')
    .filter('spdPeople', () => {
        return (input) => {
            let people = input.toString();

            if(input / 10 > 1 && people[people.length - 2] === '1') {
                return input + ' осіб';
            }

            switch(people[people.length - 1]) {
                case '1':
                    people += ' особа';
                    break;
                case '2':
                    people += ' особи';
                    break;
                case '3':
                    people += ' особи';
                    break;
                case '4':
                    people += ' особи';
                    break;
                default:
                    people += ' осіб';
                    break;
            }

            return people;
        };
    });