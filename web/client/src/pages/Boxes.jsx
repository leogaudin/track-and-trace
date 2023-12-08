import React, { useState } from 'react';
import BoxesOverview from '../components/BoxesOverview';
import { Button, Grid } from '@mui/material';
import Upload from '../components/Upload';
import { Helmet } from 'react-helmet-async';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTranslation } from 'react-i18next';

export default function Boxes() {
	const [uploadOpen, setUploadOpen] = useState(false);
	const { t } = useTranslation();

	return (
		<>
			<Helmet>
				<title>{t('boxes')} - Track-and-Trace</title>
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
						onClick={setUploadOpen}
						size='large'
						startIcon={<CloudUploadIcon />}
					>
						{t('uploadPrompt')}
					</Button>
				</Grid>
				<Grid item xs={12}>
					<BoxesOverview />
				</Grid>
			</Grid>
			<Upload open={uploadOpen} setOpen={setUploadOpen} />
		</>
	);
}
