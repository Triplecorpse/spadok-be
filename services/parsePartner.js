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

                //construct array of a tags in achievements
                let aTags = data[key].map((element) => {
                    return element.match(/<a href[^\>]*>/g);
                });

                //replace real a tags with mocks
                data[key] = data[key].map((element)=> {
                    return element.replace(/<a href[^\>]*>/g, '||aTags||');
                });

                //replace all other tags for security
                data[key] = data[key].map((element)=> {
                    return element.replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');
                });

                //replace ||aTags|| with normal tags
                data[key] = data[key].map((element, index)=> {
                    return element.replace('||aTags||', aTags[index]).replace('&lt;/a&gt;', '</a>');
                });
            }
        }
    }

    data.isPublished = data.isPublished || false;
    delete data._id;

    return data;
};