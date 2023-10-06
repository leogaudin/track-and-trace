import { Box, Drawer, Select, Stack, SvgIcon, Typography, MenuItem } from '@mui/material';
import { SideNavItem } from './SideNavItem';
import { useLocation } from 'react-router-dom';
import { items } from './constants';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import i18n, { languages } from './constants/language';
import { useTranslation } from 'react-i18next';

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
              icon={<SvgIcon fontSize='small'>{item.icon}</SvgIcon>}
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
  const { isMobile, navOpen, setNavOpen, fetchScans, language, setLanguage } = useContext(AppContext);
  const { t } = useTranslation();

  return (
    location.pathname !== '/login' && location.pathname !== '/register'
    ? <Drawer
        anchor="left"
        open={navOpen}
        onClose={() => setNavOpen(false)}
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
        variant={isMobile ? "temporary" : "permanent"}
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
                  {t('loggedInAs')} <b>{user.displayName}</b>
              </Typography>
            </Stack>
          </Stack>
          : null
        }
      </Stack>
      {content}
      {user
        ?
        <Box component="nav" sx={{ flexGrow: 1, px: 2, py: 3 }}>
          <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', p: 0, m: 0 }}>
            <Select
              label={'Language'}
              defaultValue='en'
              value={language}
              onChange={(event) => {
                setLanguage(event.target.value);
                i18n.changeLanguage(event.target.value);
              }}
              sx={{ color: 'common.white' }}
              variant='standard'
            >
              {languages.map((language) => {
                return (
                  <MenuItem key={language.code} value={language.code}>
                    {language.label}
                  </MenuItem>
                );
              })}
            </Select>
            <SideNavItem
                icon={<SvgIcon><LogoutIcon /></SvgIcon>}
                key={'logout'}
                path={'/logout'}
                disabled
                title={
                  <Typography variant='overline' fontSize={'.9rem'}>{t('logout')}</Typography>
                }
              />
          </Stack>
        </Box>
        : null
      }
    </Drawer>
  : null);
};
