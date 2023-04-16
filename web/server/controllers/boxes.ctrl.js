const Box = require('../models/boxes.model')

const createBox = async (req, res) => {
    const body = req.body

    body.createdAt = new Date().getTime();

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a box',
        })
    }

    const existentBox = await Box.findOne({ id: body.id })
    if (existentBox) {
        return res.status(409).json({
            success: false,
            error: 'A box with this ID already exists: box n°' + existentBox.id,
        })
    }

    const box = new Box(body)

    if (!box) {
        return res.status(400).json({ success: false, error: err })
    }

    box
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: box.id,
                message: 'Box created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Box not created!',
            })
        })
}

const createBoxes = async (req, res) => {
    const boxes = req.body;

    const validBoxesToCreate = [];
    const invalidBoxes = [];

    for (const box of boxes) {
        box.createdAt = new Date().getTime();

        if (!box.id) {
            invalidBoxes.push({
                box,
                error: 'You must provide an id for the box',
            });
            continue;
        }

        const existentBox = await Box.findOne({ id: box.id });

        if (existentBox) {
            invalidBoxes.push({
                box,
                error: 'A box with this ID already exists: box n°' + existentBox.id,
            });
            continue;
        }

        validBoxesToCreate.push(new Box(box));
    }

    Box.insertMany(validBoxesToCreate)
        .then(() => {
            if (invalidBoxes.length > 0) {
                return res.status(206).json({
                    success: true,
                    message: 'Some boxes were not created',
                    invalidBoxes,
                });
            } else {
                return res.status(201).json({
                    success: true,
                    message: 'Boxes created!',
                });
            }
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: 'Boxes not created!',
            });
        });
};


const getBoxById = async (req, res) => {
    try {
        const box = await Box.findOne({ id: req.params.id })
        if (!box) {
            return res
                .status(404)
                .json({ success: false, error: 'Box not found' })
        }
        return res
            .status(200)
            .json({ success: true, data: box })
    } catch (err) {
        console.log(err)
        return res
            .status(400)
            .json({ success: false, error: err })
    }
}

const getBoxes = async (req, res) => {
    try {
        const boxes = await Box.find({});
        if (!boxes.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Box not found' })
        }
        return res
            .status(200)
            .json({ success: true, data: boxes });
    } catch (err) {
        console.log(err);
        return res.status
            .status(400)
            .json({ success: false, error: err });
    }
}

const deleteBox = async (req, res) => {
    try {
        const box = await Box.findOneAndDelete({ id: req.params.id });
        if (!box) {
            return res.status(404).json({ success: false, error: `Box not found` });
        }
        return res.status(200).json({ success: true, data: box });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, error: err });
    }
};

module.exports = {
    createBox,
    createBoxes,
    deleteBox,
    getBoxes,
    getBoxById,
}
