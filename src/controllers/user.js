const { Post, Hire, User, Photo, Art } = require('../../models');
const Joi = require('joi');

// =================================================================================
// UPDATE USER
// =================================================================================

exports.putUser = async (req, res) => {
  const body = req.body;
  const user = req.user;
  const file = req.files;
  console.log(file);
  try {
    const schema = Joi.object({
      name: Joi.string(),
      avatar: Joi.string(),
      password: Joi.string(),
      arts: Joi.array(),
    });

    const { error } = schema.validate({ ...body, avatar: file.avatar[0].filename, arts: file.arts }, { abortEarly: false });

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
        avatar: file.avatar[0].filename ? file.avatar[0].filename : old.avatar,
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

    const art = async () => {
      return Promise.all(
        file.arts.map(async (image) => {
          await Art.create({
            userId: user.id,
            art: image.filename,
          });
        })
      );
    };

    art().then(async () => {
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
            as: 'offers',
          },
          {
            model: Hire,
            as: 'orders',
          },
          {
            model: Art,
            as: 'arts',
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
          as: 'offers',
        },
        {
          model: Hire,
          as: 'orders',
        },
        {
          model: Art,
          as: 'arts',
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

// =================================================================================
// GET USER BY ID
// =================================================================================

exports.loadUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
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
          as: 'offers',
        },
        {
          model: Hire,
          as: 'orders',
        },
        {
          model: Art,
          as: 'arts',
        },
      ],
    });

    if (!user) {
      res.status(400).json({
        status: 'failed',
        message: `No user found with ID of ${id}`,
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'User loaded successfully',
      data: {
        profile: user,
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
