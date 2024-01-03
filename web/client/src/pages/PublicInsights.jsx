import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getBoxesByAdminId, getInsights } from "../service";
import { toast } from "react-toastify";
import Insights from "../components/Insights";

export default function PublicInsights() {
	const { t } = useTranslation();
	const {id} = useParams();
	const [authorized, setAuthorized] = useState(null);
	const [boxes, setBoxes] = useState(null);

	const fetchBoxes = async (id) => {
		try {
			setBoxes([]);
			let hasMore = true;
			const limit = 2100;
			const requests = [];

			while (hasMore) {
				const skip = requests.length * limit;
				const request = getBoxesByAdminId(id, skip, limit);
				requests.push(request);
				const response = await request;
				if (response.data.length < limit) hasMore = false;
			}

			const responses = await Promise.all(requests);
			const mergedBoxes = responses.reduce((accumulator, response) => {
				return accumulator.concat(response.data);
			}, []);

			mergedBoxes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
			setBoxes(mergedBoxes);
			return mergedBoxes;
		} catch (err) {
			toast.error(err.response?.data?.message || err.message);
			if (err.response && err.response.status >= 400) {
				return null;
			}
		}
	}

	useEffect(() => {
		if (!authorized)
			getInsights(id)
				.then((response) => {
					setAuthorized(response.publicInsights);
					fetchBoxes(id)
						// .then((response) => {
						// 	setBoxes(response.data);
						// })
						// .catch((error) => {
						// 	toast.error(t("error"));
						// 	console.log(error);
						// });
				})
				.catch((error) => {
					toast.error(t("error"));
					console.log(error);
				});
	}, [authorized, id, t]);

	if (authorized)
		return (
			<div style={{width: '100%'}}>
				<Helmet>
					<title>{t("insights")} - Track-and-Trace</title>
					<meta name="description" content={t("description")} />
				</Helmet>
				<Insights boxes={boxes} />
			</div>
		);
	else if (authorized === false)
		return (
			<>
				<Helmet>
					<title>{t("insights")} - Track-and-Trace</title>
					<meta name="description" content={t("description")} />
				</Helmet>
				<Alert severity="error">t('notAuthorized')</Alert>
			</>
		);
}
