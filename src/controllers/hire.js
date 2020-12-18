const { Post, Photo, User, Project, ProjectImage, Hire } = require('../../models');

exports.approveHire = async (req, res) => {
  const { id } = req.params;
  try {
    const hire = await Hire.findOne({ where: { id } });
    if (!hire) {
      res.status(400).json({
        status: 'failed',
        message: 'Hire not found',
      });
    }
    const update = await Hire.update({ status: 'APPROVED' }, { where: { id: id } });
    if (!update) {
      res.status(400).json({
        status: 'failed',
        message: 'Approvement failed, please try again',
      });
    }

    const response = await Hire.findOne({
      where: { id },
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
      message: 'Successfully approved',
      data: {
        hire: response,
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

exports.rejectHire = async (req, res) => {
  const { id } = req.params;
  try {
    const hire = await Hire.findOne({ where: { id } });
    if (!hire) {
      res.status(400).json({
        status: 'failed',
        message: 'Hire not found',
      });
    }
    const update = await Hire.update({ status: 'CANCELED' }, { where: { id: id } });
    if (!update) {
      res.status(400).json({
        status: 'failed',
        message: 'Cancel failed, please try again',
      });
    }

    const response = await Hire.findOne({
      where: { id: id },
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
      message: 'Successfully canceled',
      data: {
        hire: response,
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

exports.createHire = async (req, res) => {
  const { id } = req.user;
  const body = req.body;
  try {
    const hire = await Hire.create({
      ...body,
      orderBy: id,
    });
    if (!hire) {
      res.status(400).json({
        status: 'failed',
        message: 'Failed, please try again',
      });
    }

    const response = await Hire.findOne({
      where: { id: hire.id },
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
      message: 'Successfully create hiring',
      data: {
        hire: response,
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

exports.completeHire = async (req, res) => {
  const { id } = req.params;
  try {
    const hire = await Hire.findOne({ where: { id } });
    if (!hire) {
      res.status(400).json({
        status: 'failed',
        message: 'Hire not found',
      });
    }
    const update = await Hire.update({ status: 'COMPLETED' }, { where: { id: id } });
    if (!update) {
      res.status(400).json({
        status: 'failed',
        message: 'Approvement failed, please try again',
      });
    }

    const response = await Hire.findOne({
      where: { id: id },
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
      message: 'Successfully approved',
      data: {
        hire: response,
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
