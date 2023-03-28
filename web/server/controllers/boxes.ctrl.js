const Box = require('../models/boxes.model')

const createBox = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a box',
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
                id: box._id,
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

const updateBox = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Box.findOne({ _id: req.params.id }, (err, box) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Box not found!',
            })
        }
        box.name = body.name
        box.time = body.time
        box.rating = body.rating
        box
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: box._id,
                    message: 'Box updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Box not updated!',
                })
            })
    })
}

const deleteBox = async (req, res) => {
    await Box.findOneAndDelete({ _id: req.params.id }, (err, box) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!box) {
            return res
                .status(404)
                .json({ success: false, error: `Box not found` })
        }

        return res.status(200).json({ success: true, data: box })
    }).catch(err => console.log(err))
}

const getBoxById = async (req, res) => {
    await Box.findOne({ _id: req.params.id }, (err, box) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!box) {
            return res
                .status(404)
                .json({ success: false, error: `Box not found` })
        }
        return res.status(200).json({ success: true, data: box })
    }).catch(err => console.log(err))
}

const getBoxes = async (req, res) => {
    await Box.find({}, (err, boxes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!boxes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Box not found` })
        }
        return res.status(200).json({ success: true, data: boxes })
    }).catch(err => console.log(err))
}

module.exports = {
    createBox,
    updateBox,
    deleteBox,
    getBoxes,
    getBoxById,
}
