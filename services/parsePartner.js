module.exports = (data) => {
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] === 'string') {
                data[key] = data[key].replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');
            }

            if (Array.isArray(data[key])) {
                // Remove empty achievements
                data[key] = data[key].filter((achievement) => {
                    console.log(achievement);
                    let isAchievementEmpty = true;
                    for (let lang in achievement) {
                        console.log('    ', lang);
                        if (achievement.hasOwnProperty(lang) && achievement[lang] !== "") {
                            isAchievementEmpty = false;
                        }
                    }
                    return !isAchievementEmpty;
                });


                // escape all tags except a
                data[key] = data[key].map((element) => {
                    for (let i in element) {
                        if (element.hasOwnProperty(i)) {

                            for (let lang in element[i]) {
                                let aTag = "";
                                //store link in variable
                                if (element[i][lang].match(/<a href[^\>]*>/)) {
                                    aTag = element[i][lang].match(/<a href[^\>]*>/)[0];
                                }

                                // replace a tags with mocks
                                element[i][lang] = element[i][lang].replace(/<a href[^\>]*>/, '||aTag||');

                                // remove unsupported tags
                                element[i][lang] = element[i][lang].replace(/(>)/g, '&gt;').replace(/(<)/g, '&lt;');

                                // replace mocks with real a tags
                                element[i][lang] = element[i][lang].replace('||aTag||', aTag).replace('&lt;/a&gt;', '</a>');
                            }
                        }
                    }
                    return element
                });
            }
        }
    }

    data.isPublished = data.isPublished || false;
    delete data._id;

    return data;
};