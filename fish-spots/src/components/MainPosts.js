
import FilterSort from './FilterSort';
import Posts from './Posts';
import { Space, Dropdown } from 'antd';

export default function MainPosts(props){
    return (
          <Space direction="vertical"  style={{ display: 'flex' }}>
            <h2>Find your favorite fishing spots!</h2>
            <FilterSort posts={props.posts} updatePostsOrFavorites={props.updatePosts}></FilterSort>
            {props.filteredPosts.length == 0 ? (
                <p>Delete some filters to see more posts!</p>
              ) : (
                <Posts posts={props.filteredPosts} isMobile={props.isMobile} favoriteAction="Save" favoriteFunc={props.addFavorite}/>
              )
            }
          </Space>
    )
}