import React from 'react';
import MainContainer from '../containers/MainContainer';
import clsx from 'clsx';
import { feedData, users, getUser, feedFavouriteList } from './feedData'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Card, Button, Grid, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Divider } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { red, grey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Dialog from './dialog'
import Router from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 645,
      margin: theme.spacing(1.5, 0),
      cursor: 'pointer'
    },
    mainGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    itemDate: {
        margin: theme.spacing(1, 0, 0),
        textTransform: 'uppercase',
        fontSize: '10px'
    },
    fixedContainer: {
        position: 'fixed',
        margin: theme.spacing(1.5)
    },
    sideCard: {
        marginBottom: theme.spacing(1.5),
        padding: theme.spacing(1)
    },
    gridWrapper: {
        position: 'relative',
        background: grey[300]
    },
    rightGrid: {
        position: 'relative'
    },
    savedPostLabel: {
        textTransform: 'uppercase',
        // fontSize: '10px'
    },
    savedPostList: {
        boxShadow: 'none'
    },
    buttonAddPost: {
        marginBottom: theme.spacing(1.5),
    }
  }),
);

const Feed: React.SFC<{}> = () => {
    const classes = useStyles()
    const [openAddPost, setOpenAddPost] = React.useState(false)
    return (
        <MainContainer>
            <Grid container className={classes.gridWrapper}>
                <Grid item xs={8}>
                    <Grid className={classes.mainGrid}>
                        {
                            feedData.map((item, index) => {
                                return (
                                    <Grid item key={'feed-' + item.id}>
                                        <FeedItem feedItem={item} />
                                    </Grid>
                                )
                            }) 
                        }
                    </Grid>
                </Grid>
                <Grid item className={classes.rightGrid}>
                    <Grid className={classes.fixedContainer}>
                        <Button onClick={() => setOpenAddPost(true)} className={classes.buttonAddPost} color='primary' variant='contained' size='large'>
                            Add a post
                        </Button>
                        <Card className={classes.sideCard}>
                            <Typography className={classes.savedPostLabel} variant="body2" color="textSecondary" component="p" >Your saved posts:</Typography>
                            {
                                feedData.map((item, index) => {
                                    if (index > 2) return
                                    return (
                                    <Grid item key={'favourite-' + item.id}>
                                        <Card className={classes.savedPostList}>
                                            <CardHeader
                                                avatar={
                                                <Avatar aria-label="user-avatar" src={getUser(item.user).avatar} />
                                                }
                                                action={
                                                <IconButton aria-label="settings">
                                                    <FavoriteIcon />
                                                </IconButton>
                                                }
                                                title={getUser(item.user).name}
                                                subheader={item.location}
                                            />
                                        </Card>
                                        {index < 2 && <Divider />}
                                    </Grid>
                                    )
                                })
                            }
                        </Card>
                        <Card className={classes.sideCard}>
                            <Typography className={classes.savedPostLabel} variant="body2" color="textSecondary" component="p" >Your favourite list:</Typography>
                            {
                                feedFavouriteList.map((item, index) => {
                                    if (index > 2) return
                                    return (
                                    <Grid item key={'favourite-' + item.id}>
                                        <Card className={classes.savedPostList}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="user-avatar" src={item.flag} />
                                                }
                                                title={item.name}
                                            />
                                        </Card>
                                        {index < 2 && <Divider />}
                                    </Grid>
                                    )
                                })
                            }
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={openAddPost} onClose={() => setOpenAddPost(false)} />
        </MainContainer>
    )
}

const AddPost = () => {

}

const FeedItem = ({
    feedItem
}: any) => {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false);
    const [expandedComment, setExpandedComment] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleCommentExpandClick = () => {
        setExpandedComment(!expandedComment);
    };
    return (
        <Card className={classes.card} onClick={() => Router.push('/feed/view')}>
            <CardHeader
                avatar={
                <Avatar aria-label="user-avatar" src={getUser(feedItem.user).avatar} />
                }
                action={
                <IconButton aria-label="settings">
                    <FavoriteIcon />
                </IconButton>
                }
                title={getUser(feedItem.user).name}
                subheader={feedItem.location}
            />
            <CardMedia
                className={classes.media}
                image={feedItem.images[0]}
                title="User avatar"
            />
            <CardContent>
                <Rating name="size-small" defaultValue={feedItem.rating} disabled size="small" />
                <Typography variant="body1" color="textSecondary" component="p">
                    {feedItem.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" noWrap>
                {feedItem.comment}
                </Typography>
                <Typography className={classes.itemDate} variant="body2" color="textSecondary" component="p">
                {feedItem.date}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton 
                    aria-label="add to favorites"
                    onClick={handleCommentExpandClick}
                >
                    <MessageIcon /> 
                    <Typography variant="body2" color="textSecondary" component="p">
                        (20)
                    </Typography>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography >
                        {feedItem.comment}
                    </Typography>
                </CardContent>
            </Collapse>
            <Collapse in={expandedComment} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {feedItem.comment}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default Feed;