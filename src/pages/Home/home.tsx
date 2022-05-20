import "./home.css";
// import { Row, Col, Carousel, Button } from 'antd';
import FoodCard from "../../components/foodCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import foodType from "../../utils/foodCatergory";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import storage from "redux-persist/lib/storage";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';


const Reservation = () => {
  const places = [
    {
      value: "LTT",
      label: "225 Lý Tự Trọng, Phường 11, TP.Thủ Đức, TP.Hồ Chí Minh",
    },
    {
      value: "Q5",
      label: "23 An Dương Vương, Phường 10, Quận 5, TP.Hồ Chí Minh",
    },
    {
      value: "HN",
      label: "01 Cây Đa, Phường Bình Hưng, Quận Liên Chiểu, TP. Hà Nội",
    },
  ];

  const [place, setPlace] = useState(
    "225 Ly Tu Trong, Phuong 11, TP.Thu Duc, TP.Ho Chi Minh"
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };

  return (
    <>
      <Card className="box-reservation">
        <CardHeader title="ĐẶT BÀN NGAY" />
        <CardActions
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
          }}
        >
          <TextField
            label="Chọn địa điểm"
            select
            value={place}
            style={{
              width: "25em",
            }}
            onChange={handleChange}
          >
            {places.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" style={{ marginLeft: 10, height: "4em" }} onClick={() => window.alert("Quý khách đã đặt bàn thành công!")}>
            Đặt Bàn
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

const Home = () => {

  const user = useSelector<any, any>((state) => state.loginReducer.userList.username);

  const [isLoggedIn, setLoggedIn] = useState('');

  const resetState = () => {
    storage.removeItem('persist:root')
    setLoggedIn('')
  }

  useEffect(() => {
    setLoggedIn(user)
  }, [user])

  let loginButton;

  if (isLoggedIn === '') {
    loginButton = <Button variant="outlined" style={{ color: "white" }}>
      <Link to="/login" />
      <Button variant="outlined">
        Đăng nhập
      </Button>
    </Button >
  } else {
    loginButton = <div className="logged-in-toolbar">
      <Link to="/checkout">
        <Button variant="outlined" style={{ marginRight: 10 }}>
          <ShoppingCartIcon /> Giỏ hàng
        </Button>
      </Link>

      <Link to="/login">
        <Button variant="outlined" onClick={() => resetState}>
          <LogoutIcon /> Đăng xuất
        </Button>
      </Link>

    </div>
  }

  return (
    <>
      <Box className="toolbar">
        <Typography fontFamily={'Roboto'} style={{ color: 'white' }}>BKPOS</Typography>
        {/* <Button variant="outlined" style={{ color: "black" }}>
          {" "}
          Đăng Nhập{" "}
        </Button> */}
        {loginButton}
      </Box>
      <Box className="banner"></Box>
      <Box className="reservation">
        <Reservation />
      </Box>
      <Box style={{ textAlign: 'center', marginTop: 20, }}>
        {/* DANH SÁCH MÓN ĂN */}
        <img src="https://cdn.discordapp.com/attachments/835921395292700776/977284840779051088/1.png" height={100} />
      </Box>
      <Box className="menu-item">
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 5,
            // paddingBottom: 5
          }}
        >
          <FoodCard foodName="Burger" imgUrl={foodType.hamburger.img} description={foodType.hamburger.description} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 5,
            // paddingBottom: 5
          }}
        >
          <FoodCard foodName="Pizza" imgUrl={foodType.pizza.img} description={foodType.pizza.description} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 5,
            // paddingBottom: 5
          }}
        >
          <FoodCard foodName="Pasta" imgUrl={foodType.pasta.img} description={foodType.pasta.description} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 5,
            // paddingBottom: 5
          }}
        >
          <FoodCard foodName="Paella" imgUrl={foodType.paella.img} description={foodType.paella.description} />
        </Box>
      </Box>
      {/* <Box className="footer">Copyright (C) Công ty Cổ phần Thực phẩm BKPOS 2022</Box> */}
    </>
  );
};

export default Home;
