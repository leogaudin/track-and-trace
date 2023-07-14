import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';
import {QRCodeSVG} from 'qrcode.react';
import { useMediaQuery } from '@mui/material';

const BoxInfo = ({ boxData, width = null, height = null }) => {
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
              Project: <b>{boxData?.project}</b>
            </Typography>
            <Typography>
              Recipient: <b>{boxData?.school}</b>
            </Typography>
            <Typography>
              Division: <b>{boxData?.division}</b>
            </Typography>
            <Typography>
              District: <b>{boxData?.district}</b>
            </Typography>
            <Typography>
              Zone: <b>{boxData?.zone}</b>
            </Typography>
            <Typography>
              Institution type: <b>{boxData?.institutionType}</b>
            </Typography>
            <Typography>
              Person in charge: <b>{boxData?.htName}</b>
            </Typography>
            <Typography>
              Phone: <b>{boxData?.htPhone}</b>
            </Typography>
            <Typography>
              Created:{' '}
              <b>{new Date(boxData?.createdAt).toLocaleString()}</b>
            </Typography>
          </Stack>
          {isMobile
            ? null
            : <Stack direction={'column'} spacing={1} alignItems={'center'}>
            <QRCodeSVG value={'tnt://' + boxData?.id} size={150} level='H'/>
            <Typography
              fontFamily={
                'Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New'
              }
              fontSize={'.7rem'}
            >
              {boxData?.id}
            </Typography>
          </Stack>}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BoxInfo;
