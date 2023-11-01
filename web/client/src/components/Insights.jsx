import DeliveryPercent from './insights/DeliveryPercent';
import { calculateDeliveryPercentage } from '../service/statistics';
import ScansPerDate from './insights/ScansPerDate';
import ProgressFunnel from './insights/ProgressFunnel';
import ScannedOncePie from './insights/ScannedOncePie';
import { Grid, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Insights({boxes}) {
	const [groupedBoxes, setGroupedBoxes] = useState({});

	useEffect(() => {
		if (!boxes) return;
		let tempGroups = {};
		for (const box of boxes) {
		  const { project } = box;
		  if (!tempGroups[project]) tempGroups[project] = [];
		  tempGroups[project].push(box);
		}
		setGroupedBoxes(tempGroups);
	}, [boxes]);

	return (
		<>
			{Object.keys(groupedBoxes).map((key, i) => {
				const project = groupedBoxes[key];
				if (!project) return null;
				const deliveryPerc = calculateDeliveryPercentage(project);
				return (
					<Grid item xs={12}>
						<Card key={i} width={1000}>
							<CardContent>
								<DeliveryPercent projectName={key} deliveryPercentage={deliveryPerc} />
								<Grid
									container
									padding={3}
									spacing={2}
									alignItems='stretch'
								>
									<ScansPerDate project={project}/>
									<ProgressFunnel project={project}/>
									<ScannedOncePie project={project}/>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				);
			})}
		</>
	);
}
