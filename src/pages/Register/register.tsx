import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Register = () => {
    const registerAccount = (values: any) => {
        console.log('New registered account is', values);
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={6} >
                <h1> BKPOS </h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={registerAccount}
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