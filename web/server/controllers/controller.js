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

    if (!Array.isArray(items) || items.length === 0) {
      return handle400Error(res, 'You must provide an array of items');
    }

    const operations = [];
    const createdItems = [];
    const existingItems = [];
    const invalidItems = [];

    for (const item of items) {
      if (!item) {
        invalidItems.push({ item, error: 'Invalid item' });
        continue;
      }

      item.createdAt = new Date().getTime();

      if (apiKeyNeeded) {
        await requireApiKey(req, res, async () => {
          const existent = await Model.findOne({ id: item.id });

          if (existent) {
            existingItems.push({ item, error: `Item with ID ${existent.id} already exists` });
          } else {
            const instance = new Model(item);

            if (!instance) {
              invalidItems.push({ item, error: 'Invalid item' });
            } else {
              operations.push({ insertOne: { document: item } });
              createdItems.push({ id: instance.id, message: `Item created!` });
            }
          }
        })();
      } else {
        const existent = await Model.findOne({ id: item.id });

        if (existent) {
          existingItems.push({ item, error: `Item with ID ${existent.id} already exists` });
        } else {
          const instance = new Model(item);

          if (!instance) {
            invalidItems.push({ item, error: 'Invalid item' });
          } else {
            operations.push({ insertOne: { document: item } });
            createdItems.push({ id: instance.id, message: `Item created!` });
          }
        }
      }
    }

    if (operations.length > 0) {
      await Model.bulkWrite(operations);
    }

    const statusCode = createdItems.length === items.length ? 201 : 206;

    return res.status(statusCode).json({
      created: createdItems,
      existing: existingItems,
      invalid: invalidItems,
    });
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
