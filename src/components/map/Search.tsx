import { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MAPBOX_PUBLIC_API_KEY } from '../../../config';
import { MapStore } from '../store/map/MapContext';

export const Search = () => {
    const { dispatch } = useContext(MapStore);

    const [search, setSearch] = useState('');
    const [searchValues, setSearchValues] = useState([]);

    useEffect(() => {
        let mounted = true;
        const searchPlaces = async () => {
            if (!mounted) return;
            if (!search || search === '') return;
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${MAPBOX_PUBLIC_API_KEY}&autocomplete=true`
            );
            const responseJson = await response.json();
            setSearchValues(responseJson.features);
        };
        searchPlaces();
        return () => {
            mounted = false;
        };
    }, [search]);

    const dispatchSearch = (e: any, value: any) => {
        dispatch({
            type: 'SET_SEARCH',
            searchCoordinates: value,
        });
    };
    return (
        <Autocomplete
            className="combo-box-searches"
            options={searchValues ? searchValues : []}
            clearOnEscape={false}
            onChange={(e: any, newValue: any) => dispatchSearch(e, newValue)}
            getOptionLabel={(option: any) => option.place_name}
            renderInput={(params: any) => (
                <TextField
                    {...params}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    label="Search a destination"
                    variant="outlined"
                    fullWidth
                />
            )}
        />
    );
};
