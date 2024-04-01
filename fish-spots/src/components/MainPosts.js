import {
    DownOutlined
} from '@ant-design/icons';
import Posts from './Posts';
import { Space, Typography, Dropdown, Card, Image, Row, Col, Tag, Flex  } from 'antd';

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
            <Posts posts={props.posts} isMobile={props.isMobile} favoriteFunc={props.addFavorite}/>
          </Space>
    )
}