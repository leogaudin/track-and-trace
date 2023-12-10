import React, {useContext} from 'react';
import {Menu} from '@mui/icons-material';
import { Stack, SvgIcon } from '@mui/material';
import AppContext from '../../context/AppContext';

export default function TopMenu() {
	  const { user, isMobile, setNavOpen } = useContext(AppContext);

  const handleMenuClick = () => {
    setNavOpen(true);
  };

  if (user) {
	if (!isMobile)
    	return null;
	return (
		<Stack
			direction='row'
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: 1000,
				height: 70,
				width: '100%',
				justifyContent: 'flex-end',
				alignItems: 'center',
			}}
			className=''
		>
			<SvgIcon
				sx={{
					marginTop: 2,
					marginRight: 2,
					padding: 1,
					backgroundColor: 'primary.main',
					borderRadius: '50%',
					color: 'common.white',
				}}
				fontSize='large'
				onClick={handleMenuClick}
			>
				<Menu />
			</SvgIcon>
		</Stack>
	);
  }
}
