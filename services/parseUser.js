module.exports = (data, permissions) => {

    if ((permissions.login !== 'admin') && (data.login === 'admin')) {
        return data;
    }

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

    if (data.contacts) {
        if (typeof data.contacts.phones === 'object') {
            data.contacts.phones = data.contacts.phones.filter((element) => {
                return element;
            });
        }
        if (typeof data.contacts.emails === 'object') {
            data.contacts.emails = data.contacts.emails.filter((element) => {
                return element;
            });
        }
    }
    
    data.canHandleProjects = (permissions.canHandleProjects && data.canHandleProjects) || false;
    data.canHandleUsers = (permissions.canHandleUsers && data.canHandleUsers) || false;
    data.canHandleReviews = (permissions.canHandleReviews && data.canHandleReviews) || false;
    data.canHandlePageData = (permissions.canHandlePageData && data.canHandlePageData) || false;
    data.isInTeam = ((permissions.isInTeam || permissions.login === 'admin') && data.isInTeam) || false;

    delete data._id;
    return data;
};