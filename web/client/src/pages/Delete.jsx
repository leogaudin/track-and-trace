import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, RadioGroup, Radio, FormControlLabel, Stack, Typography, Select, MenuItem, CardContent, Box } from '@mui/material';
import AppContext from '../context/AppContext';
import { deleteBoxes } from "../service";
import ConfirmDialog from '../components/customisation/ConfirmDialog';
import { useTranslation } from 'react-i18next';
import BoxFiltering from '../components/controls/BoxFiltering';

export default function Delete() {
  const {boxes} = useContext(AppContext);
  const [filteredBoxes, setFilteredBoxes] = useState(boxes);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { t } = useTranslation();

  if (!boxes)
    return (
      <Box paddingX={'15vw'} paddingY={'10vh'} width={'100%'}>
        <Card style={{ width: '100%', height: '100%', overflow: 'auto', alignItems: 'center' }}>
          <CardContent>
            <Typography variant="overline">{t('noBoxes')}</Typography>
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
            <Typography variant='overline' color='error'><b>{t('itemsWillBeDeleted', {number: filteredBoxes.length})}</b></Typography>
            <div>
              <Button variant={'contained'} color='error' size='large' onClick={() => setOpenDeleteDialog(true)}>
                {t('deleteBoxes')}
              </Button>
            </div>
          </Stack>
          <ConfirmDialog
            open={openDeleteDialog}
            setOpen={setOpenDeleteDialog}
            message={t('confirmDelete')}
            onConfirm={() => {
              deleteBoxes(filteredBoxes)
                .then(() => {
                  window.location.reload();
                })
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
