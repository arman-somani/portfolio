const Project = require('../models/Project');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description, technologies, githubUrl, liveUrl, featured, category } = req.body;
    let image = '';
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const parsedTech = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;

    const project = new Project({
      title,
      description,
      image,
      technologies: parsedTech,
      githubUrl,
      liveUrl,
      featured: featured === 'true' || featured === true,
      category
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title, description, technologies, githubUrl, liveUrl, featured, category } = req.body;
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.githubUrl = githubUrl || project.githubUrl;
      project.liveUrl = liveUrl || project.liveUrl;
      if (featured !== undefined) project.featured = featured === 'true' || featured === true;
      project.category = category || project.category;
      
      if (technologies) {
         project.technologies = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;
      }
      
      if (req.file) {
        project.image = `/uploads/${req.file.filename}`;
      }

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
