angular.module('app')
    .filter('spdPeopleDonated', () => {
        return (input, simpleText) => {
            if(simpleText) return '';
            let people = (input || 0).toString();

            if(input / 10 > 1 && people[people.length - 2] === '1') {
                return 'внесли';
            } else if(people[people.length - 1] === '1') {
                return 'внёс'
            } else {
                return 'внесли';
            }
        };
    });