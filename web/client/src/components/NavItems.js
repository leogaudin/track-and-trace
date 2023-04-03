import { SvgIcon } from '@mui/material';
import { Home as HomeIcon, Inventory as InventoryIcon } from '@mui/icons-material'

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
];
