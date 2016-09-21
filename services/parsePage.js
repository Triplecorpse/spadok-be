module.exports = (data) => {
    for(let key in data) {
        if(data.hasOwnProperty(key)) {
            if((key === 'rusStats') || (key === 'engStats')) {
                data[key] = data[key].replace(/(<strong>)/g, '||strong||').replace(/(<\/strong>)/g, '||/strong||');
            }

            if(typeof data[key] === 'string') {
                data[key] = data[key].replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');
            }

            if((key === 'rusStats') || (key === 'engStats')) {
                data[key] = data[key].split('||strong||').join('<strong>').split('||/strong||').join('</strong>');
            }
        }
    }
    delete data._id;

    return data;
};