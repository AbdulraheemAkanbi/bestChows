import { List,ListItemText,Paper, ListItem,ListItemSecondaryAction,IconButton,ButtonGroup,Button,makeStyles } from '@material-ui/core';
import React from 'react';
import {roundTo2DecimalPoint} from '../../utils'
import  DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

const useStyles = makeStyles(theme => ({
    paperRoot: {
        marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%',

        },
        width: '100%',
        '&:hover $deleteButton': {
            display: 'block'
        }
    },
    buttonGroup:{
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        '& .MuiButtonBase-root': {
            border: 'none',
            minWidth: '25px',
            padding: '1px'
        },

        '& button:nth-child(2)': {
            fontSize: '1.2em',
            color: '#000'
        }
    },
    deleteButton:{
        display: 'none',
        '& .MuiButtonBase-root': {
            color: '#E81719'
        },
    },
    totalPerItem:{
        fontWeight: 'bolder',
        fontSize:'1.2em',
        margin: '0px 10px'
    },

    selectFoodItemIcon: {
        alignItems:"center"
    }

}))

export default function OrderedFoodItems(props) {
    const {values, setValues } = props;
    const classes = useStyles();

        let orderedFoodItems = values.orderDetails;

        const removeFoodItem = (index,id) => {
  let x = {...values};
  x.orderDetails = x.orderDetails.filter((_,i) => i != index );
  if (id != 0) 
    x.deletedOrderItemsIds += id + ',';
  setValues({...x});
 }

    const updateQuantity = (idx,value) => {
        let x  = {...values};
        let foodItems = x.orderDetails[idx];
        if(foodItems.quantity + value > 0) { 
        foodItems.quantity += value;
        setValues({...x })
    }
}
  return (
    <List>
            {orderedFoodItems.length==0 ? 
             <ListItem>
                <div  className='flex flex-col items-end mt-12 p-12'>
                    <img className='mb-2 ' 
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABTVBMVEX///8AAACtZkNJkVTrQj/3sDCMUjd6SDCQVDlJKx3UkHOwaERuQCv/0zqzaUV/SzFPLx9Mlld0dHQcNyBnPCjFNzWOjo6fLStIjlKG
                    hobCwsJhYWGxvXAzHhTyREE+Pj6sMC7mQT7/2jxzIB9PFhUrVTGhbVdRNyzWPDm8gGadXT12UECKJyUqGRBEh057IyGtra0TCwheQxJhUBbbnCuGbx7CiiZxUBbiuzOCXBmns2rIpi4wMx50YBvPkyg+JRgiFA
                    0VKRjsqC7e3t6QYU4IDwkNGg8xYThcNiQ+NA40JQqpeCE5ckKfn5/w8PBjHBtNTU0kSCo9KwzowDVXPhEgFgYQIROXbB0aGhpY
                    WFi/v7+pqanNi289KiE8ERAzMzN5UkIlCwpZXzh6fkuUm1xKTy+vkSh5gU0zNyCXfSJPQhKNZRv/vDMnIAk1Dw7yWTvJAAAOQElEQVR4nO2d+1vTyBrHTYGmNSVpp
                    SKwAup6DVItsiBeoEUuFVBBQVzP0cV1j+ei+P//eJJm7pmZzKRpetl8n2f3kWTa5tN3Zt5537n0woVMmTJlypQpU6ZMmTJlGgC9/jh9+MFg9OFw+uPrXj9ZMpr5hYXD+uVFr5+uc734Xcw3FIyv5Hy+XvX6GTuSpIJiXer1U3YgJUCvpvb6OWPrkhqgYUz3+klj6iFGKJqFHKOCuYHvf
                    +z1s8bSa/T8Zde2LJbQsmy3jIoMpGdEddSxQ3gA0nYGuZ4iE+ZtPp8vOz/ARpwEj25KAD1EExQbQK84Hzz5hqCGopo6G5Q77PXzagtW0nwUoTOo1fRj8NwNOZ+velByptdPrCswIC1LW2G7JRYHtCGCjqYUUUm9aloNSk72+ol
                    1NQ18YTShmRH2qTLCvzPhPw7nubrUZx4zNqE4qPzQX4hxCV8IAfutIsclnJEQ9le2IyMcHkI7LDqjMeiEjdmQNqoFMq3BJ5wtkWr1MSFfi0Rmg0+44ZhYTnXgCA2jZWkQmoNIaJStYSc0SvawExquNeyE5eEg3LrH6vYCRByOWnr7Yli3AWGQaBxGwoufgnul4SU8G3rChWEn/Cdoh+awEt4DzRA4RBEhqX4m/HSHFeQzFmX+sD67iDW72MeEEpkyQq4GjHB2SCJgoepgWDq8hK48ehp4wg03IgIebM
                    J6kVyeMeiE1UJYOWp9DZ/wzWVSV/qY0LGtkFTypb/OjWLNXe5nwpgZYYpwNCPsiTLCwSec7GfC15OXOtd8HxO+Dm3+6EB9Sai4/HyACZMEzAgzwkEg5M1y9wlhqTOBzRQbrTKrluNGz3KnQZjnxD0aKsosW3ajZrlTIexIckJyBf+wEhpVe9gJkRWHl9Bwe07YxZ6mrZYs5/1gjlR3CIudCUw1LNxmtXUHItI2vPRwctoTGBV/fkDqTXDxD7/E5KuZTteZRn75O
                    uLNroEJUmaWW0eHrzqC7DrhRWDfUmxCo6PtfLJFuvq6EznLbccj
                    7GAbkfLmXTXdi5jltvL1uG8dc1F0sib0uhoOIWDyJxDxFssYirfNPWET8owIO1PXylmFjt47TmOEJqTn0XVlEjXv09kCJeQs2hv3iMe9ef/KNQXdf/MFv+ahPiFM0hQ48w3KwhuYZfKaoYXHBffvzqnq+rXP6GXaXgOZMHLboFSLCoANv5dB9rtLjdIiNDd6H75QuykiE0YmHySylEzofQTcA2y80eFrM16Db6N5NEoyJrQbCoB5G3czNzX5fMQr8YwIO9Kum7BR8L5DGyzBN+7qE47O3QQvjm
                    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
                    oZWMxcuzMz3+iG6qPnYP1+WKVOmTJkyZcqUKVOmTJT+DyI/GAzMwKIVAAAAAElFTkSuQmCC" alt="select icon" width={100}/>
                <ListItemText 
                
                primary= "Please select food items"
                primaryTypographyProps={{
                    style:{
                        
                        textAlign:"end",
                        fontStyle: 'italic'
                    }
                }}  />
                </div>
              


             </ListItem>
             :  orderedFoodItems.map((item,idx) => (
                <Paper key={idx} className={classes.paperRoot}>
                    <ListItem>
                        <ListItemText 
                        primary={item.foodItemName} 
                        primaryTypographyProps={{
                            component: 'h1',
                            style: {
                                fontWeight: '500',
                                fontSize: '1.2em'
                            }
                        }}
                        secondary = {
                            <>
                            <ButtonGroup
                            className={classes.buttonGroup}
                            size='small'>
                                <Button onClick = {e => updateQuantity(idx,-1)}>-</Button>
                                <Button disabled>{item.quantity}</Button>
                                <Button onClick = {e => updateQuantity(idx,+1)}>+</Button>


                            </ButtonGroup>
                            <span className={classes.totalPerItem}>
                                {'£' + roundTo2DecimalPoint(item.quantity * item.foodItemPrice)}
                            </span>
                            </>
                        }
                        secondaryTypographyProps={
                            {
                                component: 'div'
                            }
                        }
                        />
                        <ListItemSecondaryAction
                        className={classes.deleteButton}>

                            <IconButton 
                            onClick={ e => removeFoodItem(idx,item.orderDetailsId)}>
                               <DeleteTwoToneIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>

                </Paper>
            ))
        }
    </List>
  )
}
  