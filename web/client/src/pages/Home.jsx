import React, { useContext, useEffect, useState } from 'react';
import { Alert, Grid, Card, CardContent, Typography, Button, TextField, Stack, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import AppContext from '../context/AppContext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import { setInsights } from '../service';
import Insights from '../components/Insights';

export default function Home() {
	const { boxes, isMobile, user } = useContext(AppContext);
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
					<Typography variant="h2" fontWeight={800} component="h1" gutterBottom>
						Insights
					</Typography>
					<Alert style={{alignItems: 'center'}} severity={user.publicInsights ? 'success' : 'error'}>
						{t('yourInsightsAreCurrently')} {user.publicInsights ? t('public') : t('private')}.
						<br/>
						{<Button style={{marginTop: 10}} size='small' variant={'outlined'} color={user.publicInsights ? 'success' : 'error'} onClick={() => {
							setInsights(user.id, !user.publicInsights)
							.then(() => {
								window.location.reload();
								user.publicInsights = !user.publicInsights;
								localStorage.setItem('user', JSON.stringify(user));
							})
							.catch(() => {
								toast.error("Error updating visibility", {autoClose: 1000, hideProgressBar: true})
							})
						}}>
							{t('make')} {user.publicInsights ? t('private') : t('public')}
						</Button>}
					</Alert>
					<Stack spacing={1} marginY={2} direction={isMobile ? 'column' : 'row'} justifyContent={'center'} alignItems={'stretch'}>
						<TextField disabled style={{width: '100%'}} label={t('accessLink')} variant="filled" value={`${window.location.href}insights/${user.id}`} />
						<IconButton onClick={() => {
							toast.success(t('copied'), {autoClose: 1000, hideProgressBar: true})
							navigator.clipboard.writeText(`${window.location.href}insights/${user.id}`)
						}}>
							<ContentCopyIcon />
						</IconButton>
					</Stack>
					{<React.Fragment>
						{boxes === null ? (
							<Alert severity="info">{t('youHaveNo', {item: t('boxes').toLowerCase()})}</Alert>
						) : false}
					</React.Fragment>}
				</Grid>
				<Insights boxes={boxes} />
			</Grid>
		</>
	);
}
