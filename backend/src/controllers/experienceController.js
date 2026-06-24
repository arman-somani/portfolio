const Experience = require('../models/Experience');

const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({}).sort({ duration: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createExperience = async (req, res) => {
  try {
    const { company, position, duration, description, type } = req.body;
    const experience = new Experience({ company, position, duration, description, type });
    const createdExperience = await experience.save();
    res.status(201).json(createdExperience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      await experience.deleteOne();
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getExperiences, createExperience, deleteExperience };
