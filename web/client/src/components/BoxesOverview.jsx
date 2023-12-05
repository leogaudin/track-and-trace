import { useState, useContext, useEffect } from 'react';
import BoxSummary from './BoxSummary';
import { SeverityPill } from './SeverityPill';
import { timeAgo } from '../service/timeAgo'
import TableCard from './TableCard';
import { getProgress } from '../service/statistics';
import { colorsMap, getTextsMap } from './constants';
import { Skeleton, useMediaQuery, Stack, Typography, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import AppContext from '../context/AppContext';
import { useTranslation } from 'react-i18next';

export default function BoxesOverview({ pageSize = 10 }) {
	const [boxDialogOpen, setBoxDialogOpen] = useState(false);
	const [boxID, setBoxID] = useState('');
	const isMobile = !useMediaQuery(theme => theme.breakpoints.up('lg'));
	const {boxes, scans} = useContext(AppContext);
	const textsMap = getTextsMap();
	const [selectedField, setSelectedField] = useState('');
	const [selectedOption, setSelectedOption] = useState('all');
	const [filteredBoxes, setFilteredBoxes] = useState(boxes);
	const [progressFilter, setProgressFilter] = useState('noscans');
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
	}, [boxes]);

	useEffect(() => {
		updateFilteredBoxes();
	}, [progressFilter, selectedField, selectedOption]);

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
		<TableCard
			contentName={t('boxes').toLowerCase()}
			columns={
				isMobile
				? [t('id'), t('recipient'), t('status')]
				: [t('id'), t('project'), t('recipient'), t('created'), t('status')]

			}
			rows={filteredBoxes ? filteredBoxes.map((box) => {
				const boxScans = scans ? scans.filter(scan => { return scan.boxId === box.id }) : null;
				const progress = getProgress(boxScans);
				if (isMobile)
					return [
						box.id,
						box.school,
						<SeverityPill color={colorsMap[progress]}>
							{textsMap[progress]}
						</SeverityPill>
					]
				else
					return [
						box.id,
						box.project,
						box.school,
						timeAgo(box.createdAt),
						<SeverityPill color={colorsMap[progress]}>
							{textsMap[progress]}
						</SeverityPill>
					]
			}) : null}
			pageSize={pageSize}
			setDialogOpen={setBoxDialogOpen}
			setSelectedItem={setBoxID}
		>
			<Stack direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'} width={'100%'}>
				<Stack direction={'column'}>
					<Typography variant="overline">{t('filterOptions')}</Typography>
					<Stack direction={'row'} spacing={1} alignItems={'flex-start'}>
						<RadioGroup name="export-options" value={selectedOption} onChange={handleOptionChange} row>
							<FormControlLabel value="all" control={<Radio />} label={t('all')} />
							{availableOptions?.map((field) => (
							<FormControlLabel key={field} value={field} control={<Radio />} label={`${t('by', {item: field})}`} />
							))}
						</RadioGroup>
					</Stack>
				</Stack>
				{selectedOption !== 'all' && (
				<Stack direction={'column'}>
					<Typography variant="overline">{t('select', {option: selectedOption})}</Typography>
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
					<Typography variant="overline">{t('select', {option: t('progress')})}</Typography>
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
						<MenuItem value="noscans">
							<SeverityPill color={colorsMap["noscans"]}>
								{textsMap["noscans"]}
							</SeverityPill>
						</MenuItem>
						<MenuItem value="inprogress">
							<SeverityPill color={colorsMap["inprogress"]}>
								{textsMap["inprogress"]}
							</SeverityPill>
						</MenuItem>
						<MenuItem value="delivered">
							<SeverityPill color={colorsMap["delivered"]}>
								{textsMap["delivered"]}
							</SeverityPill>
						</MenuItem>
						<MenuItem value="confusing">
							<SeverityPill color={colorsMap["confusing"]}>
								{textsMap["confusing"]}
							</SeverityPill>
						</MenuItem>
					</Select>
				</Stack>
			</Stack>
			<BoxSummary
				id={boxID}
				open={boxDialogOpen}
				setOpen={setBoxDialogOpen}
			/>
		</TableCard>
	);
}
