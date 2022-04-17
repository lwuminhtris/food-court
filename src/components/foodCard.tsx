import { Button, Card, InputNumber } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ACartAdding from "../actions/cartAction";


const FoodCard = (props: any) => {

    const dispatch = useDispatch();

    const selector = useSelector;

    const [foodNumber, setFoodNumber] = useState(0);

    const updateNumber = (value: number) => {
        setFoodNumber(value);
    }

    const cartList = useSelector<any, any>((state) => state!.cartReducer.foodList)

    const updateCart = () => {
        dispatch(ACartAdding(props.username, props.name, foodNumber))
        console.log(cartList)
    }

    return (
        <div>
            <Card
                style={{ width: 360, height: 360, textAlign: 'start', backgroundColor: 'green', borderRadius: 10 }}
                cover={
                    <img
                        alt={props.name}
                        src={props.imgUrl}
                        width={'100%'}
                        height={240}
                    />
                }
                extra={<div>
                    <InputNumber<number>
                        defaultValue={0}
                        min={0}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                        style={{ marginRight: 10 }}
                        autoFocus={true}
                        onChange={updateNumber}
                    />
                    <Button type="ghost" onClick={updateCart}> Đặt món </Button>
                </div>}
                title={props.name}
            >

            </Card>
        </div>
    )
}

export default FoodCard;