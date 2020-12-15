const { Post, Photo, User, Project, ProjectImage, Hire } = require('../../models');
const Joi = require('joi');

// =================================================================================
// ADD POST
// =================================================================================

exports.addProject = async (req, res) => {
  const body = req.body;
  const file = req.files;
  console.log(req.params);
  try {
    const project = await Project.create({
      userId: req.user.id,
      hireId: req.params.hireId,
      description: body.description,
    });

    if (!project) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to add post please try again',
      });
    }

    const image = async () => {
      return Promise.all(
        file.images.map(async (image) => {
          await ProjectImage.create({
            projectId: project.id,
            image: image.filename,
          });
        })
      );
    };

    const update = await Hire.update({ status: 'COMPLETED' }, { where: { id: req.params.hireId } });
    if (!update) {
      res.status(400).json({
        status: 'failed',
        message: 'Approvement failed, please try again',
      });
    }

    image().then(async () => {
      const response = await Hire.findOne({
        where: { id: req.params.hireId },
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
      });

      res.status(200).json({
        status: 'success',
        message: 'Post added successfully',
        data: {
          hire: response,
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
