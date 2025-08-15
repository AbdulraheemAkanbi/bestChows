import React from 'react';
import OrderForm from './OrderForm';
import useForm from '../../hooks/useForm';
import OrderedFoodItems from './OrderedFoodItems';
import SearchFoodItems from './SearchFoodItems';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(1),
    width: '100%',
  },
  formWrapper: {
    marginBottom: theme.spacing(5),
  },
}));

export default function Order() {
  const classes = useStyles();

  const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

  const getFreshModelObject = () => ({
    orderMasterId: 0,
    orderNumber: generateOrderNumber(),
    customerId: 0,
    pMethod: 'none',
    gTotal: 0,
    deletedOrderItemIds: '',
    orderDetails: [],
  });

  const {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetFormControls,
  } = useForm(getFreshModelObject);

  return (
    <>
      <div className={classes.formWrapper}>
        <OrderForm
          {...{ values, setValues, setErrors, errors, handleInputChange,resetFormControls }}
        />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SearchFoodItems {...{ values, setValues }} />
        </Grid>
        <Grid item xs={6}>
          <OrderedFoodItems {...{ values, setValues }} />
        </Grid>
      </Grid>
    </>
  );
}
