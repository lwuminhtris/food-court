import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    TextField,
    List,
    ListItem,
    ListItemText,
    Typography,
    Grid,
    CardActions,
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./checkout.css";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HistoryIcon from '@mui/icons-material/History';
import { Link } from "react-router-dom";

const foodPrice: Record<any, any> = {
    Burger: 30000,
    Pizza: 45000,
    Pasta: 35000,
    Paella: 60000,
};

const FoodExpense = (props: any) => {
    const [number, setNumber] = useState(1);

    useEffect(() => {
        const totalPrice = foodPrice[props.foodName] * number;
        props.passChildData(props.foodName, totalPrice);
    });

    const updateNumber = (increment: boolean) => {
        if (increment === true) {
            setNumber(number + 1);
        } else {
            if (number - 1 >= 0) {
                setNumber(number - 1);
            }
        }
        const totalPrice = foodPrice[props.foodName] * number;
        props.passChildData(props.foodName, totalPrice);
    };

    return (
        <>
            <Box
                style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignItems: "center",
                }}
            >
                <Typography
                    style={{
                        marginRight: 20,
                    }}
                >
                    {foodPrice[props.foodName]} x {number}
                </Typography>
                <Button
                    onClick={() => updateNumber(false)}
                    color="error"
                    variant="contained"
                    style={{
                        height: "4em",
                    }}
                >
                    -
                </Button>
                <TextField
                    style={{
                        width: "3%",
                        minWidth: "5em",
                    }}
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    inputProps={{
                        style: { textAlign: "center" },
                    }}
                    value={number}
                ></TextField>
                <Button
                    onClick={() => updateNumber(true)}
                    color="primary"
                    variant="contained"
                    style={{
                        height: "4em",
                    }}
                >
                    +
                </Button>
            </Box>
        </>
    );
};


const CheckOut = () => {
    const foodList = useSelector<any, string[]>(
        (state) => state.cartReducer.foodList
    );

    const username = useSelector<any, any>((state) => state.loginReducer.userList.username);

    const [hamburger, setHamburger] = useState(0);
    const [pizza, setPizza] = useState(0);
    const [pasta, setPasta] = useState(0);
    const [paella, setPaella] = useState(0);

    const getNumbersFromChild = (foodName: string, data: number) => {
        if (foodName === "Burger") {
            setHamburger(data);
        }
        if (foodName === "Pizza") {
            setPizza(data);
        }
        if (foodName === "Pasta") {
            setPasta(data);
        }
        if (foodName === "Paella") {
            setPaella(data);
        }
    };

    const multiItemList = foodList.map((item) => (
        <ListItem>
            <ListItemText primary={item} />
            <FoodExpense passChildData={getNumbersFromChild} foodName={item} />
        </ListItem>
    ));

    const saveOrder = () => {
        axios.post(
            "http://localhost:5000/orders",
            {
                username: username,
                date: new Date(),
                burger: hamburger / 30000,
                pizza: pizza / 45000,
                pasta: pasta / 35000,
                paella: paella / 60000,
                totalPrice: hamburger + pizza + pasta + paella
            }
        ).then((res) => {
            if (res.data.response === true) {
                window.alert("Thanh toán thành công")
            } else {
                window.alert("Thanh toán không thành công")
            }
        }).catch((e) => {
            console.log('Error: ', e)
        })
    };

    interface IOrderedHistory {
        date: any,
        pizza: any,
        pasta: any,
        paella: any,
        burger: any,
        totalPrice: any
    }

    const [viewHistory, setViewHistory] = useState(false)

    const handleViewHistory = async (input: boolean) => {
        await getOrdersHistory();
        setViewHistory(input)
    }

    const [orderedHistory, setOrderedHistory] = useState<IOrderedHistory[]>([])

    const getOrdersHistory = () => {
        const url = "http://localhost:5000/orders?username=" + username
        axios.get(url)
            .then((res) => {
                console.log(url)
                const listOfOrders: IOrderedHistory[] = [];
                for (const elem of res.data.orders) {
                    listOfOrders.push({
                        date: elem.date,
                        pizza: elem.pizza,
                        paella: elem.paella,
                        burger: elem.burger,
                        pasta: elem.pasta,
                        totalPrice: elem.totalPrice
                    })
                }
                setOrderedHistory(listOfOrders)
                console.log(orderedHistory)
            })
            .catch((e) => console.log('error', e))
    }

    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "100vh" }}
            >
                <Grid item xs={6} sm={3} lg={12}>
                    <Box className="toolbar">
                        <Link to="/">
                            <Button variant="outlined">
                                <KeyboardBackspaceIcon /> Quay lại trang chủ
                            </Button>
                        </Link>
                        <Button variant="outlined" onClick={() => handleViewHistory(true)}>
                            <HistoryIcon /> Xem lịch sử mua hàng
                        </Button>
                        <Dialog onClose={() => handleViewHistory(false)} open={viewHistory}>
                            <DialogTitle>Lịch sử mua hàng</DialogTitle>
                            {orderedHistory.map((d) => {
                                return <DialogContent key={d.date}>
                                    <DialogContentText>
                                        Thời gian: {d.date.slice(11, 16) + " " + d.date.slice(0, 10)}
                                    </DialogContentText>
                                    <DialogContentText>
                                        Pizza: {d.pizza + ' x 45000'}
                                    </DialogContentText>
                                    <DialogContentText>
                                        Paella: {d.paella + ' x 60000'}
                                    </DialogContentText>
                                    <DialogContentText>
                                        Pasta: {d.pasta + ' x 35000'}
                                    </DialogContentText>
                                    <DialogContentText>
                                        Burger: {d.burger + ' x 30000'}
                                    </DialogContentText>
                                    <DialogContentText>
                                        <b>Tổng tiền: {d.totalPrice + 'VNĐ'}</b>
                                    </DialogContentText>
                                    <DialogContentText>
                                        ________________________
                                    </DialogContentText>
                                </DialogContent>
                            })}

                        </Dialog>
                    </Box>

                </Grid>
                <Grid item xs={6} sm={3} lg={12}>
                    <Card
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            maxWidth: "80em",
                            minWidth: "40em",
                        }}
                    >
                        <CardHeader
                            title="PHIẾU MUA HÀNG"
                            style={{ textAlign: "center" }}
                        />
                        <CardContent>
                            <List dense={true}>
                                {multiItemList}
                                <Typography
                                    style={{
                                        marginLeft: 15,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginRight: 15,
                                        marginTop: 15,
                                    }}
                                >
                                    <b>TỔNG GIÁ TRỊ ĐƠN HÀNG:</b>
                                    <b>{hamburger + pizza + pasta + paella} VNĐ</b>
                                </Typography>
                            </List>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                fullWidth={true}
                                style={{ marginLeft: 15, marginRight: 15, marginBottom: 15 }}
                                onClick={saveOrder}
                            >
                                THANH TOÁN
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default CheckOut;
