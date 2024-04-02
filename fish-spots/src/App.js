import './App.css';
import { Checkbox, Tabs } from 'antd';
import { useState, useEffect } from 'react';
import Favorites from './components/Favorites';
import MainPosts from './components/MainPosts';
import posts_data from "./assets/posts-data.json";

posts_data.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

const sort_categories= [
  {
    label: 'Latest',
    key: 'latest'
  },
  {
    label: 'Oldest',
    key: 'oldest'
  },
]

function convertDateFormat(dateString) {
  // Split the input string by "-"
    var parts = dateString.split("-");

    // Rearrange the parts into YYYY-MM-DD format
    var formattedDate = parts[2] + "-" + parts[0] + "-" + parts[1];

    return formattedDate;
}

const fishOptions = ["Trout", "Salmon", "Perch", "Squid", "Rockfish", "Bottomfish", "Crustacean","Smelt"];
const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function App() {
  const [ posts, setPosts ] = useState(posts_data);
  const [ favorites, setFavorites ] = useState([]);
  const [ fishFilters, setFishFilters ] = useState(fishOptions);
  const [ monthFilters, setMonthFilters ] = useState(monthOptions);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 900);
  const [isMobile, setMobile] = useState(window.innerWidth < 400);

  const checkAllFish = fishOptions.length === fishFilters.length;

  const onFishCheckAllChange = (e) => {
    setFishFilters(e.target.checked ? fishOptions : []);
  };

  const checkAllMonths = monthOptions.length === monthFilters.length;

  const onMonthCheckAllChange = (e) => {
    setMonthFilters(e.target.checked ? monthOptions : []);
  };

  const updateMedia = () => {
    setDesktop(window.innerWidth > 900);
    setMobile(window.innerWidth < 400);
  };
  
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    updateMedia()
    return () => window.removeEventListener("resize", updateMedia);
  });
  
  const filter = () => {
    var copy_posts = [].concat(posts_data);
    const filtered = copy_posts.filter((post) => {
      var copy_month_filters = [].concat(monthFilters);
      var copy_fish_filters = [].concat(fishFilters);
      const intersection = copy_month_filters.filter(value => post.months.includes(value));
      return (copy_fish_filters.includes(post.fish_category)&& intersection.length > 0)
    });

    setPosts(filtered);
  }

  useEffect(filter,[fishFilters, monthFilters]);

  const updateMonthFilters = (checked, month) => {
    var copy_filters = [].concat(monthFilters);
    if(checked){
      //checked
      if (!copy_filters.includes(month)) {
        setMonthFilters((filters) => 
        {
          var output = [].concat(filters);
          output.push(month);
          return output;
        });
      }

    }else{
      const index = copy_filters.indexOf(month);
      if (index !== -1) {
        setMonthFilters((filters) => {
          const output = [].concat(filters);
          output.splice(index, 1); 
          return output
        });
      }
    }  
  }

  const updateFishFilters = (checked, fish) => {
    var copy_filters = [].concat(fishFilters);
    if(checked){
      //checked
      if (!copy_filters.includes(fish)) {
        setFishFilters((filters) => 
        {
          var output = [].concat(filters);
          output.push(fish);
          return output;
        });
      }

    }else{
      const index = copy_filters.indexOf(fish);
      if (index !== -1) {
        setFishFilters((filters) => {
          const output = [].concat(filters);
          output.splice(index, 1); 
          return output
        });
      }
    }  
  }
  
  const sortPosts = (e) => {
    const sorted_posts = [].concat(posts).sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      if(e.key == "latest"){
        return new Date(convertDateFormat(b.date_posted)) - new Date(convertDateFormat(a.date_posted));
      }else if(e.key == "oldest"){
        return new Date(convertDateFormat(a.date_posted)) -  new Date(convertDateFormat(b.date_posted));
      }
        
    });
    setPosts(sorted_posts);
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
        return copy_favorites;
      });
  }
  const removeFavorite = (item) => {
    var copy_favorites = [].concat(favorites);
    const output = copy_favorites.filter(fav => fav.id !== item.id)
    setFavorites(output)
  }

  const ignoreHandler = (e) => e.preventDefault();

  const indeterminate_fish = fishFilters.length > 0 && fishFilters.length < 8;
  const indeterminate_months = monthFilters.length > 0 && monthFilters.length < 8;

  const fish_categories= [
    {
      label: <div onClick={(e) => e.stopPropagation()}>
        <Checkbox indeterminate={indeterminate_fish} onClick={ignoreHandler} checked={checkAllFish} onChange={onFishCheckAllChange}>Check All</Checkbox>
      </div>,
      key: 'checkAll'
    },
    {
      type: 'divider',
    },
  ].concat(
    fishOptions.map((fish) => {
      return {
        label: 
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox checked={fishFilters.includes(fish)} onClick={ignoreHandler} onChange={(e) => updateFishFilters(e.target.checked, fish)}>{fish}</Checkbox>
          </div>,
        key: fish
      }
    })
  );

  const months= [
    {
      label: <div onClick={(e) => e.stopPropagation()}>
        <Checkbox indeterminate={indeterminate_months} onClick={ignoreHandler} checked={checkAllMonths} onChange={onMonthCheckAllChange}>Check All</Checkbox>
      </div>,
      key: 'checkAll'
    },
    {
      type: 'divider',
    },
  ].concat(
    monthOptions.map((month) => {
      return {
        label: 
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox checked={monthFilters.includes(month)} onClick={ignoreHandler} onChange={(e) => updateMonthFilters(e.target.checked, month)}>{month}</Checkbox>
          </div>,
        key: month
      }
    })
  );

  const tabs_content= [
    {
      key: '1',
      label: 'Posts',
      children: 
        <div className='body-tab'>
          <div className="tab-section">
            <MainPosts isMobile={isMobile} posts={posts} fish_categories={fish_categories} months={months} sort_categories={sort_categories} sortPosts={sortPosts} addFavorite={addFavorite}/>
          </div>
        </div>,
    },
    {
      key: '2',
      label: 'Favorites',
      children: 
        <div className='body-tab'>
          <div className="tab-section">
            <Favorites isMobile={isMobile} favorites={favorites} removeFavorite={removeFavorite}/>
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
            <MainPosts posts={posts} fish_categories={fish_categories} months={months} sort_categories={sort_categories} sortPosts={sortPosts} addFavorite={addFavorite}/>
          </div>
          <hr className="divider"/>
          <div className="body-section">
            <Favorites favorites={favorites} removeFavorite={removeFavorite}/>
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
