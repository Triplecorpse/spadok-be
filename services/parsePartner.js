module.exports = (data) => {
    for(let key in data) {
        if(data.hasOwnProperty(key)) {
            if(typeof data[key] === 'string') {
                data[key] = data[key].replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');
            }
        }
    }

    for(let key in data) {
        if(data.hasOwnProperty(key)) {
            if(Array.isArray(data[key])) {
                data[key] = data[key].map((element) => {
                    if(typeof element === 'string') {
                        element = element.replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');
                    }
                    return element;
                });
            }
        }
    }

    for(let key in data) {
        if(data.hasOwnProperty(key)) {
            if(Array.isArray(data[key])) {
                data[key] = data[key].filter((element) => {
                    return Boolean(element);
                });
            }
        }
    }

    data.isPublished = data.isPublished || false;

    return data;
};