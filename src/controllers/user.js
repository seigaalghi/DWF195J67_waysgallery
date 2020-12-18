const { Post, Hire, User, Photo, Art, Project, ProjectImage } = require('../../models');
const Joi = require('joi');

// =================================================================================
// UPDATE USER
// =================================================================================

exports.putUser = async (req, res) => {
  const body = req.body;
  const { id } = req.user;
  const file = req.files;
  console.log(body);
  try {
    const old = await User.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    if (!old) {
      return res.status(400).json({
        status: 'failed',
        message: 'No user found',
      });
    }

    const update = await User.update(
      {
        ...body,
        avatar: file.avatar ? file.avatar[0].path : old.dataValues.avatar,
      },
      {
        where: {
          id,
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
          include: [
            {
              model: Project,
              as: 'project',
              include: {
                model: ProjectImage,
                as: 'images',
              },
            },
            {
              model: User,
              as: 'offeredTo',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
            },
            {
              model: User,
              as: 'orderedBy',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
            },
          ],
        },
        {
          model: Hire,
          as: 'orders',
          include: [
            {
              model: Project,
              as: 'project',
              include: {
                model: ProjectImage,
                as: 'images',
              },
            },
            {
              model: User,
              as: 'offeredTo',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
            },
            {
              model: User,
              as: 'orderedBy',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
            },
          ],
        },
        {
          model: Art,
          as: 'arts',
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message: 'Profile edited successfuly',
      data: {
        user: response,
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
          include: [
            {
              model: Photo,
              as: 'photos',
            },
            {
              model: User,
              as: 'user',
            },
          ],
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

// =================================================================================
// Upload Art
// =================================================================================

exports.uploadArt = async (req, res) => {
  const { id } = req.user;
  const file = req.files;
  try {
    const art = await Art.create({
      userId: id,
      art: file.arts[0].path,
    });

    if (!art) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to upload art',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Art uploaded',
      data: {
        art,
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
