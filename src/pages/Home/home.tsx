import './home.css';
import { Row, Col, Carousel, Button } from 'antd';
import FoodCard from '../../components/foodCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import foodType from '../../utils/foodCatergory';

const Reservation = () => {
  return (
    <div className="reservation">
      <h1> ĐĂNG KÝ THÀNH VIÊN NGAY HÔM NAY </h1>
      <h3> Để được nhận voucher giảm giá và hàng trăm quà tặng khác</h3>
      <Button type="primary" size="large" shape="default">
        <Link to="/register">
          Đăng ký thành viên ngay!
        </Link>
      </Button>
    </div>
  )
}


const Premier = () => {
  return (
    <div style={{ zIndex: -1 }}>
      <Carousel autoplay className="cover">
        <div className="first" />
        <div className="second" />
        <div className="third" />
      </Carousel>
      <Reservation />
    </div>
  )
}

function Home() {

  const user = useSelector<any, any>((state) => state.loginReducer.userList.username);

  const [isLoggedIn, setLoggedIn] = useState('');

  useEffect(() => {
    setLoggedIn(user)
  }, [user])

  let loginButton;

  if (isLoggedIn === '') {
    loginButton = <Button type="ghost">
      <Link to="/login">
        Đăng Nhập
      </Link>
    </Button>
  } else {
    loginButton = <div className="logged-in-toolbar">
      <p style={{ marginRight: 10 }}>
        <Link to="/checkout">
          Giỏ hàng
        </Link>
      </p>
      <p>{user}</p>
    </div>
  }

  return (
    <>
      <Row className="menu">
        <Col span={12} className="logo">
          <p>
            BKPOS
          </p>
        </Col>
        <Col span={12} className="login">
          {loginButton}
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Premier />
        </Col>
      </Row>

      <Row className="menu-caption">
        <Col span={24}>
          <h1> THỰC ĐƠN </h1>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
          <div className="food-card-inside">
            <FoodCard
              username={user}
              name={foodType.hamburger.name}
              imgUrl={foodType.hamburger.img}
            />
          </div>
        </Col>

        <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
          <div className="food-card-inside">
            <FoodCard
              username={user}
              name={foodType.pizza.name}
              imgUrl={foodType.pizza.img}
            />
          </div>
        </Col>

        <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
          <div className="food-card-inside">
            <FoodCard
              username={user}
              name={foodType.pasta.name}
              imgUrl={foodType.pasta.img}
            />
          </div>
        </Col>

        <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
          <div className="food-card-inside">
            <FoodCard
              username={user}
              name={foodType.paella.name}
              imgUrl={foodType.paella.img}
            />
          </div>
        </Col>

        <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
          <div className="food-card-inside">
            <FoodCard
              username={user}
              name={foodType.hamburger.name}
              imgUrl={foodType.hamburger.img}
            />
          </div>
        </Col>

        <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
          <div className="food-card-inside">
            <FoodCard
              username={user}
              name={foodType.pizza.name}
              imgUrl={foodType.pizza.img}
            />
          </div>
        </Col>

        <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
          <div className="food-card-inside">
            <FoodCard
              username={user}
              name={foodType.pasta.name}
              imgUrl={foodType.pasta.img}
            />
          </div>
        </Col>

        <Col span={6} className="food-card-outside" style={{ marginTop: 20 }}>
          <div className="food-card-inside">
            <FoodCard
              username={user}
              name={foodType.paella.name}
              imgUrl={foodType.paella.img}
            />
          </div>
        </Col>
      </Row>
    </>
  )
}
export default Home;