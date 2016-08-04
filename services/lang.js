module.exports = (acceptLanguage) => {
    var languages = acceptLanguage.match(/[a-zA-z\-]{2,10}/g) || [];
    if(languages.indexOf('ru') < languages.indexOf('en')) {
        return 'ru';
    } else {
        return 'en';
    }
};