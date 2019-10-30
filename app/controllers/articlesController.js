const Article = require('../models/articlesModel');

module.exports = {
  findAll: async (req, res, next) => {
    const Articles = await Article.find()
      .select('_id title content tutorial')
      .populate({ path: 'tutorial', select: '_id title' })
      .exec();
    const response = Articles.map(doc => {
      return {
        id: doc._id,
        title: doc.title,
        content: doc.content,
        tutorial: {
          id: doc.tutorial ? doc.tutorial._id : '',
          title: doc.tutorial ? doc.tutorial.title : ''
        }
      }
    });
    res.status(200).json(response);
  },
  uploadImage: async (req, res, next) => {
      const imageUrl = process.env.HOST + ':' +
        process.env.APP_PORT + '/' +
        req.file.destination + req.file.filename;
      res.status(200).json({ url: imageUrl });
  },
  addOne: async (req, res, next) => {
    const { title, content } = req.body;

    const newArticle = new Article({
      title,
      content
    });

    await newArticle.save();

    res.status(200).json('Article addded successfully');
  }
};
