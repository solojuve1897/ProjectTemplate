import React from 'react';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function Modal({
  open,
  handleClose,
  handleSubmit,
  loading,
  title,
  children,
}) {
  const classes = useStyles();
  return (
    <Dialog
      maxWidth='sm'
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Close
        </Button>
        <Button onClick={() => handleSubmit()} color='primary'>
          {loading ? (
            <CircularProgress size={24} className={classes.buttonProgress} />
          ) : (
            'Ok'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
