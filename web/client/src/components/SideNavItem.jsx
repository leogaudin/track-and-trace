import { Box, ButtonBase } from '@mui/material';
import { Link } from 'react-router-dom'

function getLinkProps(path, external) {
  if (path) {
    if (external) {
      return {
        component: 'a',
        href: path,
        target: '_blank'
      };
    } else {
      return {
        component: Link,
        to: path
      };
    }
  } else {
    return {};
  }
}

function getButtonBaseSx(active) {
  return {
    alignItems: 'center',
    borderRadius: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    pl: '16px',
    pr: '16px',
    py: '6px',
    textAlign: 'left',
    width: '100%',
    ...(active && {
      backgroundColor: 'rgba(255, 255, 255, 0.04)'
    }),
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.04)'
    }
  };
}

function getIconBoxSx(active) {
  return {
    alignItems: 'center',
    color: 'neutral.400',
    display: 'inline-flex',
    justifyContent: 'center',
    mr: 2,
    ...(active && {
      color: 'primary.main'
    })
  };
}

function getTitleBoxSx(active, disabled) {
  return {
    color: 'neutral.400',
    flexGrow: 1,
    fontFamily: (theme) => theme.typography.fontFamily,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '24px',
    whiteSpace: 'nowrap',
    ...(active && {
      color: 'common.white'
    }),
    ...(disabled && {
      color: 'neutral.500'
    })
  };
}

export const SideNavItem = ({ active = false, disabled, external, icon, path, title }) => {
  const linkProps = getLinkProps(path, external);
  const buttonBaseSx = getButtonBaseSx(active);
  const iconBoxSx = getIconBoxSx(active);
  const titleBoxSx = getTitleBoxSx(active, disabled);

  return (
    <li>
      <ButtonBase sx={buttonBaseSx} {...linkProps}>
        {icon && (
          <Box component="span" sx={iconBoxSx}>
            {icon}
          </Box>
        )}
        <Box component="span" sx={titleBoxSx}>
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};
