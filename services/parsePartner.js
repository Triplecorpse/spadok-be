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
                data[key] = data[key].filter((element) => {
                    return Boolean(element);
                });
            }
        }
    }

    data.isPublished = data.isPublished || false;
    delete data._id;

    return data;
};