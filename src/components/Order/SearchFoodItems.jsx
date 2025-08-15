import React, {useState,useEffect} from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import {ListItemSecondaryAction, IconButton, InputBase, List, ListItem, ListItemText, Paper, makeStyles, colors} from '@material-ui/core';
import  SearchTwoTone from '@material-ui/icons/SearchTwoTone';
import  ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PlusOneIcon from "@material-ui/icons/PlusOne";

const useStyles = makeStyles (theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',

    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex:1,

    },
    listRoot:  {
        padding: theme.spacing(2),
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: theme.spacing(1),
        borderRadius: theme.spacing(1),
        width: '100%', 
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3',
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',

        },
        '& .MuiButtonBase-root': {
            display: 'none',
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor:'transparent',  
        }  
    },

    searchField: {
        marginBottom: theme.spacing(2)
    }
}))

export default function SearchFoodItems(props) {
    const { values,setValues} = props;
    let orderedFoodItems = values.orderDetails;
    const [foodItems, setFoodItems] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();
    useEffect(() => {

        createAPIEndpoint(ENDPOINTS.FOODITEM).fetchAll()
        .then(res => {
            setFoodItems(res.data);
            //using by search to filter through my data
            setSearchList(res.data);

        })
        .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        let x = [...foodItems];
        x = x.filter( y => {
            return y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase())
            && orderedFoodItems.every(item => item.foodItemId != y.foodItemId);

        });
        setSearchList(x);
    }, [searchKey,orderedFoodItems])

    const addFoodItem = foodItem => {
  let x ={
    orderMasterId : values.orderMasterId,
    orderDetailId : 0,
    foodItemId : foodItem.foodItemId,
    quantity: 1,
    foodItemPrice: foodItem.price,
    foodItemName: foodItem.foodItemName
  }
  setValues({
    ...values,
    orderDetails : [...values.orderDetails, x]
  })
 }

  return (
    <>
    <Paper className={classes.searchPaper}>
        <InputBase
        value={searchKey}
        onChange={e => setSearchKey(e.target.value)}
        className={classes.searchInput}
        placeholder='Search food items' />
        <IconButton>
            <SearchTwoTone />

        </IconButton>
    </Paper>
    <List className={classes.listRoot}>
        {
            searchList.map((item,idx) => (
                <ListItem 
                key={idx}
                onClick={e => addFoodItem(item)}>
                    <ListItemText
                    primary={item.foodItemName}
                    secondary={'£ '+item.price}/>
                    <ListItemSecondaryAction>
                        <IconButton onClick={e => addFoodItem(item)}>
                            <PlusOneIcon  />
                           
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))
        }
    </List>
    </>
  )
}
