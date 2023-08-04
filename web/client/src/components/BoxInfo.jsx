import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import {QRCodeSVG} from 'qrcode.react';
import { useMediaQuery } from '@mui/material';

const BoxInfo = ({ box, width = null, height = null }) => {
	const isMobile = !useMediaQuery(theme => theme.breakpoints.up('lg'));

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
              Project: <b>{box?.project}</b>
            </Typography>
            <Typography>
              Recipient: <b>{box?.school}</b>
            </Typography>
            <Typography>
              Division: <b>{box?.division}</b>
            </Typography>
            <Typography>
              District: <b>{box?.district}</b>
            </Typography>
            <Typography>
              Zone: <b>{box?.zone}</b>
            </Typography>
            <Typography>
              Institution type: <b>{box?.institutionType}</b>
            </Typography>
            <Typography>
              Person in charge: <b>{box?.htName}</b>
            </Typography>
            <Typography>
              Phone: <b>{box?.htPhone}</b>
            </Typography>
            <Typography>
              Created:{' '}
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
