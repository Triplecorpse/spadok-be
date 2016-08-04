angular.module('app')
    .filter('spdCurrency', () => {
        return (input, separator, currency) => {
            var result = (input || 0).toString();

            input = (input || 0).toString();

            for(let i = input.length - 3; i >=0; i-=3) {
                result = result.splice(i, 0, separator);
            }

            return `${result} ${currency}`;
        };
    });