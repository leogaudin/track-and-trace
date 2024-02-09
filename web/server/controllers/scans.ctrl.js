const Scan = require('../models/scans.model');
const Admin = require('../models/admins.model');
const Box = require('../models/boxes.model');
const { createOne, createMany, getById, getAll, deleteOne } = require('./base');
const { feature } = require('@rapideditor/country-coder');

function haversineDistance(coord1, coord2) {
	const earthRadiusInMeters = 6378137;
	const { latitude: lat1, longitude: lon1, accuracy: acc1 } = coord1;
	const { latitude: lat2, longitude: lon2, accuracy: acc2 } = coord2;

	const dLat = (lat2 - lat1) * (Math.PI / 180);
	const dLon = (lon2 - lon1) * (Math.PI / 180);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const distanceWithoutAccuracy = earthRadiusInMeters * c;

	// const adjustedDistance = Math.sqrt(distanceWithoutAccuracy ** 2 + (acc1 + acc2) ** 2);

	return distanceWithoutAccuracy;
}

function isFinalDestination(schoolCoords, boxCoords) {
	const distance = haversineDistance(schoolCoords, boxCoords);
	const radiusInMeters = 1000;

	return distance <= radiusInMeters;
}

const createScan = async (req, res) => {
    try {
        const { boxId, comment, id, operatorId, location, markedAsReceived } = req.body;

        const countryName = feature([location.coords.longitude, location.coords.latitude]).properties.nameEn;

        const box = await Box.findOne({ id: boxId });

        if (!box)
            return res.status(404).json({ error: "Box not found" });

        const schoolCoords = {
            latitude: box.schoolLatitude,
            longitude: box.schoolLongitude,
            accuracy: 1
        };

        const scanCoords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy
        };

        const newScan = {
            boxId,
            comment,
            id,
            operatorId,
            location,
            countryName,
            time: location.timestamp,
            markedAsReceived,
            finalDestination: isFinalDestination(schoolCoords, scanCoords)
        };

        box.scans = box.scans || [];

        box.scans.push(newScan);

        await Box.updateOne({ id: boxId }, { $set: { scans: box.scans } });

        return res.status(200).json({ message: "Scan added successfully", box });
    } catch (error) {
        console.error("Error adding scan:", error);
        return res.status(500).json({ error: "An error occurred while adding the scan" });
    }
};
const createScans = createMany(Scan, false);
const getScanById = getById(Scan);
const getScans = getAll(Scan);
const deleteScan = deleteOne(Scan);
const getScansByBoxes = async (req, res) => {
    try {
        if (!req.headers['x-authorization']) {
            return res.status(401).json({ success: false, error: 'API key required' });
        }
        const apiKey = req.headers['x-authorization'];
        const admin = await Admin.findOne({ apiKey });

        if (!admin) {
            return res.status(401).json({ success: false, error: 'Invalid API key' });
        }
        const boxes = req.body;
        const scans = await Scan.find({ boxId: { $in: boxes } });
        if (!scans.length)
            return res.status(404).json({ success: false, error: `No scans available` });
        return res.status(200).json({ success: true, data: scans });
    } catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
}

module.exports = {
    createScan,
    createScans,
    deleteScan,
    getScans,
    getScanById,
    getScansByBoxes,
}
