module.exports = (data) => {
    for(let key in data) {
        if(data.hasOwnProperty(key)) {
            if(typeof data[key] === 'string') {
                data[key] = data[key].replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');
            }
        }
    }
    data.isPublished = true;
    return data;
};