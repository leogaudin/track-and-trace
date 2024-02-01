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
				date: lastScan ? new Date(lastScan?.location.timestamp).toLocaleDateString() : '',
			}
		});
		setToExport(toExport);
	}, [boxes]);

	return (
		<DownloadMenu data={toExport} title={t('endOfDeliveryReport')} detail={t('endOfDeliveryReportDetail')}/>
	);
}
