import { useState, useEffect, useContext } from 'react';
import {TextField, Grid, Typography} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MAPBOX_PUBLIC_API_KEY } from '../../../config';
import { MapStore } from '../../lib/store/map/MapContext';
import { SET_SEARCH, SET_VENUES } from '../../lib/store/map/MapTypes';
import { FS_SEARCH_COMPLETION } from '../../lib/store/main/MainTypes';
import foursquareAPI from '../../lib/foursquare'

export const SearchCompletion = () => {
    const { dispatch } = useContext(MapStore);

    const [search, setSearch] = useState('');
    const [searchValues, setSearchValues] = useState([]);

    useDebounce(search, 500, async (value: string) => {
      if (!search || search === '') return;
      if (search.length < 4) return;
      const fsSearchCompletion: any = await foursquareAPI().suggestCompletion({
        near: 'sydney',
        query: search
      });
      if (!fsSearchCompletion || fsSearchCompletion.response.minivenues.length === 0) return;
      setSearchValues(fsSearchCompletion.response.minivenues);
    })

    const dispatchSearch = async (e: any, value: any) => {
      console.log(value)
      // dispatch({
      //     type: FS_SEARCH_COMPLETION,
      //     fsSearchCompletion: value,
      // });
    };
    return (
        <Autocomplete
            className="combo-box-searches"
            options={searchValues ? searchValues : []}
            clearOnEscape={false}
            onChange={(e: any, newValue: any) => dispatchSearch(e, newValue)}
            getOptionLabel={(option: any) => option.name}
            renderInput={(params: any) => (
                <TextField
                    {...params}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    label="Search a venue / establishment"
                    variant="outlined"
                    fullWidth
                />
            )}
            renderOption={option => {
              return (
                <Grid container alignItems="center">
                  <Grid item>
                    <LocationOnIcon />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" color="textSecondary">
                      {option.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {option.location.address}, {option.location.city}, {option.location.country}
                    </Typography>
                  </Grid>
                </Grid>
              );
            }}
        />
    );
};

export const useDebounce = (newVal: any, delay: any, callback: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback(newVal)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [newVal])
}