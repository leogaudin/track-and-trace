import React, { useState } from 'react';
import BoxesOverview from '../components/BoxesOverview';
import { ButtonBase, Card, CardContent, Grid, Typography } from '@mui/material';
import Upload from '../components/Upload';

export default function Boxes({ boxes, scans }) {
	const [uploadOpen, setUploadOpen] = useState(false);

	return (
		<Grid
			container
			padding={3}
			spacing={2}
			alignItems='stretch'
		>
			<Grid item xs={12}>
				<Card>
					<ButtonBase
						style={{ width: '100%' }}
						onClick={setUploadOpen}
					>
						<CardContent>
							<Typography>
								Upload boxes from a CSV
							</Typography>
						</CardContent>
					</ButtonBase>
				</Card>
				<Upload open={uploadOpen} setOpen={setUploadOpen} />
			</Grid>
			<Grid item xs={12}>
				<BoxesOverview boxes={boxes} scans={scans} />
			</Grid>
		</Grid>
	);
}
