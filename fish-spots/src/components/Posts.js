
import { Card, Image, Row, Col, Typography, Tag, Flex, Space, message } from 'antd';

const { Text } = Typography;

export default function Posts(props){

    const success = () => {
        message.success(`${props.favoriteAction}d`)
    };

    return(
        <Space direction="vertical"  style={{ display: 'flex' }}>
            {props.posts.map((item) =>(
                <Card 
                  className="card" 
                  size="small"
                  title={<div><p>{item.title}</p> <Text type='secondary'>{item.date_posted}</Text></div>} 
                  description={item.date_posted} 
                  extra=
                    {
                        <a onClick={(e) => {success(); e.preventDefault(); props.favoriteFunc(item);}} href="#">{props.favoriteAction}</a>
                    } 
                  >
                  {props.isMobile ? (
                    <div>
                      <Flex direction="horizontal">
                        <div>
                            <Image
                              src={item.image}
                              alt={item.fish_category}
                            />
                            <Text type="secondary">{"("+item.image_credit+")"}</Text>
                          </div>     
                      </Flex>
                      <p className="description">{item.description}</p>
                      <h4>Locations: </h4>
                      {item.locations.map((location) => <Tag color="geekblue">{location}</Tag>)}
                      <h4>Months:</h4>
                      {item.months.map((month) => <Tag color="green">{month}</Tag>)}
                      <h4>Fish Species: </h4>
                            {item.fish_types.map((type) => <Tag color="volcano">{type}</Tag>)}
                    </div>
                  ) : (
                    <Row gutter={16}>
                      <Col className="card-image-column" span={8}>
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
                      <Col span={16}>
                        <p className="description">{item.description}</p>
                        <h4>Locations: </h4>
                        {item.locations.map((location) => <Tag color="geekblue">{location}</Tag>)}
                        <h4>Months:</h4>
                        {item.months.map((month) => <Tag color="green">{month}</Tag>)}
                      </Col>
                    </Row>
                  )}         
                </Card>
              ))}
        </Space>
    )
}