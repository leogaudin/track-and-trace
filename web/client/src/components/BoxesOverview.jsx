import React, { useState, useContext, useMemo } from 'react';
import BoxSummary from './BoxSummary';
import { SeverityPill } from './customisation/SeverityPill';
import { timeAgo } from '../service/timeAgo'
import TableCard from './reusable/TableCard';
import { getProgress } from '../service/statistics';
import { colorsMap, getTextsMap } from '../constants';
import AppContext from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import BoxFiltering from './controls/BoxFiltering';

function BoxesOverview({ pageSize = 10 }) {
	const [boxDialogOpen, setBoxDialogOpen] = useState(false);
	const [boxID, setBoxID] = useState('');
	const {boxes, scans, isMobile} = useContext(AppContext);
	const textsMap = getTextsMap();
	const [filteredBoxes, setFilteredBoxes] = useState([]);
	const { t } = useTranslation();

	const rows = useMemo(() => {
		return filteredBoxes
		  ? filteredBoxes.map((box) => {
			  const boxScans = scans ? scans.filter((scan) => scan.boxId === box.id) : null;
			  const progress = getProgress(boxScans);
			  return isMobile
				? [box.id, box.school, <SeverityPill color={colorsMap[progress]}>{textsMap[progress]}</SeverityPill>]
				: [
					box.id,
					box.project,
					box.school,
					timeAgo(box.createdAt),
					<SeverityPill color={colorsMap[progress]}>{textsMap[progress]}</SeverityPill>,
				  ];
			})
		  : null;
	  }, [filteredBoxes, isMobile]);

	return (
		<TableCard
			contentName={t('boxes').toLowerCase()}
			columns={
				isMobile
				? [t('id'), t('recipient'), t('status')]
				: [t('id'), t('project'), t('recipient'), t('created'), t('status')]
			}
			rows={rows}
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

export default React.memo(BoxesOverview);
