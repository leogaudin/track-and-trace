import React, { useState, useEffect, useContext } from 'react';
import { Card, RadioGroup, Radio, FormControlLabel, Stack, Typography, Select, MenuItem, CardContent, Box } from '@mui/material';
import HTMLExport from '../components/HTMLExport';
import AppContext from '../context/AppContext';

export default function Export() {
  const [selectedOption, setSelectedOption] = useState('all');
  const {boxes} = useContext(AppContext);
  const [filteredBoxes, setFilteredBoxes] = useState(boxes);
  const [selectedField, setSelectedField] = useState('');
  const [loading, setLoading] = useState(true);
  const excludedFields = [
    '_id',
    'id',
    'school',
    'htName',
    'htPhone',
    'institutionType',
    'adminId',
    'createdAt',
    '__v'
  ];

  useEffect(() => {
    setFilteredBoxes(boxes);
    setLoading(false);
  }, [boxes]);

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);

    if (option === 'all') {
      setSelectedField('');
      setFilteredBoxes(boxes);
    } else {
      setSelectedField(availableFields[0]);
      const filtered = boxes.filter((box) => box[option] === availableFields[0]);
      setFilteredBoxes(filtered);
    }
  };

  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);

    const filtered = boxes.filter((box) => box[selectedOption] === event.target.value);
    setFilteredBoxes(filtered);
  };

  const availableFields = Object.keys(boxes[0] || {}).filter((field) => !excludedFields?.includes(field));

  const getFolderName = () => {
	const title = selectedOption === 'all' ? '' : `-${selectedOption}-${selectedField}`;
    return `Boxes${title}`;

  };

  if (!boxes)
    return (
      <Box paddingX={'15vw'} paddingY={'10vh'} width={'100%'}>
        <Card style={{ width: '100%', height: '100%', overflow: 'auto', alignItems: 'center' }}>
          <CardContent>
            <Typography variant="overline">No boxes found</Typography>
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
              <Typography variant="overline">Export options</Typography>
              <RadioGroup name="export-options" value={selectedOption} onChange={handleOptionChange}>
                <FormControlLabel value="all" control={<Radio />} label="All" />
                {availableFields.map((field) => (
                  <FormControlLabel key={field} value={field} control={<Radio />} label={`By ${field}`} />
                ))}
              </RadioGroup>
            </Stack>
            {selectedOption !== 'all' && (
              <Stack direction={'column'} spacing={1} alignItems={'center'}>
                <Typography variant="overline">Select {selectedOption}</Typography>
                <Select
                  onChange={handleFieldChange}
                  placeholder={`Select ${selectedOption}`}
                  sx={{ marginBottom: '1rem' }}
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
                ? <Typography variant='overline'><b>{filteredBoxes.length}</b> items will be exported.</Typography>
                : <Typography variant='overline'>Please wait while the boxes are loading...</Typography>
              }
              <HTMLExport objects={filteredBoxes} folderName={getFolderName()} />
            </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
