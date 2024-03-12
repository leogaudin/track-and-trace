import { getLastFinalScan, getLastMarkedAsReceivedScan } from "../../service";
import DownloadMenu from "./DownloadMenu";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function EndOfDelivery({boxes}) {
	const [toExport, setToExport] = useState([]);
	const { t } = useTranslation();

	useEffect(() => {
		const toExport = boxes.map(box => {
			const lastDeliveredScan = getLastFinalScan(box);
			const lastMarkedAsReceivedScan = getLastMarkedAsReceivedScan(box);

			return {
				id: box.id,
				school: box.school,
				delivered: !!lastDeliveredScan,
				deliveredDate: lastDeliveredScan ? new Date(lastDeliveredScan?.location.timestamp).toLocaleDateString() : '',
				received: !!lastMarkedAsReceivedScan,
				receivedDate: lastMarkedAsReceivedScan ? new Date(lastMarkedAsReceivedScan?.location.timestamp).toLocaleDateString() : '',
			}
		});
		setToExport(toExport);
	}, [boxes]);

	return (
		<DownloadMenu data={toExport} title={t('endOfDeliveryReport')} detail={t('endOfDeliveryReportDetail')}/>
	);
}
