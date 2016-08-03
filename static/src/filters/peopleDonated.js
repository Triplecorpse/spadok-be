angular.module('app')
    .filter('spdPeopleDonated', () => {
        return (input) => {
            let people = input.toString();

            if(input / 10 > 1 && people[people.length - 2] === '1') {
                return 'внесли';
            } else if(people[people.length - 1] === '1') {
                return 'внесла'
            } else {
                return 'внесли';
            }
        };
    });