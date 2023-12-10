import { useState, useEffect } from 'react';
import { SeverityPill } from '../customisation/SeverityPill';
import { getProgress } from '../../service/statistics';
import { colorsMap, getTextsMap } from '../../constants';
import { Stack, Typography, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function BoxFiltering({boxes, setFilteredBoxes}) {
	const {t} = useTranslation();
	const textsMap = getTextsMap();
	const [selectedField, setSelectedField] = useState('');
	const [selectedOption, setSelectedOption] = useState('all');
	const [progressFilter, setProgressFilter] = useState('any');
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

	useEffect(() => {
		setFilteredBoxes(boxes ? boxes : []);
	}, [boxes]);

	useEffect(() => {
		updateFilteredBoxes();
	}, [boxes, progressFilter, selectedField, selectedOption]);

	const availableOptions = boxes ? Object.keys(boxes[0] || {}).filter((field) => !excludedOptions?.includes(field)) : null;

	const updateFilteredBoxes = () => {
		setFilteredBoxes(boxes?.filter((box) =>
			(box[selectedOption] === selectedField || selectedOption === 'all')
			&&
			(getProgress(box.scans) === progressFilter || progressFilter === 'any')
		));
	}

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const handleFieldChange = (event) => {
		setSelectedField(event.target.value);
	};

	const handleProgressChange = (event) => {
		setProgressFilter(event.target.value);
	}

	return (
		<Stack direction={'column'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} style={{marginBottom: 5, marginTop: 5}}>
			<Stack direction={'column'}>
				<Typography textAlign={'center'} variant="overline">{t('filterOptions')}</Typography>
				<Stack direction={'row'} spacing={1} alignItems={'flex-start'}>
					<RadioGroup name="export-options" value={selectedOption} onChange={handleOptionChange} row>
						<FormControlLabel value="all" control={<Radio />} label={t('all')} />
						{availableOptions?.map((field) => (
						<FormControlLabel key={field} value={field} control={<Radio />} label={`${t('by', {item: field})}`} />
						))}
					</RadioGroup>
				</Stack>
			</Stack>
			<Stack direction={'row'} spacing={3}>
			{selectedOption !== 'all' && (
			<Stack direction={'column'}>
				<Typography textAlign={'center'} variant="overline">{t('select', {option: selectedOption})}</Typography>
				<Select
					onChange={handleFieldChange}
					placeholder={`${t('select', {option: selectedOption})}`}
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
			<Stack direction={'column'}>
				<Typography textAlign={'center'} variant="overline">{t('select', {option: t('progress')})}</Typography>
				<Select
					onChange={handleProgressChange}
					placeholder={t('select', {option: t('progress')})}
					defaultValue={'any'}
				>
					<MenuItem value="any">
						<SeverityPill color={colorsMap["noscans"]}>
							{t('any')}
						</SeverityPill>
					</MenuItem>
					{Object.keys(textsMap).map((key) => (
						<MenuItem key={key} value={key}>
							<SeverityPill color={colorsMap[key]}>
								{textsMap[key]}
							</SeverityPill>
						</MenuItem>
					))}
				</Select>
			</Stack>
			</Stack>
		</Stack>
	);
}
