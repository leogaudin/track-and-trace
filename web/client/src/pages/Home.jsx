import React, {useContext} from 'react';
import { Grid, Card, CardContent, Typography, SvgIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ProgressOverview from '../components/ProgressOverview'
import { items } from '../components/constants';
import AppContext from '../context/AppContext';
import { useTranslation } from 'react-i18next';

export default function Home() {
	const { boxes, scans } = useContext(AppContext);
	const cards = items.slice(1, 4);
	const { t } = useTranslation();

	return (
		<>
			<Helmet>
				<title>{t("home")} - Track-and-Trace</title>
				<meta name="description" content={t("description")} />
			</Helmet>
			<Grid
				container
				padding={3}
				spacing={2}
				alignItems='stretch'
			>
				<Grid item xs={12}>
					<ProgressOverview boxes={boxes} scans={scans} />
				</Grid>
				{cards.map((card) => (
					<Grid item xs={12} sm={6} md={4} key={card.id}>
					<Card>
						<Link
							to={card.path}
							style={{
								textDecoration: 'none',
								height: '100%',
							}}
						>
						<CardContent
							sx={{
								borderRadius: '1rem',
								backgroundColor: 'white',
								overflow: 'hidden',
								textAlign: 'center',
								color: 'primary.dark',
								'&:hover': {
									backgroundColor: 'neutral.100',
								},
							}}
						>
							<SvgIcon sx={{ fontSize: '5rem' }}>
								{card.icon}
							</SvgIcon>
							<Typography variant="subtitle1">
								{card.title}
							</Typography>
						</CardContent>
						</Link>
					</Card>
					</Grid>
				))}
			</Grid>
		</>
	);
}
