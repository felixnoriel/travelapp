import { useEffect, useState } from 'react'
import Router from 'next/router'
import foursquareAPI from '../../lib/foursquare'
import { feedData, getUser, testVenue } from './feedData'
import { MAPBOX_PUBLIC_API_KEY, REST_API_URL } from '../../../config';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, Popup } from 'react-map-gl';
import clsx from 'clsx';
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
import Dialog from './dialog';
import { PersonPinCircleTwoTone, Room } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(1.5, 0),
      cursor: 'pointer'
    },
    mainGrid: {
        width: '100%',
        marginTop: theme.spacing(18),
        paddingLeft: theme.spacing(1)
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    itemDate: {
        margin: theme.spacing(1, 0, 0),
        textTransform: 'uppercase',
        fontSize: '10px'
    },
    sideCard: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(1)
    },
    gridWrapper: {
        position: 'relative',
        background: 'white'
    },
    container: {
      maxWidth: '1200px',
      // padding: theme.spacing(3),
      margin: 'auto'
    },
    rightGrid: {
      position: 'relative',
      marginTop: theme.spacing(18)
    },
    fixedContainer: {
      position: 'fixed',
      width: '100%',
      maxWidth: '300px',
      margin: theme.spacing(0, 1.5)
    },
    establishmentInfoWrapper: {
      position: 'relative',
    },
    establishmentInfo: {
      maxWidth: '1100px',
      padding: theme.spacing(3, 0, 0),
      margin: 'auto',
      position: 'fixed',
      zIndex: 1,
      background: 'white',
      // height: '300px'
    },
    savedPostLabel: {
        textTransform: 'uppercase',
        // fontSize: '10px'
    },
    savedPostList: {
        boxShadow: 'none',
    },
    savedPostItem: {
      padding: theme.spacing(1)
    },
    buttonAddPost: {
        marginBottom: theme.spacing(1.5),
    }
  }),
);

export default () => {
    const classes = useStyles()
    const [openAddPost, setOpenAddPost] = useState(false)
    const [venue, setVenue] = useState(testVenue)
    // useEffect(() => {
    //   const getVenue = async () => {
    //     const searchVenue: any = await foursquareAPI().getVenue({
    //       venue_id: '5b35eb6de179100039e987b4'
    //     });
    //     setVenue(searchVenue.response.venue)
    //   }
    //   getVenue();
    // }, [])

    return (
      <Grid className={classes.gridWrapper}>
        <Grid container className={classes.container}>
          <Grid item className={classes.establishmentInfoWrapper}>
            <EstablishmentInfo venue={venue} />
          </Grid>
          <Grid item xs={8}>
              <Grid className={classes.mainGrid}>
                <Typography variant='h5'>
                  Recent posts
                </Typography>
                <FeedItem feedItem={feedData[4]} />
                <FeedItem feedItem={feedData[5]} />
              </Grid>
          </Grid>
          <Grid item xs={4} className={classes.rightGrid}>
              <Grid className={classes.fixedContainer}>
                  <Card className={classes.sideCard}>
                      <EstablishmentDetails venue={venue} />
                  </Card>
                  <Card className={classes.sideCard}>
                      <Typography style={{textTransform: 'uppercase'}}>
                      <strong>25</strong> <span style={{fontSize: '13px'}}>of your friends have been here</span>
                      </Typography>
                      {
                            feedData.map((item, index) => {
                                if (index > 2) return
                                return (
                                <Grid item key={'favourite-' + item.id}>
                                    <Card className={classes.savedPostList}>
                                        <CardHeader
                                            className={classes.savedPostItem}
                                            avatar={
                                            <Avatar aria-label="user-avatar" src={getUser(item.user).avatar} />
                                            }
                                            title={getUser(item.user).name}
                                        />
                                    </Card>
                                    {index < 2 && <Divider />}
                                </Grid>
                                )
                            })
                        }
                      <Button color='primary'>See all</Button>      
                  </Card>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
}
const EstablishmentInfo  = ({venue}: any) => {
  const classes = useStyles()
  if (!venue) return null
  return (
    <Grid className={classes.establishmentInfo}>
      <Typography variant='h3'>
        {venue.name} 🇦🇷
      </Typography>
      <Typography variant='body1'>
        {venue.description}
      </Typography>
    </Grid>
  )
}
const EstablishmentDetails = ({venue}: any) => {
  const classes = useStyles()
  const [venueCoords, setVenueCoords] = useState({
    latitude: venue.location.lat,
    longitude: venue.location.lng,
    zoom: 14,
  })

  if (!venue) return null
  return (
    <>
      <Typography>Phone: {venue.contact.phone}</Typography>
      <ReactMapGL
        {...venueCoords}
        onViewportChange={(value: any) => setVenueCoords(value)}
        mapboxApiAccessToken={MAPBOX_PUBLIC_API_KEY}
        mapStyle="mapbox://styles/felixnoriel/ck6vlqwcw0o2z1jqvylhi32jr?optimize=true"
        width={'100%'}
        height={'300px'}
      >
        <Marker longitude={venue.location.lng} latitude={venue.location.lat}>
          <Room color='secondary' fontSize="large"/>
        </Marker>
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          <NavigationControl />
        </div>
      </ReactMapGL>
      <Typography variant='body1' style={{fontSize:'14px'}}>
        <strong>Mon–Thu, Sun</strong> 5:00 PM–10:00 PM
      </Typography>
      <Typography variant='body1' style={{fontSize:'14px', marginBottom: '10px'}}>
        <strong>Fri–Sat</strong> 5:00 PM–11:30 PM
      </Typography>
      <Typography style={{fontSize: '14px'}}>{venue.location.formattedAddress[0]}, {venue.location.formattedAddress[1]}</Typography>
    </>
  )
}

const FriendsWithPosts = () => {

}
const FeedItem = ({feedItem}: any) => {
  const classes = useStyles()
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
        subheader={feedItem.date}
      />
      <CardMedia
        className={classes.media}
        image={feedItem.images[0]}
        title="User avatar"
      />
      <CardContent>
        <Rating name="size-small" defaultValue={feedItem.rating} disabled size="small" />
        <Typography variant="body1" color="textSecondary" component="p">
          <strong>{feedItem.price}</strong>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {feedItem.comment}
        </Typography>
        <Typography style={{marginTop: '10px'}} variant="body1" color="textSecondary" >
          <strong>Tips / Recommendation</strong>
        </Typography>
        <Typography variant="body2" color="textSecondary" >
          First time in this place. Although only had lunch set, I was quite happy with the quality and portion. Sirloin was tender and tasty. Ingredients taste fresh. will come back and try Yakiniku next time for sure!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <IconButton 
            aria-label="add to favorites"
          >
            <MessageIcon /> 
            <Typography variant="body2" color="textSecondary" component="p">
                (20) Comment
            </Typography>
          </IconButton>
          <IconButton aria-label="share">
              <ShareIcon /> <Typography variant="body2" color="textSecondary" component="p">
                Share
            </Typography>
          </IconButton>
      </CardActions>
  </Card>
  )
}

/*
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
                      */
