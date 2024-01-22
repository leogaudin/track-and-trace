export function getProgress(scans) {
	if (!scans || scans.length === 0) {
		return "noscans";
	}

	const finalScans = scans ? scans.filter(scan => scan.finalDestination === true) : null;

	if (finalScans) {
		if (finalScans.length > 1) {
			return "confusing";
		} else if (finalScans.length === 1) {
			return "delivered";
		} else {
			return "inprogress";
		}
	}
}

export function calculateDeliveryPercentage(project) {
	const uniqueBoxIds = [...new Set(project.map(box => box.id))];

	const scans = project.reduce((accumulator, box) => {
		if (box.scans && Array.isArray(box.scans))
			return accumulator.concat(box.scans);
		return accumulator;
	}, []);

	const deliveredBoxes = uniqueBoxIds.reduce((count, boxId) => {
		const finalDestinationScan = scans.find(scan => scan.boxId === boxId && scan.finalDestination === true);
		if (finalDestinationScan) {
			count++;
		}
		return count;
	}, 0);

	const deliveryPercentage = (deliveredBoxes / project.length) * 100;

	return deliveryPercentage;
}
