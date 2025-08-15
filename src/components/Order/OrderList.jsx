import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import Table from "../../layouts/Table";
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Notification from '../../layouts/Notification';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';

export default function OrderList(props) {

    const { setOrderId, setOrderListVisibility, resetFormControls } = props;
    const [notify, setNotify] = useState({ isOpen: false, message:""});

    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.ORDER).fetchAll()
            .then(res => {
                setOrderList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const showForUpdate = id => {
        setOrderId(id);
        setOrderListVisibility(false);
    }

    const deleteOrder = id => {
        if (window.confirm('Are you sure to delete this record?')) {
             console.log(`order item with id has been deleted: ${id}`);
            createAPIEndpoint(ENDPOINTS.ORDER).delete(id)
                .then(res => {
                    setOrderListVisibility(false);
                    setOrderId(0);
                    resetFormControls();
                    setNotify({ isOpen: true, message: 'Deleted successfully.' });
                    setOrderList(prevState => prevState.filter(order => order.id !== id)); 
                   
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order No.</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Payed With</TableCell>
                        <TableCell>Grand Total</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orderList.map(item => (
                            <TableRow key={item.id}>
                                <TableCell
                                    onClick={e => showForUpdate(item.id)}>
                                    {item.orderNumber}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.id)}>
                                    {item.customer.customerName}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.id)}>
                                    {item.pMethod}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.id)}>
                                    {item.gTotal}
                                </TableCell>
                                <TableCell>
                                    <DeleteOutlineTwoToneIcon
                                        color="secondary"
                                        onClick={e => deleteOrder(item.id)} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                
            </Table>
           <Notification notify={notify} setNotify={setNotify} /> 
        </>
    )
}
