import "./home.css";
// import { Row, Col, Carousel, Button } from 'antd';
import FoodCard from "../../components/foodCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import ALogin from "../../actions/loginAction";
import AResetCart from "../../actions/resetCartAction";
import LoginIcon from "@mui/icons-material/Login";

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
          <Button
            variant="contained"
            style={{ marginLeft: 10, height: "4em" }}
            onClick={() => window.alert("Quý khách đã đặt bàn thành công!")}
          >
            Đặt Bàn
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

const Home = () => {
  const user = useSelector<any, any>(
    (state) => state.loginReducer.userList.username
  );

  const [isLoggedIn, setLoggedIn] = useState("");

  const dispatch = useDispatch();

  const resetState = () => {
    // storage.removeItem("persist:root");
    dispatch(AResetCart());
    dispatch(ALogin(""));
    setLoggedIn("");
  };

  const resetStateForLoggedIn = () => {
    // storage.removeItem("persist:root");
  }

  useEffect(() => {
    setLoggedIn(user);
  }, [user]);

  let loginButton;

  if (user === "") {
    loginButton = (
      <div>
        <Link to="/login">
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                backdropFilter: "blur(100px)",
                borderColor: "white",
              },
            }}
          >
            <LoginIcon /> Đăng nhập
          </Button>
        </Link>
        <Link to="register" style={{ marginLeft: 10 }}>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                backdropFilter: "blur(100px)",
                borderColor: "white",
              },
            }}
          >
            <LogoutIcon /> Đăng ký
          </Button>
        </Link>
        {/* <Button onClick={resetState}>
          RESET
        </Button> */}
      </div>
    );
  } else {
    loginButton = (
      <div className="logged-in-toolbar">
        <Link to="/checkout">
          <Button
            variant="outlined"
            style={{ marginRight: 10 }}
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                backdropFilter: "blur(100px)",
                borderColor: "white",
              },
            }}
          >
            <ShoppingCartIcon /> Giỏ hàng
          </Button>
        </Link>

        {/* <Link to="/"> */}
        <Button
          variant="outlined"
          onClick={resetState}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              backdropFilter: "blur(100px)",
              borderColor: "white",
            },
          }}
        >
          <LogoutIcon /> Đăng xuất
        </Button>
        {/* </Link> */}
        {/* 
        <Button onClick={resetStateForLoggedIn}>
          RESET
        </Button> */}
      </div>
    );
  }

  return (
    <>
      <Box className="toolbar">
        <Typography fontFamily={"Roboto"} style={{ color: "white" }}>
          BKPOS
        </Typography>
        {loginButton}
      </Box>
      <Box className="banner"></Box>
      <Box className="reservation">
        <Reservation />
      </Box>
      <Box style={{ textAlign: "center", marginTop: 35 }}>
        {/* DANH SÁCH MÓN ĂN */}
        <img
          src="https://cdn.discordapp.com/attachments/835921395292700776/977284840779051088/1.png"
          height={70}
          alt="haha"
        />
      </Box>
      <Box className="menu-item">
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 5,
          }}
        >
          <FoodCard
            foodName={foodType.hamburger.name}
            imgUrl={foodType.hamburger.img}
            description={foodType.hamburger.description}
          />
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
          <FoodCard
            foodName={foodType.pizza.name}
            imgUrl={foodType.pizza.img}
            description={foodType.pizza.description}
          />
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
          <FoodCard
            foodName={foodType.pasta.name}
            imgUrl={foodType.pasta.img}
            description={foodType.pasta.description}
          />
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
          <FoodCard
            foodName={foodType.paella.name}
            imgUrl={foodType.paella.img}
            description={foodType.paella.description}
          />
        </Box>
      </Box>
      {/* <Box className="footer">Copyright (C) Công ty Cổ phần Thực phẩm BKPOS 2022</Box> */}
    </>
  );
};

export default Home;
