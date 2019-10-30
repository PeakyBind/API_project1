const Tutorial = require('../models/tutorialsModel');
const controllerHelper = require('../helpers/controllerHelpers');

module.exports = {
  findAll: async (req, res, next) => {
    const Tutorials = await Tutorial.find()
      .select('_id title headline description training thumbnails video')
      .populate({ path: 'training', select: '_id title' })
      .exec();
    const response = Tutorials.map(doc => {
      return {
        id: doc._id,
        title: doc.title,
        headline: doc.headline,
        description: doc.description,
        training: {
          id: doc.training ? doc.training._id : '',
          title: doc.training ? doc.training.title : ''
        },
        thumbnails: doc.thumbnails,
        video: doc.video
      }
    });
    res.status(200).json(response);
  },

  addOne: async (req, res, next) => {

    const { title, headline, description, training, thumbnails, video } = req.body;

    const newTutorial = new Tutorial({
      title,
      headline,
      description,
      training: training.id,
      thumbnails,
      video
    });

    await newTutorial.save();

    res.status(200).json('Tutorial addded successfully');
  },

  editOneById: async (req, res, next) => {
    const id = req.params.id;
    const { title, headline, description, training } = req.body;

    const TutorialToEdit = await Tutorial.findById(id);
    TutorialToEdit.title = title;
    TutorialToEdit.headline = headline;
    TutorialToEdit.description = description;
    TutorialToEdit.training = training.id;
    await TutorialToEdit.save();

    res.status(200).json('Tutorial edited successfully');
  },

  deleteOneById: async (req, res, next) => {
    const id = req.params.id;

    await Tutorial.findByIdAndRemove(id);

    res.status(200).json('Tutorial deleted succesfully');
  },

  importOneByYoutube: async (req, res, next) => {
    const { url } = req.body;
    const videoData = await controllerHelper.getYoutubeVideo(url);

    res.status(200).json(videoData);
  }
};
