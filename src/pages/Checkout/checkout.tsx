import { Row, Col, Card } from "antd";
import './checkout.css';

const CheckOut = () => {
    return (
        <>
            <Row justify="center" align="middle" className="receipt">
                <Col span={24} style={{ alignContent: 'center', alignItems: 'center' }}>
                    <Card style={{ width: '100%' }} title="Phiếu thanh toán đơn hàng">

                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CheckOut;