import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, RadioGroup, Radio, FormControlLabel, Stack, Typography, Select, MenuItem, CardContent, Box } from '@mui/material';
import AppContext from '../context/AppContext';
import { deleteBoxes } from "../service";
import ConfirmDialog from '../components/ConfirmDialog';
import { useTranslation } from 'react-i18next';

export default function Delete() {
  const [selectedOption, setSelectedOption] = useState('all');
  const {boxes} = useContext(AppContext);
  const [filteredBoxes, setFilteredBoxes] = useState(boxes);
  const [selectedField, setSelectedField] = useState('');
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const excludedOptions = [
    '_id',
    'id',
    'school',
    'htName',
    'htPhone',
    'institutionType',
    'adminId',
    'createdAt',
    '__v',
    'scans'
  ];
  const { t } = useTranslation();


	useEffect(() => {
    setFilteredBoxes(boxes ? boxes : []);
    setLoading(false);
	}, [boxes]);

	useEffect(() => {
		updateFilteredBoxes();
	}, [selectedField, selectedOption]);

	const availableOptions = boxes ? Object.keys(boxes[0] || {}).filter((field) => !excludedOptions?.includes(field)) : null;

	const updateFilteredBoxes = () => {
		setFilteredBoxes(boxes?.filter((box) =>
			(box[selectedOption] === selectedField || selectedOption === 'all')
		));
	}

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const handleFieldChange = (event) => {
		setSelectedField(event.target.value);
	};

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
          <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'} width={'100%'}>
            <Stack direction={'column'} spacing={1} alignItems={'flex-start'} width={'50%'}>
              <Typography variant="overline">{t('deleteOptions')}</Typography>
              <RadioGroup name="export-options" value={selectedOption} onChange={handleOptionChange}>
                <FormControlLabel value="all" control={<Radio />} label={t('all')} />
                {availableOptions.map((field) => (
                  <FormControlLabel key={field} value={field} control={<Radio />} label={`${t('by', {item: field})}`} />
                ))}
              </RadioGroup>
            </Stack>
            {selectedOption !== 'all' && (
              <Stack direction={'column'} spacing={1} alignItems={'center'}>
                <Typography variant="overline">{t('select', {option: selectedOption})}</Typography>
                <Select
                  onChange={handleFieldChange}
                  placeholder={`${t('select', {option: selectedOption})}`}
                  sx={{ marginBottom: '1rem' }}
                  displayEmpty
                  renderValue={(value) => value ? value : `${t('select', {option: selectedOption})}`}
                >
                  {Array.from(new Set(boxes.map((box) => box[selectedOption]))).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            )}
          </Stack>
          <Stack direction={'column'} spacing={1} alignItems={'center'}>
            {!loading
              ? <Typography variant='overline' color='error'><b>{t('itemsWillBeDeleted', {number: filteredBoxes.length})}</b></Typography>
              : <Typography variant='overline'>{t('waitBoxesLoading')}</Typography>
            }
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
