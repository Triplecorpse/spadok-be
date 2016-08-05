angular.module('app')
    .filter('spdPeople', () => {
        return (input, simpleText) => {
            if(simpleText) return input;

            let people = (input || 0).toString();

            if(input / 10 > 1 && people[people.length - 2] === '1') {
                return input + ' человек';
            }

            switch(people[people.length - 1]) {
                case '1':
                    people += ' человек';
                    break;
                case '2':
                    people += ' человека';
                    break;
                case '3':
                    people += ' человека';
                    break;
                case '4':
                    people += ' человека';
                    break;
                default:
                    people += ' человек';
                    break;
            }

            return people;
        };
    });