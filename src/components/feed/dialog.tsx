import React from 'react';
import {Button, Grid, Dialog, CardMedia, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { feedData } from './feedData'
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      minWidth: '600px',
      width: '100%'
    },
    media: {
      height: '100px',
      width: '130px',
      margin: theme.spacing(0.5)
    },
    perItem: {
      marginBottom: theme.spacing(3)
    },
    perItemLabel: {
      textTransform: 'uppercase',
      fontSize: '14px'
    }
  })
)
export default ({
  open,
  onClose
}: any) => {
  const classes = useStyles()
  return (
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="draggable-dialog-title"
        className={classes.dialog}
      >
      <div className={classes.dialog}>
        <DialogTitle>
          Add a post
        </DialogTitle>
        <DialogContent>
          <Grid item className={classes.perItem}>
            <Typography className={classes.perItemLabel} variant="body1" component="p">
              Details
            </Typography>
            <TextField
                variant="outlined"
                margin="none"
                required
                fullWidth
                label="Location"
                autoFocus
              />
          </Grid>
          <Grid item className={classes.perItem}>
            <Typography className={classes.perItemLabel} variant="body1" component="p">
              Photos
            </Typography>
            <Grid container>
              {
                feedData.map((item, index) => (
                  <CardMedia
                    key={'media-'+item.id}
                    className={classes.media}
                    image={item.images[0]}
                    title="User avatar"
                  />
                ))
              }
            </Grid>
          </Grid>
          <Grid item className={classes.perItem}>
            <Typography className={classes.perItemLabel} variant="body1" component="p">
              Review
            </Typography>
            <Rating name="size-small" defaultValue={5} size="large" />
            <TextField
                variant="outlined"
                margin="none"
                required
                fullWidth
                label="Comment / review"
                autoFocus
                multiline
                rows={4}
              />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}
