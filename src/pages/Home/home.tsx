import "./home.css";
// import { Row, Col, Carousel, Button } from 'antd';
import FoodCard from "../../components/foodCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { ChangeEvent, useEffect, useState } from "react";
import foodType from "../../utils/foodCatergory";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import ALogin from "../../actions/loginAction";
import AResetCart from "../../actions/resetCartAction";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

const Reservation = () => {
  const places = [
    {
      value: "LTT",
      label: "225 Lý Tự Trọng, P.11, Q.2, TP.HCM",
    },
    {
      value: "Q5",
      label: "23 An Dương Vương, P.10, Q.5, TP.HCM",
    },
    {
      value: "HN",
      label: "01 Cây Đa, P.10, Quận Liên Chiểu, TP.HN",
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
    dispatch(AResetCart());
    dispatch(ALogin(""));
    setLoggedIn("");
  };

  const [userInformation, setUserInformation] = useState({
    username: user,
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    setLoggedIn(user);
  }, [user]);

  let loginButton;

  const [isOpenInformation, setOpenInformation] = useState(false);

  const handleViewInformation = (what: boolean) => {
    setOpenInformation(what);
    if (what === true) {
      const url = "http://localhost:5000/informations?username=" + user;
      axios
        .get(url)
        .then((res) => {
          setUserInformation(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserInformation({
      username: userInformation.username,
      name: e.target.value,
      phone: userInformation.phone,
      address: userInformation.address,
    });
  };

  const handlePhone = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserInformation({
      username: userInformation.username,
      name: userInformation.name,
      phone: e.target.value,
      address: userInformation.address,
    });
  };

  const handleAddress = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserInformation({
      username: userInformation.username,
      name: userInformation.name,
      phone: userInformation.phone,
      address: e.target.value,
    });
  };

  const updateInformation = async () => {
    await axios
      .post("http://localhost:5000/informations", {
        username: user,
        name: userInformation.name,
        phone: userInformation.phone,
        address: userInformation.address,
      })
      .then((res) => {
        if (res.data.response === true) {
          window.alert("Cập nhật thông tin thành công!");
        } else {
          window.alert("Cập nhật thông tin thất bại!");
        }
      });
  };

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

        <Button
          variant="outlined"
          style={{ marginRight: 10 }}
          onClick={() => handleViewInformation(true)}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              backdropFilter: "blur(100px)",
              borderColor: "white",
            },
          }}
        >
          <AccountCircleIcon /> Cá nhân
        </Button>
        <Dialog
          open={isOpenInformation}
          onClose={() => handleViewInformation(false)}
          fullWidth
        >
          <DialogTitle>Thông tin cá nhân</DialogTitle>
          <DialogContent
            dividers
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              margin="dense"
              id="name"
              label="Username"
              value={userInformation.username}
              disabled
            />
            <TextField
              margin="dense"
              id="name"
              label="Họ và tên"
              value={userInformation.name}
              onChange={(e) => handleName(e)}
            />
            <TextField
              margin="dense"
              id="phone"
              label="Số điện thoại"
              value={userInformation.phone}
              onChange={(e) => handlePhone(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="address"
              label="Địa chỉ"
              value={userInformation.address}
              onChange={(e) => handleAddress(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={updateInformation}>
              Cập nhật thông tin
            </Button>
          </DialogActions>
        </Dialog>

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
          <LogoutIcon />
        </Button>
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
    </>
  );
};

export default Home;
