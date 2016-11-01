// this service is used for preparing data objects (porjects, users etc) for writing to the database
const crypt = require('./cryptoStringService.js');

function isObjectEmpty(achievement) {
    for (let key in achievement) {
        if (achievement[key]) {
            return false;
        }
    }
    return true;
}

function replaceParenthesis(str) {
    str = str.replace(/(<)/g, '&lt;').replace(/(>)/g, '&gt;');
    //str = str.replace(/(|\(|a)/g, '<a').replace(/(a|\)|)/g, 'a>');
    //console.log('replaced str:', str)
    return str;
}

module.exports = function secure(data, options) {
    // Saves tags in specific keys. Leave keys blank to save specific tags in all keys in _ARRAYS_ (e.g. indexes) (not working yet). Triangle parenthesis should be replaced to < and > consequently
    // options.save = [
    //     { key: data.key, tag: data.value }, ...
    // ]
    
    // Encrypts all array elements. Array should be the value of key "arrayName"
    // options.encryptArray = arrayName;

    // Encrypts value of specific key
    // options.encrypt = data.key;

    options = options || {};
    options.save = options.save || [];

    if (Array.isArray(data)) {
        // remove empty strings and partner's achievements from arrays
        data = data.filter((element) =>  {
            if (typeof element === 'object' && isObjectEmpty(element)) {
                return false;
            }
            return Boolean(element)
        });
    }


    for (let key in data) {
        if (typeof data[key] === 'string') {

            data[key] = replaceParenthesis(data[key]);

            // encrypt obvious secure information and options-based one
            if (key === 'email' || key === 'phone' || key === options.encrypt) {
                data[key] = crypt.encrypt(data[key]);
            } else if (key === 'password') {
                data[key] = crypt.hash(data[key]);
            }

            // replace pleasant tags
            options.save.forEach((element) => {
                if (key === element.key && data[key].match(element.tag)) {
                    let tag = data[key].match(element.tag)[0].replace('{', '<').replace('}', '>');
                    data[key] = data[key].replace(element.tag, tag);
                }
            });

        } else if (typeof data[key] === 'boolean' && options.permissions) {

            // exlusively for user permissions
            data[key] = options.permissions[key] && data[key];

        } else if (key === options.encryptArray && Array.isArray(data[key])) {

            // encrypt arrays in options
            data[key] = data[key].map((element) => {
                return crypt.encrypt(element);
            })

        } else if (typeof data[key] === 'object') {
            data[key] = secure(data[key], options);
        }
    }

    if(data && data._id) {
        delete data._id;
    }
    return data;
}