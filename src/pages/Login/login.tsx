import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ALogin from "../../actions/loginAction";
import axios from "axios";
import storage from "redux-persist/lib/storage";

interface IAccount {
    username: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const verifyAccount = async (values: any) => {

        storage.removeItem('persist:root');

        await axios.post(
            "http://localhost:5000/authorize?username=" +
            values.username +
            "&password=" +
            values.password,
            {}
        ).then((res) => {
            if (res.data.response === true) {
                dispatch(ALogin(values.username));
                navigate("/");
            } else {
                window.alert("Sai tên đăng nhập hoặc mật khẩu");
            }
        }).catch((e) => {
            console.log('e', e)
        })
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
            <Col span={6}>
                <h1> BKPOS </h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={(values) => verifyAccount(values)}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: "Hãy nhập tên đăng nhập của bạn!" },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Tên đăng nhập"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Hãy nhập mật khẩu của bạn!" }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Nhớ lần đăng nhập này</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="/">
                            Quên mật khẩu
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Đăng nhập
                        </Button>
                        Hoặc <a href="/register">đăng ký ngay!</a>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Login;
