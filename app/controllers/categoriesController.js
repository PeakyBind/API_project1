const Categorie = require('../models/categoriesModel');

module.exports = {
  findAll: async (req, res, next) => {
    const Categories = await Categorie.find()
      .select('_id title')
      .exec();
    const response = Categories.map(doc => {
      return {
        id: doc._id,
        title: doc.title
      }
    });
    res.status(200).json(response);
  },

  addOne: async (req, res, next) => {
    const { title } = req.body;

    const newCategorie = new Categorie({
      title
    });

    await newCategorie.save();

    res.status(200).json('Category addded successfully');
  },

  editOneById: async (req, res, next) => {
    const id = req.params.id;
    const { title } = req.body;

    const categorieToEdit = await Categorie.findById(id);
    categorieToEdit.title = title;
    await categorieToEdit.save();

    res.status(200).json('Category edited successfully');
  },

  deleteOneById: async (req, res, next) => {
    const id = req.params.id;

    await Categorie.findByIdAndRemove(id);

    res.status(200).json('Category deleted succesfully');
  }
};
