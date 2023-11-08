import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export default function InsightWrapper({title, width = 30, height = 50, children}) {
	return (
		<Grid item xs={`${width}vw`}>
			<Card style={{margin: 10}}>
				<CardContent sx={{width: `${width}vw`, height: `${height}vh`}}>
					<Typography variant="overline" gutterBottom>
						{title}
					</Typography>
					{children}
				</CardContent>
			</Card>
		</Grid>
	);
}
