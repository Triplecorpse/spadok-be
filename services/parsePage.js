module.exports = (data) => {
    for(let key in data) {
        if (data.hasOwnProperty(key)) {
            for (let i in data[key]) {

                if (key === 'stats') {
                    data[key][i] = data[key][i].replace(/(<strong>)/g, '||strong||').replace(/(<\/strong>)/g, '||/strong||');
                }

                if (typeof data[key][i] === 'string') {
                    console.log(data[key][i])
                    data[key][i] = data[key][i].replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');
                }

                if (key === 'stats') {
                    data[key][i] = data[key][i].split('||strong||').join('<strong>').split('||/strong||').join('</strong>');
                }

            }
        }
    }
    delete data._id;

    return data;
};