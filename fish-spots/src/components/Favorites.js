import Posts from "./Posts" 
import { Space } from 'antd';

export default function Favorites(props){
    return ( 
            <Space direction="vertical"  style={{ display: 'flex' }}>
                <h2>Saved favorites here:</h2>
                {props.favorites.length == 0 ? (
                    <p>No saved posts yet!</p>
                ) : (
                    <Posts posts={props.favorites} favoriteAction="Delete" isMobile={props.isMobile} favoriteFunc={props.removeFavorite}/>
                )}
            </Space>
        )
}