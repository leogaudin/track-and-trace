import React, { useState, useContext } from 'react';
import { Alert, Card, Stack, Typography, CardContent, Box, CardHeader, Grid, Tooltip } from '@mui/material';
import HTMLExport from '../components/export/HTMLExport';
import AppContext from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import BoxFiltering from '../components/controls/BoxFiltering';
import EndOfDelivery from '../components/export/EndOfDelivery';

export default function Export() {
  const {boxes} = useContext(AppContext);
  const [filteredBoxes, setFilteredBoxes] = useState(boxes);
  const { t } = useTranslation();

  const getFolderName = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    return `TnT Labels - ${currentDate}`;
  };

  if (!boxes)
    return (
      <Box paddingX={'15vw'} paddingY={'10vh'} width={'100%'}>
        <Card style={{ width: '100%', height: '100%', overflow: 'auto', alignItems: 'center' }}>
          <CardContent>
            <Alert severity="info">{t('youHaveNo', {item: t('boxes')})}</Alert>
          </CardContent>
        </Card>
      </Box>
    );

  return (
    <Box paddingX={'15vw'} paddingY={'10vh'} width={'100%'}>
        <Card style={{ width: '100%', height: '100%', overflow: 'auto', alignItems: 'center' }}>
          <CardContent>
            <BoxFiltering boxes={boxes} setFilteredBoxes={setFilteredBoxes} />
              <Stack direction={'column'} spacing={1} alignItems={'center'}>
                <Typography variant='overline'><b>{t('itemsWillBeExported', {count: filteredBoxes.length})}</b></Typography>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  <HTMLExport objects={filteredBoxes} folderName={getFolderName()} />
                  <EndOfDelivery boxes={filteredBoxes} />
                </Stack>
              </Stack>
          </CardContent>
        </Card>
    </Box>
  );
}
