import { Card, Space, Image, Row, Col, Tag, Typography } from 'antd';

const { Text } = Typography;

export default function Favorites(props){
    return ( 
            <Space direction="vertical"  style={{ display: 'flex' }}>
                <h2>Saved favorites here:</h2>
                {props.favorites.map((item) =>(
                <Card 
                  className="card" 
                  title={<p>{item.title+" "}<Text type='secondary'>{item.date_posted}</Text></p>} 
                  description={item.date_posted} 
                  extra=
                    {
                      <a onClick={(e) => {e.preventDefault(); props.removeFavorite(item);}} href="#">Delete</a>
                    } 
                  >         
                  <Row gutter={16}>
                    <Col className="gutter-row" span={8}>
                        <div>
                          <Image
                            src={item.image}
                          />
                          <Text type="secondary">{"("+item.image_credit+")"}</Text>
                        </div>
                        <div>
                          <h4>Fish Species: </h4>
                          {item.fish_types.map((type) => <Tag color="volcano">{type}</Tag>)}
                        </div>            
                    </Col>
                    <Col className="gutter-row" span={16}>
                      <p className="description">{item.description}</p>
                      <h4>Locations: </h4>
                      {item.locations.map((location) => <Tag color="geekblue">{location}</Tag>)}
                      <h4>Months:</h4>
                      {item.months.map((month) => <Tag color="green">{month}</Tag>)}
                    </Col>
                  </Row>
                </Card>
              ))}
            </Space>
        )
}