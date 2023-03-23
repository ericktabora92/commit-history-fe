import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  tableContainer: {
    width: '80%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  tableCell: {
    padding: theme.spacing(1),
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
  formInput: {
    marginRight: theme.spacing(2),
  },
}));