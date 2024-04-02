import {
    DownOutlined
} from '@ant-design/icons';
import Posts from './Posts';
import { Space, Dropdown } from 'antd';

export default function MainPosts(props){
    return (
          <Space direction="vertical"  style={{ display: 'flex' }}>
            <h2>Find your favorite fishing spots!</h2>
            <div className="filter-sort">
              <Space direction="horizontal">
                <Dropdown 
                  menu={{
                    items: props.fish_categories, 
                    onClick:(e) => {e.domEvent.stopPropagation();}
                  }} 
                  
                  trigger={['click']}
                >
                  <button onClick={(e) => {e.stopPropagation(); e.preventDefault();}} className="button">Fish Type <DownOutlined/></button>
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
                  onClick:(e) => {props.sortPosts(e)}
                }} 
                trigger={['click']}
              >
                  <button className="button">Sort: <DownOutlined/></button>
              </Dropdown>
            </div>
            {props.posts.length == 0 ? (
                <p>Delete some filters to see more posts!</p>
              ) : (
                <Posts posts={props.posts} isMobile={props.isMobile} favoriteAction="Save" favoriteFunc={props.addFavorite}/>
              )
            }
          </Space>
    )
}