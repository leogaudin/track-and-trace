import React, { useContext } from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import {QRCodeSVG} from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import AppContext from '../../context/AppContext';

const BoxInfo = ({ box, width = null, height = null }) => {
	const {isMobile} = useContext(AppContext);
  const { t } = useTranslation();

  return (
    <Card sx={{width: width ? width : '100%', height: height ? height : '100%'}} >
      <CardContent>
        <Typography color="text.secondary" variant="overline">
          Informations
        </Typography>
        <Stack
          direction={'row'}
          spacing={5}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Stack direction={'column'} spacing={0.5}>
            <Typography>
              {t('project')}: <b>{box?.project}</b>
            </Typography>
            <Typography>
              {t('recipient')}: <b>{box?.school}</b>
            </Typography>
            <Typography>
              {t('division')}: <b>{box?.division}</b>
            </Typography>
            <Typography>
              {t('district')}: <b>{box?.district}</b>
            </Typography>
            <Typography>
              {t('project')}: <b>{box?.zone}</b>
            </Typography>
            <Typography>
              {t('institutionType')}: <b>{box?.institutionType}</b>
            </Typography>
            <Typography>
              {t('personInCharge')}: <b>{box?.htName}</b>
            </Typography>
            <Typography>
              {t('phone')}: <b>{box?.htPhone}</b>
            </Typography>
            <Typography>
              {t('created')}:{' '}
              <b>{new Date(box?.createdAt).toLocaleString()}</b>
            </Typography>
          </Stack>
          {isMobile
            ? null
            :
            <QRCodeSVG value={'tnt://' + box?.id} size={150} level='H'/>
          }
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BoxInfo;
