import React, { useState, useEffect } from 'react';
import { Grid, InputAdornment, makeStyles, ButtonGroup, Button as MuiButton, Paper, Typography, Hidden } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Form from '../../layouts/Form';
import Input from '../../controls/Input';
import Button from '../../controls/Button';
import Select from '../../controls/Select'; 
import ReplayIcon from '@material-ui/icons/Replay';
import ReorderIcon from '@mui/icons-material/Reorder';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { roundTo2DecimalPoint } from '../../utils';
import { ENDPOINTS, createAPIEndpoint } from '../../api/index';
import Popup from '../../layouts/Popup';
import Notification from '../../layouts/Notification';
import OrderList from './OrderList';

const pMethods = [
  { id: 'none', title: 'Select' },
  { id: 'Cash', title: 'Cash' },
  { id: 'Card', title: 'Card' },
];

const useStyles = makeStyles((theme) => ({
  adornmentText: {
    '& .MuiTypography-root': {
      backgroundColor: '#F3B33D',
      color: '#F3B33D',
      fontWeight: 'bolder',
      fontSize: '1.5em',
    },
  },
  submitButtonGroup: {
    backgroundColor: '#F3B33D',
    color: '#000',
    '& .MuiButton-label': {
      textTransform: 'none',
    },
    '&:hover': {
      backgroundColor: '#F3B33D',
    },
  },
  ordersButton: {
    alignItems:"end",
    backgroundColor: '#F3B33D',
    color: '#000',
    '& .MuiButton-label': {
      textTransform: 'none',
    },
    '&:hover': {
      backgroundColor: '#F3B33D',
    },
  },
  root: {
    padding: theme.spacing(3),
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  formField: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1.5),
    },
  },
  typography: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
}));

export default function OrderForm(props) {
  const { values, setValues, setErrors, errors, handleInputChange, resetFormControls } = props;
  const classes = useStyles();
  const [customerList, setCustomerList] = useState([]);
  const [foodItemList, setFoodItemList] = useState([]);
  const [orderListVisibility, setOrderListVisibility] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    createAPIEndpoint(ENDPOINTS.CUSTOMER).fetchAll()
      .then(res => {
        let customerList = res.data.map(item => ({
          id: item.customerId,
          title: item.customerName,
        }));
        customerList = [{ id: 0, title: 'Select' }].concat(customerList);
        setCustomerList(customerList);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });

    createAPIEndpoint(ENDPOINTS.FOODITEM).fetchAll()
      .then(res => {
        let foodItemList = res.data.map(item => ({
          id: item.foodItemId,
          title: item.foodItemName,
          price: item.price,
        }));
        setFoodItemList(foodItemList);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + (item.quantity * item.foodItemPrice);
    }, 0);
    setValues({
      ...values,
      gTotal: roundTo2DecimalPoint(gTotal),
    });
  }, [values.orderDetails]);

  const validateForm = () => {
    let temp = {};
    temp.customerId = values.customerId !== 0 ? '' : 'This field is required';
    temp.pMethod = values.pMethod !== 'none' ? '' : 'This field is required';
    temp.orderDetails = values.orderDetails.length !== 0 ? '' : 'This field is required';
    setErrors({ ...temp });
    return Object.values(temp).every(x => x === '');
  };

  const resetForm = () => {
        resetFormControls();
        setOrderId(0);
    }


  const submitOrder = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const orderMaster = {
          id: 0,
          orderNumber: values.orderNumber,
          customerId: values.customerId,
          customer: {
            customerId: values.customerId,
            customerName: customerList.find(c => c.id === values.customerId)?.title || '',
          },
          pMethod: values.pMethod,
          gTotal: values.gTotal,
          orderDetails: values.orderDetails.map(od => ({
            id: 0,
            orderMasterId: 0,
            foodItemId: od.foodItemId,
            foodItemPrice: od.foodItemPrice,
            quantity: od.quantity,
          })),
        };

        const res = await createAPIEndpoint(ENDPOINTS.ORDER).create(orderMaster);
        setNotify({ isOpen: true, message: 'New order is created!!' });
        
        resetFormControls();
        setNotify({isOpen:true, message:"New order is created"});
        console.log(res);
      } catch (err) {
        console.error('Error creating order:', err.response ? err.response.data : err);
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      }
      setLoading(false);
    }
  };

  const openListOfOrders = () => {
    setOrderListVisibility(true);
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" gutterBottom className={classes.typography}>
        Order Form
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color='inherit'/>
        </Box>
      ) : (
        <Form onSubmit={submitOrder}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                disabled
                label="Order Number"
                name="orderNumber"
                value={values.orderNumber}
                InputProps={{
                  startAdornment: (
                    <InputAdornment classes={classes.adornmentText} position="start">
                      #
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                label="Customer"
                name="customerId"
                onChange={handleInputChange}
                value={values.customerId}
                options={customerList}
                error={errors.customerId}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                label="Payment Method"
                name="pMethod"
                value={values.pMethod}
                options={pMethods}
                onChange={handleInputChange}
                error={errors.pMethod}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                disabled
                label="Grand Total"
                name="gTotal"
                value={values.gTotal}
                InputProps={{
                  startAdornment: (
                    <InputAdornment classes={classes.adornmentText} position="start">
                      £
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ButtonGroup className={classes.submitButtonGroup}>
                <MuiButton size="large" endIcon={<RestaurantMenuIcon />} type="submit">
                  Submit
                </MuiButton>
                <MuiButton
                onClick={resetForm}
                 size="small" 
                 startIcon={<ReplayIcon />}>
                  Reset
                </MuiButton>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                className={classes.ordersButton}
                size="large"
                onClick={openListOfOrders}
                startIcon={<ReorderIcon />}
              >
                Orders
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
      <Popup title="List of Orders" openPopup={orderListVisibility} setOpenPopup={setOrderListVisibility}>
        <OrderList {...{ setOrderId, setOrderListVisibility }} />
      </Popup>
      <Notification {...{ notify, setNotify }} />
    </Paper>
  );
}
