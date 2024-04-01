import {
    DownOutlined
} from '@ant-design/icons';

import { Card, Space, Image, Row, Col, Typography, Tag, Dropdown, Flex } from 'antd';

const { Text } = Typography;

export default function MainPosts(props){
    return (
          <Space direction="vertical"  style={{ display: 'flex' }}>
            <h2>Find your favorite fishing spots!</h2>
            <div className="filter-sort">
              <Space direction="horizontal">
                <Dropdown 
                  menu={{
                    items: props.fish_categories, 
                  }} 
                  trigger={['click']}
                >
                  <button className="button">Fish Type <DownOutlined/></button>
                </Dropdown>
                <Dropdown menu={{items: props.months}} trigger={['click']}>
                  <button className="button">Months <DownOutlined/></button>
                </Dropdown>
              </Space>
              <Dropdown 
                menu={{
                  items: props.sort_categories,
                  selectable: true,
                  defaultSelectedKeys: ['latest'],
                  onClick: props.sortPosts
                }} 
                trigger={['click']}
              >
                  <button className="button">Sort: <DownOutlined/></button>
              </Dropdown>
            </div>
            
              
            {props.posts.map((item) =>(
              <Card 
                className="card" 
                size="small"
                title={<div><p>{item.title}</p> <Text type='secondary'>{item.date_posted}</Text></div>} 
                description={item.date_posted} 
                extra=
                  {
                    <a onClick={(e) => {e.preventDefault(); props.addFavorite(item);}} href="#">Save</a>
                  } 
                >
                {props.isMobile ? (
                  <div>
                    <Flex direction="horizontal">
                      <div>
                          <Image
                            src={item.image}
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