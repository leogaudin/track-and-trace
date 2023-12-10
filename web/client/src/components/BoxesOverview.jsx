import { useState, useContext, useEffect } from 'react';
import BoxSummary from './BoxSummary';
import { SeverityPill } from './customisation/SeverityPill';
import { timeAgo } from '../service/timeAgo'
import TableCard from './reusable/TableCard';
import { getProgress } from '../service/statistics';
import { colorsMap, getTextsMap } from '../constants';
import { Skeleton, useMediaQuery, Stack, Typography, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import AppContext from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import BoxFiltering from './controls/BoxFiltering';

export default function BoxesOverview({ pageSize = 10 }) {
	const [boxDialogOpen, setBoxDialogOpen] = useState(false);
	const [boxID, setBoxID] = useState('');
	const {boxes, scans, isMobile} = useContext(AppContext);
	const textsMap = getTextsMap();
	const [filteredBoxes, setFilteredBoxes] = useState(boxes);
	const { t } = useTranslation();

	if (boxes)
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
				<BoxFiltering boxes={boxes} setFilteredBoxes={setFilteredBoxes} />
				<BoxSummary
					id={boxID}
					open={boxDialogOpen}
					setOpen={setBoxDialogOpen}
				/>
			</TableCard>
		);
}
