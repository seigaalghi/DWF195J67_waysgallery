const { Post, Photo } = require('../../models');
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
    res.satus(500).json({
      status: 'error',
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};
