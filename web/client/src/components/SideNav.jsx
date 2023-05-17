import { Box, Drawer, Stack, SvgIcon, Typography } from '@mui/material';
import { SideNavItem } from './SideNavItem';
import { useLocation } from 'react-router-dom';
import { items } from './NavItems';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SIDE_NAV_WIDTH = 200;

const getContent = (location, items) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: SIDE_NAV_WIDTH }}>
      <Box component="nav" sx={{ flexGrow: 1, px: 2, py: 3 }}>
        <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {items.map(item => {
            const active = item.path && location.pathname === item.path;
            return <SideNavItem
              active={active}
              disabled={item.disabled}
              external={item.external}
              icon={item.icon}
              key={item.title}
              path={item.path}
              title={item.title}
            />
          })}
        </Stack>
      </Box>
    </Box>
  )
}

export const SideNav = () => {
  const location = useLocation();
  const content = getContent(location, items);
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    location.pathname !== '/login' && location.pathname !== '/register'
    ? <Drawer
      anchor="left"
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: SIDE_NAV_WIDTH
        }
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + 100,
        width: SIDE_NAV_WIDTH
      }}
      variant="permanent"
    >
    <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', p: 0, m: 0 }}>
    {user ?
          <Stack
            direction={'column'}
            component="li"
            spacing={0.5}
            alignItems={'center'}
            sx={{
              listStyle: 'none',
              p: '16px'
            }}
            >
            <SvgIcon style={{marginRight: 7}}><AccountCircleIcon /></SvgIcon>
            <Stack maxWidth={'100%'}>
              <Typography
                variant='overline'
                fontSize={'.7rem'}
                textAlign={'center'}
                style={{ wordWrap: "break-all"}}
                >
                  Logged in as <b>{user.displayName}</b>
              </Typography>
            </Stack>
          </Stack>
          : null}
      </Stack>
      {content}
      {user
        ? <Box component="nav" sx={{ flexGrow: 1, px: 2, py: 3 }}>
        <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', p: 0, m: 0 }}>
          <SideNavItem
              icon={<SvgIcon><LogoutIcon /></SvgIcon>}
              key={'logout'}
              path={'/logout'}
              disabled
              title={
                <Typography variant='overline' fontSize={'.9rem'}>Logout</Typography>
              }
            />
        </Stack>
      </Box>
      : null
      }
    </Drawer>
  : null);
};
