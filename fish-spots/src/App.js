import './App.css';
import { Checkbox, Tabs } from 'antd';
import { useState, useEffect } from 'react';
import Favorites from './components/Favorites';
import MainPosts from './components/MainPosts';
import posts_data from "./assets/posts-data.json";

posts_data.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  const [ posts, setPosts ] = useState(posts_data);
  const [ favorites, setFavorites ] = useState([]);
  const [ filteredPosts, setFilteredPosts ] = useState(posts_data)
  const [ filteredFavorites, setFilteredFavorites ] = useState([])

  const [isDesktop, setDesktop] = useState(window.innerWidth > 900);
  const [isMobile, setMobile] = useState(window.innerWidth < 400);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 900);
    setMobile(window.innerWidth < 400);
  };
  
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    updateMedia()
    return () => window.removeEventListener("resize", updateMedia);
  });
  
  const updatePosts = (posts) => {
    setFilteredPosts(posts);
  }

  const updateFavorites = (favs) => {
    console.log("updating favorites")
    setFilteredFavorites(favs);
  }

  function hasObjectWithId(list, id) {
    return list.find(item => item.id == id) !== undefined;
  }

  const addFavorite = (item) => {
    setFavorites((favorites) => 
      {
        var copy_favorites = [].concat(favorites);
        if(!hasObjectWithId(copy_favorites, item.id)){
          copy_favorites.push(item);
        }
        console.log(`favorite after adding is ${copy_favorites[0].title}`)
        return copy_favorites;
      });
      setFilteredFavorites((filteredFavorites) => 
      {
        var copy_favorites = [].concat(filteredFavorites);
        if(!hasObjectWithId(copy_favorites, item.id)){
          copy_favorites.push(item);
        }
        console.log(`favorite after adding is ${copy_favorites[0].title}`)
        return copy_favorites;
      });
  }
  const removeFavorite = (item) => {
    var copy_favorites = [].concat(favorites);
    var output = copy_favorites.filter(fav => fav.id !== item.id)
    setFavorites(output)
    copy_favorites = [].concat(filteredFavorites);
    output = copy_favorites.filter(fav => fav.id !== item.id)
    setFilteredFavorites(output)
  }

  const tabs_content= [
    {
      key: '1',
      label: 'Posts',
      children: 
        <div className='body-tab'>
          <div className="tab-section">
            <MainPosts isMobile={isMobile} posts={posts} filteredPosts={filteredPosts} updatePosts={updatePosts} addFavorite={addFavorite}/>
          </div>
        </div>,
    },
    {
      key: '2',
      label: 'Favorites',
      children: 
        <div className='body-tab'>
          <div className="tab-section">
            <Favorites isMobile={isMobile} favorites={favorites} filteredFavorites={filteredFavorites} updateFavorites={updateFavorites} removeFavorite={removeFavorite}/>
          </div>
        </div>
    },
  ];

  return (
    <div className="app">
      <div className="header">
        <h1>Gone Fishing?<span className="smaller-text"> in Washington State</span></h1>
        <p>After much research, here is the best fishing in Washington State! These fish are the tastiest and easiest to catch. Most require only a rod, and a simple boat helps with a few.</p>
      </div>
      <hr/>

      {isDesktop ? (
        <div className="body">
          <div className="body-section">
            <MainPosts isMobile={isMobile} posts={posts} filteredPosts={filteredPosts} updatePosts={updatePosts} addFavorite={addFavorite}/>
          </div>
          <hr className="divider"/>
          <div className="body-section">
            <Favorites isMobile={isMobile} favorites={favorites} filteredFavorites={filteredFavorites} updateFavorites={updateFavorites} removeFavorite={removeFavorite}/>
          </div>
        </div>
      ) : (
        <div>
          <Tabs defaultActiveKey="1" items={tabs_content}/>
        </div>
      )}

    </div>
  );
}

export default App;
