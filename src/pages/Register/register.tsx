import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const registerAccount = async (values: any) => {
        if (values.password !== values.repassword) {
            window.alert("Mật khẩu không khớp");
        } else {
            await axios.post(
                "http://localhost:5000/register?username=" +
                values.username +
                "&password=" +
                values.password,
                {}
            ).then((res) => {
                if (res.data.response === true) {
                    window.alert("Đăng ký thành công!")
                    navigate('/login');
                } else {
                    window.alert("Tên đăng nhập đã tồn tại, hãy chọn tên khác!")
                }
            })
        }
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={6} >
                <h1> BKPOS </h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={(values) => registerAccount(values)}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Hãy nhập tên đăng nhập của bạn!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Hãy nhập mật khẩu của bạn!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>
                    <Form.Item
                        name="repassword"
                        rules={[{ required: true, message: 'Hãy nhập mật khẩu của bạn!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Register;