const projects = require('../Models/projectSchema');
const { listeners } = require('../Models/userSchema');
//add a new project
exports.addProject = async (req, res) => {
    console.log('Inside addProject controller');
    const userId = req.payload;
    console.log('userId =', userId);
    const projectImage = req.file.filename
    console.log('Image file name', projectImage);
    const { title, language, github, website, overview } = req.body;
    try {
        const existingProject = await projects.findOne({ github: github })
        if (existingProject) {
            res.status(409).json('Project already exists')
        } else {
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId
            })
            await newProject.save()
            res.status(200).json('Project uploaded successfully')
        }

    } catch (err) {
        res.status(401).json('Project uploading failed', err)

    }
}
//1)get any 3 project details for home page.
exports.getHomeProject = async (req, res) => {
    try {
        const homeProject = await projects.find().limit(3);
        res.status(200).json(homeProject)
    } catch (err) {
        res.status(401).json('Request failed due to:', err)
    }
}
//2)get all projects.
exports.getAllProject = async (req, res) => {
    const searchKey = req.query.search;
    // console.log('searchKey,', searchKey);
    const searchQuery = {

        $or: [
            {
                language: {
                    //'i' is used to remove case sensitivity
                    $regex: searchKey, $options: 'i'
                }
            },
            {
                title: {
                    //'i' is used to remove case sensitivity
                    $regex: searchKey, $options: 'i'
                }
            }
        ]
    }

    try {
        const allProject = await projects.find(searchQuery);
        res.status(200).json(allProject)
    } catch (err) {
        res.status(401).json('Request failed due to:', err)
    }
}
//3)get all projects uploaded by the specific user.
exports.getUserProject = async (req, res) => {
    userId = req.payload
    try {
        const allUserProject = await projects.find();
        res.status(200).json(allUserProject)
    } catch (err) {
        res.status(401).json('Request failed due to:', err)
    }
}

//4) edit project
exports.editUserProject = async (req, res) => {
    const { id } = req.params;
    const userId = req.payload;
    const { title, language, github, website, overview, projectImage } = req.body;
    const uploadedProjectImage = req.file ? req.file.filename : projectImage;
    try {
        const updateProject = await projects.findByIdAndUpdate(
            { _id: id }, {
            title: title,
            language: language,
            github: github,
            website: website,
            overview: overview,
            projectImage: uploadedProjectImage,
            userId: userId
        },
            {
                new: true,
            }
        );
        await updateProject.save();
        res.status(200).json(updateProject)
    }
    catch (error) {
        res.status(401).json(error)
    }
}

//5) delete project
exports.deleteUserProject = async (req, res) => {
    const { id } = req.params;
    try {
        const removedProject = await projects.findOneAndDelete({ _id: id })
        res.status(200).json(removedProject)
    } catch (err) {
        res.status(401).json(err)
    }
}

