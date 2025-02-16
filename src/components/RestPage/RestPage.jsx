import React, { useEffect } from 'react';
import { FormControlLabel, Box, Grid, Button, Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getRestaurant, getRestaurants } from '../../actions/restaurants';
import useStyles from './styles';

import BulletinBoard from './bulletin';
import MapContainer from '../MapContainer/mapContainer';
import MyCalendar from '../Calendar/calendar';


const RestaurantPage = () => {
    const { restaurants, isLoading } = useSelector((state) => state.restaurants);
    const dispatch = useDispatch();
    const history = useHistory();
    const styles = useStyles();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getRestaurants());
    }, []);

    // Find the restaurant with the id from the restaurants array
    // This should be changed to use the getRestaurant action at some point
    const restaurant = restaurants.find((restaurant) => restaurant._id === id);


    if (isLoading) {
        return (
            <Paper elevation={6} className={styles.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    } else {

        return (
            <div className={styles.container}>

                    <Typography variant="h4" className={styles.center}>{restaurant.name}</Typography>
                    <Divider style={{ width: '100%', margin: '20px 0' }} />

                <div className={styles.subtitles}>
                    <div>{restaurant.dinein ? <Typography variant="subtitle2" className={styles.subtitles}>Dine In</Typography> : null}</div>
                    <div>{restaurant.takeout ? <Typography variant="subtitle2" className={styles.subtitles}>Take Out</Typography> : null}</div>
                    <div>{restaurant.delivery ? <Typography variant="subtitle2" className={styles.subtitles}>Delivery</Typography> : null}</div>
                </div>

                <div className={styles.tags}>
                <div>Tags: </div>
                {restaurant.tags.map((tag) => ( 
                        <Typography className={styles.tags} variant="subtitle5">{`#${tag}`} </Typography>
                ))}
                </div>

                {/* Left side of profile */}

                <div className={styles.right}>

                    <div className={styles.left}>
                        <div className={styles.imageSection}>
                        
                            {/* Uploaded image */}
                            {restaurant.photo !== "None" ? (
                            <img className={styles.pic} src={restaurant.photo}  alt={restaurant.title}/>) : 
                            <img className={styles.nopic} src={'https://blog.utc.edu/news/files/2014/03/power-c.jpg'}
                                alt={restaurant.title} />}
                        </div>
                    </div>

                    {/* Right side of profile */}

                    <div className={styles.section}>
                        <Typography gutterBottom variant="h5">Restaurant Hours</Typography>
                        <Typography gutterBottom variant="subtitle2"> Sunday: {restaurant.businessHoursStart[0]} - {restaurant.businessHoursEnd[0]}  </Typography>
                        <Typography gutterBottom variant="subtitle2"> Monday: {restaurant.businessHoursStart[1]} - {restaurant.businessHoursEnd[1]}  </Typography>
                        <Typography gutterBottom variant="subtitle2"> Tuesday: {restaurant.businessHoursStart[2]} - {restaurant.businessHoursEnd[2]}  </Typography>
                        <Typography gutterBottom variant="subtitle2"> Wednesday: {restaurant.businessHoursStart[3]} - {restaurant.businessHoursEnd[3]}  </Typography>
                        <Typography gutterBottom variant="subtitle2"> Thursday: {restaurant.businessHoursStart[4]} - {restaurant.businessHoursEnd[4]}  </Typography>
                        <Typography gutterBottom variant="subtitle2"> Friday: {restaurant.businessHoursStart[5]} - {restaurant.businessHoursEnd[5]}  </Typography>
                        <Typography gutterBottom variant="subtitle2"> Saturday: {restaurant.businessHoursStart[6]} - {restaurant.businessHoursEnd[6]}  </Typography>
                    </div>                   
                    
                    <div className={styles.section}>
                        <Typography gutterBottom variant="h5">Contact Info</Typography>
                        <Typography gutterBottom variant="subtitle2">{restaurant.address}</Typography>
                        <Typography gutterBottom variant="subtitle2">{restaurant.city}, {restaurant.state} {restaurant.zip}</Typography>
                        <Typography gutterBottom variant="subtitle2">{restaurant.phone}</Typography>
                    </div>
                    
                </div>

    {/* Menu link */}
            <Divider style={{ width: '100%', margin: '20px 0' }} />
            
            {restaurant.menuLink !== "None" ? (
                <div className={styles.center}>
                    <Button variant="contained" color="primary" href={restaurant.menuLink}>
                        See our menu
                    </Button>
                </div>) : null}
            <Divider style={{ width: '100%', margin: '20px 0' }} />

    {/* Calendar and Map Containers */}
            <section className={styles.section}>
                <div className={styles.calendarandmap}>
                    <MyCalendar/>
                    <MapContainer/>
                </div>
            </section>

            <Divider style={{ margin: '20px 0' }} />
          <BulletinBoard restaurant={restaurant} />
               

            </div>
            
        );
    };
};

export default RestaurantPage;

