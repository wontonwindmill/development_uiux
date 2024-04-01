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

function App() {
  

  const [ posts, setPosts ] = useState(posts_data);
  const [ favorites, setFavorites ] = useState([]);
  const [ fishFilters, setFishFilters ] = useState(["trout", "salmon", "perch", "squid", "rockfish", "bottomfish", "crustacean","smelt"]);
  const [ monthFilters, setMonthFilters ] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
  
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
  
  
  const filter = () => {
    var copy_posts = [].concat(posts_data);
    const filtered = copy_posts.filter((post) => {
      var copy_month_filters = [].concat(monthFilters);
      var copy_fish_filters = [].concat(fishFilters);
      console.log(copy_month_filters)
      console.log(copy_fish_filters)
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
          console.log(`months are ${output}`
          )
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
    console.log("sorting");
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
    console.log(list)
    console.log(id)
    console.log(`Some stuff ${list.find(item => item.id == id)}`)
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

  const fish_categories= [
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateFishFilters(e.target.checked, 'trout')}>Trout</Checkbox>,
      key: 'trout'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateFishFilters(e.target.checked, 'salmon')}>Salmon</Checkbox>,
      key: 'salmon'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateFishFilters(e.target.checked, 'perch')}>Perch</Checkbox>,
      key: 'perch'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateFishFilters(e.target.checked, 'squid')}>Squid</Checkbox>,
      key: 'squid'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateFishFilters(e.target.checked, 'rockfish')}>Rockfish</Checkbox>,
      key: 'rockfish'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateFishFilters(e.target.checked, 'bottomfish')}>Bottomfish</Checkbox>,
      key: 'bottomfish'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateFishFilters(e.target.checked, 'crustacean')}>Crustacean</Checkbox>,
      key: 'crustacean'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateFishFilters(e.target.checked, 'smelt')}>Smelt</Checkbox>,
      key: 'smelt'
    },
  ];
  const months= [
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateMonthFilters(e.target.checked, 'January')}>January</Checkbox>,
      key: '1'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateMonthFilters(e.target.checked, 'February')}>February</Checkbox>,
      key: '2'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateMonthFilters(e.target.checked, 'March')}>March</Checkbox>,
      key: '3'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateMonthFilters(e.target.checked, 'April')}>April</Checkbox>,
      key: '4'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateMonthFilters(e.target.checked, 'May')}>May</Checkbox>,
      key: '5'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateMonthFilters(e.target.checked, 'June')}>June</Checkbox>,
      key: '6'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateMonthFilters(e.target.checked, 'July')}>July</Checkbox>,
      key: '7'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateMonthFilters(e.target.checked, 'August')}>August</Checkbox>,
      key: '8'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateMonthFilters(e.target.checked, 'September')}>September</Checkbox>,
      key: '9'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateMonthFilters(e.target.checked, 'October')}>October</Checkbox>,
      key: '10'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateMonthFilters(e.target.checked, 'November')}>November</Checkbox>,
      key: '11'
    },
    {
      label: <Checkbox defaultChecked={true} onChange={(e) => updateMonthFilters(e.target.checked, 'December')}>December</Checkbox>,
      key: '12'
    },
  ];

  const tabs_content= [
    {
      key: '1',
      label: 'Posts',
      children: 
        <div className='body-tab'>
          <MainPosts isMobile={isMobile} posts={posts} fish_categories={fish_categories} months={months} sort_categories={sort_categories} sortPosts={sortPosts} addFavorite={addFavorite}/>
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
