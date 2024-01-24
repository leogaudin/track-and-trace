import DeliveryPercent from './insights/DeliveryPercent';
import ProgressFunnel from './insights/ProgressFunnel';
import { Grid, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import NotScannedSince from './insights/NotScannedSince';
import React from 'react';
import { groupByProperty } from '../service';

function Insights({boxes}) {
	const [groupedBoxes, setGroupedBoxes] = useState({});

	useEffect(() => {
		if (boxes)
			setGroupedBoxes(groupByProperty(boxes, 'project'));
	}, [boxes]);

	return (
		<>
			{Object.keys(groupedBoxes).map((key, i) => {
				const sample = groupedBoxes[key];
				if (!sample) return null;
				return (
					<Grid item xs={12} key={i}>
						<Card width={1000}>
							<CardContent>
								<DeliveryPercent sample={sample} sampleName={key} />
								<Grid
									container
									padding={3}
									spacing={2}
									alignItems='stretch'
								>
									<ProgressFunnel sample={sample}/>
									<NotScannedSince sample={sample}/>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				);
			})}
		</>
	);
}

export default React.memo(Insights);
