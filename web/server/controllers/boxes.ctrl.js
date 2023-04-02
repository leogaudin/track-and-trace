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
            error: 'A box with this ID already exists',
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
    deleteBox,
    getBoxes,
    getBoxById,
}
