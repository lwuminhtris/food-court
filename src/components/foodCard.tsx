import {
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Typography,
    Box,
    Button,
    CardMedia,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ACartAdding from "../actions/cartAction";

const FoodCard = (props: any) => {

    const [isClicked, setIsClicked] = useState(false)

    const foodList: string[] = useSelector<any, string[]>((state) => state.cartReducer.foodList);
    const user = useSelector<any, any>(
        (state) => state.loginReducer.userList.username
    );

    useEffect(() => {
        if (foodList.includes(props.foodName) === false || foodList.length === 0 || user === "") {
            setIsClicked(false)
        } else {
            setIsClicked(true)
        }
    }, [foodList, props.foodName])



    const dispatch = useDispatch();

    const updateCart = () => {
        if (user === "") {
            setIsClicked(false)
            window.alert("Quý khách cần đăng nhập trước đã!");
        } else {
            if (foodList.includes(props.name) === false) {
                dispatch(ACartAdding(props.foodName));
            }
            setIsClicked(true)
        }
    };

    return (
        <>
            <Card
                variant="elevation"
                style={{
                    maxWidth: "25em",
                }}
                sx={{
                    boxShadow: '5px 5px 5px rgba(30,30,30,0.5)',
                }}
            >
                <CardMedia
                    component="img"
                    height="140"
                    image={props.imgUrl}
                    alt={props.foodName}

                />
                <CardContent>
                    <Typography variant="h5" style={{ textAlign: "left" }}>
                        {props.foodName}
                    </Typography>
                    <Typography variant="body2">
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        style={{ width: "100%" }}
                        onClick={updateCart}
                        disabled={isClicked}
                    >
                        CHỌN MÓN
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default FoodCard;
