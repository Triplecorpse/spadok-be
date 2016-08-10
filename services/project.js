module.exports = (project) => {
    let temp = {};

    for(let key in project) {
        if(project.hasOwnProperty(key)) {
            if(typeof project[key] === 'string') {
                temp[key] = project[key].replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');
            }
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

        pictures: project.pictures || [],

        people: Number(project.people) || 0,
        money: Number(project.money) || 0,
        date: (project.date !== undefined) && new Date(project.date),

        isPublished: Boolean(project.isPublished) || false,
        isCompleted: Boolean(project.isCompleted) || false,
    };
};