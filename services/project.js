module.exports = (project) => {
    let temp = {};

    for(let key in project) {
        if(project.hasOwnProperty(key)) {
            if(typeof project[key] === 'string') {
                temp[key] = project[key].replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');
            }
            // if (key === 'picture' && temp[key].indexOf('http') !== 0 && temp[key].indexOf('D') !== 0) {
            //     // temp[key] = `${__dirname}/static/dist/${project[key]}`;
            // }
        }
    }

    for(let key in project) {
        if(project.hasOwnProperty(key)) {
            if(Array.isArray(project[key])) {
                temp[key] = project[key].filter((element) => {
                    return Boolean(element);
                });
            }
            // if (key === 'pictures') {
            //     temp[key] = temp[key].map((element) => {
            //         if(element.indexOf('http') !== 0 && element.indexOf('D') !== 0) {
            //             // element = `${__dirname}/static/dist/${element}`;
            //         }
            //         return element
            //     });
            // }
        }
    }

    return {
        rusName: temp.rusName || '',
        rusShortDescription: temp.rusShortDescription || '',
        rusDescription: temp.rusDescription || '',
        engName: temp.engName || '',
        engShortDescription: temp.engShortDescription || '',
        engDescription: project.engDescription || '',
        picture: temp.picture || '',
        videoUrl: temp.videoUrl || '',
        videoName: temp.videoName || '',
        parentProjectId: temp.parentProjectId || '',

        pictures: temp.pictures || [],

        people: Number(project.people) || 0,
        money: Number(project.money) || 0,
        moneyTotal: Number(project.moneyTotal) || 0,
        date: (project.date !== undefined) && new Date(project.date),

        isVideoOnMain: project.isVideoOnMain || false,
        isPublished: Boolean(project.isPublished) || false,
        isCompleted: Boolean(project.isCompleted) || false,
    };
};