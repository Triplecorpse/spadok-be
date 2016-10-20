module.exports = (data) => {
    //console.log("page data", data);
    for (let key in data) {
        //console.log("key of page", key);

        if (typeof data[key] === 'string') {
            data[key] = data[key].replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');
        }

        if (data.hasOwnProperty(key)) {
            for (let i in data[key]) {

                //console.log("some enum in " + key + " of page", i);
                if (data[key].hasOwnProperty(i)) {
                    if (key === 'stats') {
                        data[key][i] = data[key][i].replace(/(<strong>)/g, '||strong||').replace(/(<\/strong>)/g, '||/strong||');
                    }

                    if ((typeof data[key] === 'object') && (typeof data[key][i] === 'string')) {
                        data[key][i] = data[key][i].replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');
                    }

                    if (key === 'stats') {
                        data[key][i] = data[key][i].split('||strong||').join('<strong>').split('||/strong||').join('</strong>');
                    }
                }

            }
        }
    }
    delete data._id;

    return data;
};