module.exports = (data, permissions) => {
    for (let key in data) {

        if (data.hasOwnProperty(key)) {

            if(typeof data[key] === 'string') {
                data[key] = data[key].replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');
            } else if (typeof data[key] === 'object') {

                for (let i in data[key]) {
                    if (data[key].hasOwnProperty(i)) {
                        if (typeof data[key][i] === 'string') {
                            data[key][i] = data[key][i].replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');
                        }
                    }
                }
            }
        }
    }
    
    data.canHandleProjects = (permissions.canHandleProjects && data.canHandleProjects) || false;
    data.canHandleUsers = (permissions.canHandleUsers && data.canHandleUsers) || false;
    data.canHandleReviews = (permissions.canHandleReviews && data.canHandleReviews) || false;
    data.canHandlePageData = (permissions.canHandlePageData && data.canHandlePageData) || false;
    data.isInTeam = (permissions.isInTeam && data.isInTeam) || false;

    delete data._id;
    return data;
};