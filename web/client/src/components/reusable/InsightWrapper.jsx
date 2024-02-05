import React from 'react';
import { Card, CardContent, Typography, Grid, CardHeader } from '@mui/material';
import DownloadMenu from '../export/DownloadMenu';

export default function InsightWrapper({title, width = 30, height = 50, data, children}) {
	return (
		<Grid item>
			<Card style={{margin: 10}}>
				<CardHeader
					title={
						<Typography variant="overline" gutterBottom>
							{title}
						</Typography>
					}
					action={
						<DownloadMenu
							data={data}
							title={title}
							detail="Download as CSV or JSON"
						/>
					}
				/>

				<CardContent sx={{width: `${width}vw`, height: `${height}vh`}}>
					{children}
				</CardContent>
			</Card>
		</Grid>
	);
}
