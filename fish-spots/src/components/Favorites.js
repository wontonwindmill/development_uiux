import Posts from "./Posts" 
import FilterSort from "./FilterSort";
import { Space } from 'antd';

export default function Favorites(props){
    return ( 
            <Space direction="vertical"  style={{ display: 'flex' }}>
                <h2>Saved favorites here:</h2>
                <FilterSort posts={props.favorites} updatePostsOrFavorites={props.updateFavorites}></FilterSort>
                {props.filteredFavorites.length == 0 ? (
                    <p>No saved posts yet!</p>
                ) : (
                    <Posts posts={props.filteredFavorites} favoriteAction="Delete" isMobile={props.isMobile} favoriteFunc={props.removeFavorite}/>
                )}
            </Space>
        )
}