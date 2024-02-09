import BoxIcon from '@mui/icons-material/Archive';
import ScanIcon from '@mui/icons-material/Scanner';
import ExportIcon from '@mui/icons-material/ImportExport';
import { Home as HomeIcon, Inventory as InventoryIcon, QrCodeScanner as QrCodeScannerIcon, IosShare as IosShareIcon, Delete as DeleteIcon } from '@mui/icons-material'
import i18n from './language';

export function getItems() {
	return [
		{
			title: i18n.t('home'),
			path: '/',
			icon: <HomeIcon />
		},
		{
			title: i18n.t('boxes'),
			path: '/boxes',
			icon: <InventoryIcon />
		},
		{
			title: i18n.t('scans'),
			path: '/scans',
			icon: <QrCodeScannerIcon />
		},
		{
			title: i18n.t('export'),
			path: '/export',
			icon: <IosShareIcon />
		},
		{
			title: i18n.t('delete'),
			path: '/delete',
			icon: <DeleteIcon />
		},
	];
}

export function getTextsMap() {
	return {
		noscans: i18n.t('noscans'),
		inprogress: i18n.t('inprogress'),
		delivered: i18n.t('delivered'),
		confusing: i18n.t('confusing'),
	};
}

export const colorsMap = {
	inprogress: 'info',
	delivered: 'success',
	confusing: 'error',
	noscans: 'neutral'
};
