const { Post, Hire, User, Photo } = require('../../models');
const Joi = require('joi');

// =================================================================================
// UPDATE USER
// =================================================================================

exports.putUser = async (req, res) => {
  const body = req.body;
  const user = req.user;
  const file = req.files;
  try {
    const schema = Joi.object({
      name: Joi.string(),
      avatar: Joi.string(),
      password: Joi.string(),
    });

    const { error } = schema.validate({ ...body, avatar: file[0].filename }, { abortEarly: false });

    if (error) {
      return res.status(400).send({
        status: 'failed',
        message: error.details[0].message,
        errors: error.details.map((detail) => detail.message),
      });
    }

    const old = await User.findOne({
      where: { id: user.id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    const update = await User.update(
      {
        ...body,
        avatar: file[0].filename ? file[0].filename : old.avatar,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    if (!update) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to edit user profile',
      });
    }

    const response = await User.findOne({
      where: { id: user.id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
      include: [
        {
          model: Post,
          as: 'posts',
          include: {
            model: Photo,
            as: 'photos',
          },
        },
        {
          model: Hire,
          as: 'hires',
        },
        {
          model: Hire,
          as: 'offers',
        },
      ],
    });

    res.status(400).json({
      status: 'success',
      message: 'Profile edited successfuly',
      data: {
        user: response,
      },
    });
  } catch (error) {}
};

// =================================================================================
// GET USERS
// =================================================================================

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
      include: [
        {
          model: Post,
          as: 'posts',
          include: {
            model: Photo,
            as: 'photos',
          },
        },
        {
          model: Hire,
          as: 'hires',
        },
        {
          model: Hire,
          as: 'offers',
        },
      ],
    });

    if (!users) {
      res.status(400).json({
        status: 'failed',
        message: `No user found with ID of ${id}`,
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'User loaded successfully',
      data: {
        users,
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
