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

export function calculateDeliveryPercentage(boxes, scans) {
	const groupedBoxes = {};
	const results = [];

	for (const box of boxes) {
	  const { project } = box;
	  if (!groupedBoxes[project]) {
		groupedBoxes[project] = [];
	  }
	  groupedBoxes[project].push(box);
	}

	for (const project in groupedBoxes) {
	  const boxesInGroup = groupedBoxes[project];
	  const uniqueBoxIds = [...new Set(boxesInGroup.map(box => box.id))];

	  const deliveredBoxes = uniqueBoxIds.reduce((count, boxId) => {
		const finalDestinationScan = scans.find(scan => scan.boxId === boxId && scan.finalDestination === true);
		if (finalDestinationScan) {
		  count++;
		}
		return count;
	  }, 0);

	  const deliveryPercentage = (deliveredBoxes / boxesInGroup.length) * 100;

	  results.push({
		project,
		delivered: deliveredBoxes,
		total: boxesInGroup.length,
		deliveryPercentage: deliveryPercentage.toFixed(2),
	  });
	}

	return results;
  }

