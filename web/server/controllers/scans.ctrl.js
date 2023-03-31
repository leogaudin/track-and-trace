const Scan = require('../models/scans.model')

const addScan = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a scan',
        })
    }

    const existentScan = await Scan.findOne({ id: body.id })
    if (existentScan) {
        return res.status(409).json({
            success: false,
            error: 'A scan with this ID already exists',
        })
    }

    const scan = new Scan(body)

    if (!scan) {
        return res.status(400).json({ success: false, error: err })
    }

    scan
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: scan.id,
                message: 'Scan created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Scan not created!',
            })
        })
}

const getScanById = async (req, res) => {
    try {
        const scan = await Scan.findOne({ id: req.params.id })
        if (!scan) {
            return res
                .status(404)
                .json({ success: false, error: 'Scan not found' })
        }
        return res
            .status(200)
            .json({ success: true, data: scan })
    } catch (err) {
        console.log(err)
        return res
            .status(400)
            .json({ success: false, error: err })
    }
}

const getScans = async (req, res) => {
    try {
        const scans = await Scan.find({});
        if (!scans.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Scan not found' })
        }
        return res
            .status(200)
            .json({ success: true, data: scans });
    } catch (err) {
        console.log(err);
        return res.status
            .status(400)
            .json({ success: false, error: err });
    }
}

const deleteScan = async (req, res) => {
    try {
        const scan = await Scan.findOneAndDelete({ id: req.params.id });
        if (!scan) {
            return res.status(404).json({ success: false, error: `Scan not found` });
        }
        return res.status(200).json({ success: true, data: scan });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, error: err });
    }
};


module.exports = {
    addScan,
    deleteScan,
    getScans,
    getScanById,
}
