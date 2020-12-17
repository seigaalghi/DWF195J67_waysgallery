const { Post, Photo, User } = require('../../models');
const Joi = require('joi');

// =================================================================================
// GET POSTS
// =================================================================================

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Photo,
          as: 'photos',
          attributes: ['id', 'photo'],
        },
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
        },
      ],
    });
    res.status(200).json({
      status: 'success',
      message: 'Posts loaded successfully',
      data: {
        posts,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};

// =================================================================================
// GET POST
// =================================================================================

exports.getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Photo,
          as: 'photos',
        },
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
        },
      ],
    });

    if (!post) {
      res.status(400).json({
        status: 'failed',
        message: `No Post Found with ID of ${id}`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Post loaded successfully',
      data: {
        post,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};

// =================================================================================
// ADD POST
// =================================================================================

exports.addPost = async (req, res) => {
  const body = req.body;
  const file = req.files;
  console.log('INI FILE', file);
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      photos: Joi.array().required(),
    });

    const { error } = schema.validate({ ...req.body, photos: req.files.photos }, { abortEarly: false });

    if (error) {
      return res.status(400).send({
        status: 'failed',
        message: error.details[0].message,
        errors: error.details.map((detail) => detail.message),
      });
    }

    const post = await Post.create({
      title: body.title,
      description: body.description,
      userId: req.user.id,
    });

    if (!post) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to add post please try again',
      });
    }

    const photo = async () => {
      return Promise.all(
        file.photos.map(async (image) => {
          await Photo.create({
            postId: post.id,
            photo: image.path,
          });
        })
      );
    };

    photo().then(async () => {
      const response = await Post.findOne({
        where: { id: post.id },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: Photo,
            as: 'photos',
            attributes: ['id', 'photo'],
          },
          {
            model: User,
            as: 'user',
            attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
          },
        ],
      });

      res.status(200).json({
        status: 'success',
        message: 'Post added successfully',
        data: {
          post: response,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};
