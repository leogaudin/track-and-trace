import { Alert, Button, Stack, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';

export default function UploadSummary({ results, open, setOpen }) {
	const { t } = useTranslation();
	return (
		<>
			<Stack direction={'column'} spacing={2}>
				<Typography textAlign={'center'} variant='overline'>{t('uploadFinished')}</Typography>
				<Button
					variant={'contained'}
					color='success'
					onClick={() => {
						setOpen(false);
						window.location.reload();
					}}>
					{t('close')}
				</Button>
				<Typography textAlign={'center'} variant='overline'>{t('summary')}</Typography>
				<Stack direction={'row'} spacing={2} alignItems={'stretch'}>
					{
						results.hasOwnProperty('valid') && results.valid.length > 0
							? (
								<Stack direction={'column'} spacing={2}>
									{results.valid.map((box) => {
										return (
											<Alert key={box.id} severity={'success'}>
												{t('boxCreated', {id: box.id})}
											</Alert>
										);
									})}
								</Stack>
							) : null
					}
					{
						results.hasOwnProperty('invalid') && results.invalid.length > 0
							? (
								<Stack direction={'column'} spacing={2}>
									{results.invalid.map((box) => {
										return (
											<Alert key={box.instance.id} severity={'error'}>
												{box.error}
											</Alert>
										);
									})}
								</Stack>
							) : null
					}
				</Stack>
			</Stack>
		</>
	);
}
