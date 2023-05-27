import { SvgIcon } from '@mui/material';
import { Home as HomeIcon, Inventory as InventoryIcon, QrCodeScanner as QrCodeScannerIcon, IosShare as IosShareIcon } from '@mui/icons-material'
export const items = [
	{
		title: 'Home',
		path: '/',
		icon: (
			<SvgIcon fontSize="small">
				<HomeIcon />
			</SvgIcon>
		)
	},
	{
		title: 'Boxes',
		path: '/boxes',
		icon: (
			<SvgIcon fontSize="small">
				<InventoryIcon />
			</SvgIcon>
		)
	},
	{
		title: 'Scans',
		path: '/scans',
		icon: (
			<SvgIcon fontSize="small">
				<QrCodeScannerIcon />
			</SvgIcon>
		)
	},
	{
		title: 'Export',
		path: '/export',
		icon: (
			<SvgIcon fontSize="small">
				<IosShareIcon />
			</SvgIcon>
		)
	},
];
