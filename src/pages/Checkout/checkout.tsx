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
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./checkout.css";

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

    const [hamburger, setHamburger] = useState(0);
    const [pizza, setPizza] = useState(0);
    const [pasta, setPasta] = useState(0);
    const [paella, setPaella] = useState(0);

    const getNumbersFromChild = (foodName: string, data: number) => {
        if (foodName === "Burger") {
            setHamburger(data);
            console.log("Ham " + hamburger);
        }
        if (foodName === "Pizza") {
            setPizza(data);
            console.log("Pizza " + pizza);
        }
        if (foodName === "Pasta") {
            setPasta(data);
            console.log("Pasta " + pasta);
        }
        if (foodName === "Paella") {
            setPaella(data);
            console.log("Paella " + paella);
        }
    };

    const multiItemList = foodList.map((item) => (
        <ListItem>
            <ListItemText primary={item} />
            <FoodExpense passChildData={getNumbersFromChild} foodName={item} />
        </ListItem>
    ));

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
                            <Button variant="contained" fullWidth={true} style={{ marginLeft: 15, marginRight: 15, marginBottom: 15 }}>
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
