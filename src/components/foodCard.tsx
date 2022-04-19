import {
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Typography,
    Box,
    Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ACartAdding from "../actions/cartAction";

const FoodCard = (props: any) => {

    const [isClicked, setIsClicked] = useState(false)

    const foodList: string[] = useSelector<any, string[]>((state) => state.cartReducer.foodList);

    useEffect(() => {
        if (foodList.includes(props.foodName) === false || foodList.length === 0) {
            setIsClicked(false)
        } else {
            setIsClicked(true)
        }
    }, [foodList, props.foodName])



    const dispatch = useDispatch();

    const updateCart = () => {
        if (foodList.includes(props.name) === false) {
            dispatch(ACartAdding(props.foodName));
        }
        setIsClicked(true)
    };

    const bull = (
        <Box
            component="span"
            sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
        >
            •
        </Box>
    );

    return (
        <>
            <Card
                style={{
                    maxWidth: "25em",
                    minWidth: "10em",
                    width: "80%",
                    height: "20em",
                    // backgroundColor: "red",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <CardHeader title={props.foodName} style={{ textAlign: "center" }} />
                <Typography variant="h1" style={{ textAlign: "center" }}>
                    {props.imgUrl}
                </Typography>
                <CardContent>
                    <Typography variant="body2">
                        the{bull}bestest{bull}pizza{bull}in{bull}the{bull}world
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="small"
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
