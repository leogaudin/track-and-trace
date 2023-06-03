import BoxIcon from '@mui/icons-material/Archive';
import ScanIcon from '@mui/icons-material/Scanner';
import ExportIcon from '@mui/icons-material/ImportExport';
import { Home as HomeIcon, Inventory as InventoryIcon, QrCodeScanner as QrCodeScannerIcon, IosShare as IosShareIcon } from '@mui/icons-material'

export const items = [
	{
		title: 'Home',
		path: '/',
		icon: <HomeIcon />
	},
	{
		title: 'Boxes',
		path: '/boxes',
		icon: <InventoryIcon />
	},
	{
		title: 'Scans',
		path: '/scans',
		icon: <QrCodeScannerIcon />
	},
	{
		title: 'Export',
		path: '/export',
		icon: <IosShareIcon />
	},
];

export const homeCardsData = [
  {
    id: 'boxes',
    title: 'Boxes',
    icon: <BoxIcon sx={{ fontSize: 96, marginBottom: 2 }} />,
    route: '/boxes',
  },
  {
    id: 'scans',
    title: 'Scans',
    icon: <ScanIcon sx={{ fontSize: 96, marginBottom: 2 }} />,
    route: '/scans',
  },
  {
    id: 'export',
    title: 'Export',
    icon: <ExportIcon sx={{ fontSize: 96, marginBottom: 2 }} />,
    route: '/export',
  },
];

export const colorsMap = {
	inprogress: 'info',
	delivered: 'success',
	confusing: 'error',
	noscans: 'neutral'
};

export const textsMap = {
	inprogress: 'In Progress',
	delivered: 'Delivered',
	confusing: 'Confusing',
	noscans: 'No Scans Yet'
};
