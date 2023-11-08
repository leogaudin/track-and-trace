import { Alert, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
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

	useEffect(() => {
		if (!authorized)
			getInsights(id)
				.then((response) => {
					setAuthorized(response.publicInsights);
					getBoxesByAdminId(id)
						.then((response) => {
							setBoxes(response.data);
						})
						.catch((error) => {
							toast.error(t("error"));
							console.log(error);
						});
				})
				.catch((error) => {
					toast.error(t("error"));
					console.log(error);
				});
	}, []);

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
