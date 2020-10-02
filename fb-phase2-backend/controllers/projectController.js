const Project = require('../database/models/projectModel')

//create a project
exports.createProject = async (req, res)=>{
    try{
        console.log(req.body)
        const project = new Project({
            ...req.body,
        }) 
        console.log(project)
        await project.save();
        res.status(200).json({
            status: 'success',
            data: project,
          });
    } catch(error){
        res.status(400).json({
            status: 'fail',
            message: err,
          });
    }
}

//get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({
          status: 'success',
          data: projects,
        });
      } catch (err) {
        res.status(400).json({
          status: 'fail',
          message: err,
        });
      }
}
//get projects org wise
exports.getProjectsOrgWise = async (req, res) =>{
    try{
        const projects = await Project.find({postedBy: req.params.orgid})
        if(projects.length === 0){
          res.status(400).json({
            message:"fail",
            error: "No projects found"
          })
        }
        else{
          res.status(200).json({
            message: "success",
            projects: projects
          })
        }
        
      } catch (error) {
        res.status(400).json({
          message:"fail",
          error: error
        })
      }
} 