import React from 'react';
import ScansOverview from '../components/ScansOverview';
import { Button, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CachedIcon from '@mui/icons-material/Cached';
import { useTranslation } from 'react-i18next';

export default function Scans() {
	const { t } = useTranslation();

	return (
		<>
			<Helmet>
				<title>{t('scans')} - Track-and-Trace</title>
				<meta name="description" content={t('description')} />
			</Helmet>
			<Grid
				container
				padding={3}
				spacing={2}
				alignItems='stretch'
			>
				<Grid item xs={12}>
					<Button
						variant='outlined'
						color='primary'
						fullWidth
						onClick={() => {
							window.location.reload(false);
						}}
						size='large'
						startIcon={<CachedIcon />}
					>
						{t('refresh')}
					</Button>
				</Grid>
				<Grid item xs={12}>
					<ScansOverview searchEnabled />
				</Grid>
			</Grid>
		</>
	);
}

