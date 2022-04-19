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
          <Button variant="outlined" style={{ marginLeft: 10, height: "4em" }}>
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
  }

  useEffect(() => {
    setLoggedIn(user)
  }, [user])

  let loginButton;

  if (isLoggedIn === '') {
    loginButton = <Button variant="outlined" style={{ color: "black" }}>
      <Link to="/login" />
      {" "}
      Đăng Nhập{" "}
    </Button >
  } else {
    loginButton = <div className="logged-in-toolbar">
      <a style={{ marginRight: 10 }} href="/checkout">
        <Link to="/checkout">
          Giỏ hàng
        </Link>
      </a>
      <a style={{ marginRight: 10 }} href="/login" onClick={resetState}>
        {/* <Link to="/login"> */}
        Đăng xuất
        {/* </Link> */}
      </a>
    </div>
  }

  return (
    <>
      <Box className="toolbar">
        <Typography>BKPOS</Typography>
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
      <Box style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
        DANH SÁCH MÓN ĂN
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
          <FoodCard foodName="Burger" imgUrl={foodType.hamburger.img} />
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
          <FoodCard foodName="Pizza" imgUrl={foodType.pizza.img} />
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
          <FoodCard foodName="Pasta" imgUrl={foodType.pasta.img} />
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
          <FoodCard foodName="Paella" imgUrl={foodType.paella.img} />
        </Box>
      </Box>
      {/* <Box className="footer">(C) BKPOS 2022</Box> */}
    </>
  );
};

// function Home() {

//   const user = useSelector<any, any>((state) => state.loginReducer.userList.username);

//   const [isLoggedIn, setLoggedIn] = useState('');

//   useEffect(() => {
//     setLoggedIn(user)
//   }, [user])

//   let loginButton;

//   if (isLoggedIn === '') {
//     loginButton = <Button type="ghost">
//       <Link to="/login">
//         Đăng Nhập
//       </Link>
//     </Button>
//   } else {
//     loginButton = <div className="logged-in-toolbar">
//       <p style={{ marginRight: 10 }}>
//         <Link to="/checkout">
//           Giỏ hàng
//         </Link>
//       </p>
//       <p>{user}</p>
//     </div>
//   }

//   return (
//     <>
//       <Row className="menu">
//         <Col span={12} className="logo">
//           <p>
//             BKPOS
//           </p>
//         </Col>
//         <Col span={12} className="login">
//           {loginButton}
//         </Col>
//       </Row>

//       <Row>
//         <Col span={24}>
//           <Premier />
//         </Col>
//       </Row>

//       <Row className="menu-caption">
//         <Col span={24}>
//           <h1> THỰC ĐƠN </h1>
//         </Col>
//       </Row>

//       <Row justify="center">
//         <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
//           <div className="food-card-inside">
//             <FoodCard
//               username={user}
//               name={foodType.hamburger.name}
//               imgUrl={foodType.hamburger.img}
//             />
//           </div>
//         </Col>

//         <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
//           <div className="food-card-inside">
//             <FoodCard
//               username={user}
//               name={foodType.pizza.name}
//               imgUrl={foodType.pizza.img}
//             />
//           </div>
//         </Col>

//         <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
//           <div className="food-card-inside">
//             <FoodCard
//               username={user}
//               name={foodType.pasta.name}
//               imgUrl={foodType.pasta.img}
//             />
//           </div>
//         </Col>

//         <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
//           <div className="food-card-inside">
//             <FoodCard
//               username={user}
//               name={foodType.paella.name}
//               imgUrl={foodType.paella.img}
//             />
//           </div>
//         </Col>

//         <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
//           <div className="food-card-inside">
//             <FoodCard
//               username={user}
//               name={foodType.hamburger.name}
//               imgUrl={foodType.hamburger.img}
//             />
//           </div>
//         </Col>

//         <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
//           <div className="food-card-inside">
//             <FoodCard
//               username={user}
//               name={foodType.pizza.name}
//               imgUrl={foodType.pizza.img}
//             />
//           </div>
//         </Col>

//         <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
//           <div className="food-card-inside">
//             <FoodCard
//               username={user}
//               name={foodType.pasta.name}
//               imgUrl={foodType.pasta.img}
//             />
//           </div>
//         </Col>

//         <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
//           <div className="food-card-inside">
//             <FoodCard
//               username={user}
//               name={foodType.paella.name}
//               imgUrl={foodType.paella.img}
//             />
//           </div>
//         </Col>
//       </Row>
//     </>
//   )
// }
export default Home;
