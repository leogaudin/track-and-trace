import { getLastFinalScan } from "../../service";
import DownloadMenu from "./DownloadMenu";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function EndOfDelivery({boxes}) {
	const [toExport, setToExport] = useState([]);
	const { t } = useTranslation();

	useEffect(() => {
		const toExport = boxes.map(box => {
			const lastScan = getLastFinalScan(box);
			return {
				id: box.id,
				school: box.school,
				delivered: !!lastScan,
				confirmedByHt: lastScan?.markedAsReceived,
				date: lastScan ? new Date(lastScan?.location.timestamp) : null,
				operatorId: lastScan?.operatorId,
			}
		});
		// Order by dates
		toExport.sort((a, b) => a?.date - b?.date);
		// Format dates
		toExport.forEach(box => {
			box.date = box.date ? box.date.toLocaleDateString() : '';
		});
		setToExport(toExport);
	}, [boxes]);

	return (
		<DownloadMenu isThreeDots={false} data={toExport} title={t('endOfDeliveryReport')} detail={t('endOfDeliveryReportDetail')}/>
	);
}
