import Posts from "./Posts" 
import { Space, Typography } from 'antd';

const { Text } = Typography;

export default function Favorites(props){
    console.log("some stuff")
    console.log(props.favorites.length)
    return ( 
            <Space direction="vertical"  style={{ display: 'flex' }}>
                <h2>Saved favorites here:</h2>
                {props.favorites.length == 0 ? (
                    <p>No saved posts yet!</p>
                ) : (
                    <Posts posts={props.favorites} isMobile={props.isMobile} favoriteFunc={props.addFavorite}/>
                )}
            </Space>
        )
}