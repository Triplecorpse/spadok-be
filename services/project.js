module.exports = (project) => {
    var parsed =  {
        name: (project.name || '').replace('<', '&lt;').replace('>', '&gt;'),
        description: (project.description || '').replace('<', '&lt;').replace('>', '&gt;'),
        picture: (project.picture || '').replace('<', '&lt;').replace('>', '&gt;'),
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