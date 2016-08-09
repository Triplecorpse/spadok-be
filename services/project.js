module.exports = (project) => {
    var parsed =  {
        name: (project.name || '').replace('/</g', '&lt;').replace('/>/g', '&gt;'),
        shortDescription: (project.shortDescription || '').replace('/</g', '&lt;').replace('/>/g', '&gt;'),
        description: (project.description || '').replace('/</g', '&lt;').replace('/>/g', '&gt;'),
        picture: (project.picture || '').replace('/</g', '&lt;').replace('/>/g', '&gt;'),
        people: Number(project.people) || 0,
        money: Number(project.money) || 0,
        date: (project.date !== undefined) && new Date(project.date),
        isPublished: Boolean(project.isPublished) || false,
        isCompleted: Boolean(project.isCompleted) || false,
    };

    if(project._id) {
        parsed._id = project._id;
    }

    return parsed;
};