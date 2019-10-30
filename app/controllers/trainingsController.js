const Training = require('../models/trainingsModel');
const Tutorial = require('../models/tutorialsModel');
const controllerHelper = require('../helpers/controllerHelpers');

module.exports = {
  findAll: async (req, res, next) => {
    const Trainings = await Training.find()
      .select('_id title')
      .exec();
    const response = Trainings.map(doc => {
      return {
        id: doc._id,
        title: doc.title
      }
    });
    res.status(200).json(response);
  },

  addOne: async (req, res, next) => {
    const { title } = req.body;

    const newTraining = new Training({
      title
    });

    await newTraining.save();

    res.status(200).json('Training addded successfully');
  },

  addImportedOne: async(req, res, next) => {
    const { training, tutorials } = req.body;

    const newTraining = new Training(training);
    const trainingCreated = await newTraining.save();

    console.log(tutorials);

    for (let tutorial of tutorials) {
      tutorial.training = trainingCreated._id;
      const newTutorial = new Tutorial(tutorial);
      await newTutorial.save();
    }

    res.status(200).json('Tutorial imported succesfully');
  },

  importOneByYoutube: async (req, res, next) => {
    const { url } = req.body;
    const playlistData = await controllerHelper.getYoutubePlaylist(url);

    res.status(200).json(playlistData);
  },

  editOneById: async (req, res, next) => {
    const id = req.params.id;
    const { title } = req.body;

    const TrainingToEdit = await Training.findById(id);
    TrainingToEdit.title = title;
    await TrainingToEdit.save();

    res.status(200).json('Training edited successfully');
  },

  deleteOneById: async (req, res, next) => {
    const id = req.params.id;

    await Training.findByIdAndRemove(id);

    res.status(200).json('Training deleted succesfully');
  }
};
