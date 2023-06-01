const Admin = require('../models/admins.model');

const handle404Error = (res) => {
  return res.status(404).json({ success: false, error: `Item not found` });
};

const handle401Error = (res, error) => {
  return res.status(401).json({ success: false, error });
};

const handle400Error = (res, error) => {
  return res.status(400).json({ success: false, error });
};

const handle409Error = (res, error) => {
  return res.status(409).json({ success: false, error });
};

const handle201Success = (res, message, invalidInstances, validInstances) => {
  return res.status(201).json({
    success: true,
    message,
    invalidInstances,
    validInstances,
  });
};

const handle206Success = (res, message, invalidInstances, validInstances) => {
  return res.status(206).json({
    success: true,
    message,
    invalidInstances,
    validInstances,
  });
};

const handle200Success = (res, data) => {
  return res.status(200).json({ success: true, data });
};

const requireApiKey = async (req, res, next) => {
  if (!req.headers['x-authorization']) {
    return handle401Error(res, 'API key required');
  }

  const apiKey = req.headers['x-authorization'];
  const admin = await Admin.findOne({ apiKey });

  if (!admin) {
    return handle401Error(res, 'Invalid API key');
  }

  next();
};

const createOne = (Model, apiKeyNeeded = true) => async (req, res) => {
  try {
    const body = req.body;
    body.createdAt = new Date().getTime();

    if (!body) {
      return handle400Error(res, 'You must provide an item');
    }

    if (apiKeyNeeded) {
      return requireApiKey(req, res, async () => {
        const existent = await Model.findOne({ id: body.id });

        if (existent) {
          return handle409Error(res, `Item with ID ${existent.id} already exists`);
        }

        const instance = new Model(body);

        if (!instance) {
          return handle400Error(res, err);
        }

        await instance.save();
        return handle201Success(res, {
          id: instance.id,
          message: `Item created!`,
        });
      });
    }

    const existent = await Model.findOne({ id: body.id });

    if (existent) {
      return handle409Error(res, `Item with ID ${existent.id} already exists`);
    }

    const instance = new Model(body);

    if (!instance) {
      return handle400Error(res, err);
    }

    await instance.save();
    return handle201Success(res, {
      id: instance.id,
      message: `Item created!`,
    });
  } catch (error) {
    console.log(error);
    return handle400Error(res, error);
  }
};

const createMany = (Model, apiKeyNeeded = true) => async (req, res) => {
  try {
    const items = req.body;
    const createdAt = new Date().getTime();

    if (!Array.isArray(items)) {
      return handle400Error(res, 'You must provide an array of items');
    }

    const validInstances = [];
    const invalidInstances = [];

    for (const item of items) {
      item.createdAt = createdAt;

      if (apiKeyNeeded) {
        await requireApiKey(req, res, async () => {
          const existent = await Model.findOne({ id: item.id });

          if (existent) {
            invalidInstances.push({
              id: item.id,
              message: `Item with ID ${existent.id} already exists`,
            });
          } else {
            validInstances.push(item);
          }
        });
      } else {
        const existent = await Model.findOne({ id: item.id });

        if (existent) {
          invalidInstances.push({
            id: item.id,
            message: `Item with ID ${existent.id} already exists`,
          });
        } else {
          validInstances.push(item);
        }
      }
    }

    const result = await Model.insertMany(validInstances);

    if (result.insertedCount === validInstances.length) {
      return handle201Success(
        res,
        'All items created!',
        invalidInstances,
        validInstances,
      );
    } else {
      return handle206Success(
        res,
        'Some items were not created',
        invalidInstances,
        validInstances,
      );
    }
  } catch (error) {
    console.log(error);
    return handle400Error(res, error);
  }
};

const getById = (Model, apiKeyNeeded = true) => async (req, res) => {
  try {
    if (apiKeyNeeded) {
      return requireApiKey(req, res, async () => {
        const instance = await Model.findOne({ id: req.params.id });

        if (!instance) {
          return handle404Error(res);
        }

        return handle200Success(res, instance);
      });
    }

    const instance = await Model.findOne({ id: req.params.id });

    if (!instance) {
      return handle404Error(res);
    }

    return handle200Success(res, instance);
  } catch (error) {
    console.log(error);
    return handle400Error(res, error);
  }
};

const getAll = (Model, apiKeyNeeded = true) => async (req, res) => {
  try {
    if (apiKeyNeeded) {
      return requireApiKey(req, res, async () => {
        const instances = await Model.find({});

        if (!instances.length) {
          return handle404Error(res);
        }

        return handle200Success(res, instances);
      });
    }

    const instances = await Model.find({});

    if (!instances.length) {
      return handle404Error(res);
    }

    return handle200Success(res, instances);
  } catch (error) {
    console.log(error);
    return handle400Error(res, error);
  }
};

const deleteOne = (Model, apiKeyNeeded = true) => async (req, res) => {
  try {
    if (apiKeyNeeded) {
      return requireApiKey(req, res, async () => {
        const instance = await Model.findOneAndDelete({ id: req.params.id });

        if (!instance) {
          return handle404Error(res);
        }

        return handle200Success(res, instance);
      });
    }

    const instance = await Model.findOneAndDelete({ id: req.params.id });

    if (!instance) {
      return handle404Error(res);
    }

    return handle200Success(res, instance);
  } catch (error) {
    console.log(error);
    return handle400Error(res, error);
  }
};

module.exports = {
  createOne,
  createMany,
  getById,
  getAll,
  deleteOne,
};
