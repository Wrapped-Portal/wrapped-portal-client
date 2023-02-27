/** @format */

import { createStyles } from '@mantine/core';
import { useSelector } from 'react-redux';

export const useStyles = createStyles((theme, _params, _getRef) => {
  const { screenHeight } = useSelector((state) => state.screenHeightSlice);
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    sidebar: {
      position: 'fixed',
      right: theme.spacing.md * 2, // update this value
      top: 0,
      bottom: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
      width: 250,
      height: screenHeight,
      zIndex: 1,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: 'green',
        }).background,
        color: theme.fn.variant({ variant: 'light', color: 'green' }).color,
      },
    },
  };
});
