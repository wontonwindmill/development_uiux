import './App.css';
import { Checkbox, Tabs } from 'antd';
import { useState, useEffect } from 'react';
import Favorites from './components/Favorites';
import Posts from './components/Posts';

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

  const posts_data = [
    {
      id: 1,
      title: "Pink Salmon Bonanza",
      description: "Bush point and Lincoln Park offer easy access and ample shore fishing for Pink Salmon, often covered with anglers getting their limit for the day. Anglers by far choose a pink buzz bomb lure to get the job done.",
      fish_types: ["Pink Salmon"],
      fish_category: "salmon",
      locations: ["Bush Point", "Lincoln Park"],
      months: ["August"],
      date_posted: "01-15-2012",
      image: "images/pink_salmon.webp",
      image_credit: "The Seattle Times"
    },
    {
      id: 2,
      title: "Winter Hatchery Steelhead",
      description: "With regulations on keeping wild Steelhead, fishing abundant winter hatchery Steelhead is the best way to get a keeper. Steelhead migrate from the ocean to the river, and the best place to catch them is on rivers with large hatcheries, such as the Cowlitz. Anglers let a variety of lures drift downstream, wherever it is along the river bottom, through the water column, or floating with a bobber. Best conditions are when the water is neither high or low, with medium visibility that creates a famous \"Steelhead Green\" colored water.",
      fish_types: ["Steelhead Trout"],
      fish_category: "trout",
      locations: ["Cowlitz River", "Hoh River", "Kalama River", "Skykomish River"],
      months: ["November", "December", "January"],
      date_posted: "02-08-2011",
      image: "images/steelhead.jpg",
      image_credit: "Riptidefish"
    },
    {
      id: 3, 
      title: "Redtail Surf Perch",
      description: "Redtail Surf Perch is available year round but some say it is best in the winter. You can catch them from shore from a variety of coastal beaches. They are certainly tasty with a white meat. Most people use waders to cast from around waist deep in the surf. However, you must be careful of the conditions, since high winds and waves will make wading in the surf dangerous.",
      fish_types: ["Redtail Surf Perch"],
      fish_category: "perch",
      locations: ["Pacific Beach State Park", "Mocrocks Beach", "Ruby Beach", "La Push Beach", "Long Beach"],
      months: ["Janurary", "February", "March", "April", "May", "June", "July", "August"],
      date_posted: "09-20-2023",
      image: "images/Sea_Perch.jpg",
      image_credit: "LeeRoy's Ramblings"
    },
    { 
      id: 4,
      title: "Puget Sound Coho Salmon",
      description: "There are two runs of Coho in the Puget Sound. One is the resident Puget Sound population that opens for fishing in June or July, and continues until October. The other is the ocean-going population that migrates back from the ocean to the Puget Sound peaking in August and September. Combined, these two runs form an impressive fishery in August and September. Trolling from a boat or fishing from shore is both common. Shore fishing is done with a bobber and herring, or a metal jig.",
      fish_types: ["Coho Salmon"],
      fish_category: "salmon",
      locations: ["Bush Point", "Richmond Beach", "Point no Point", "West Point", "Point Wells and Oil Docks"],
      months: ["June", "July", "August", "September"],
      date_posted: "08-25-2016",
      image: "images/coho.jpg",
      image_credit: "Riptidefish"

    },
    {
      id: 5,
      title: "Columbia River Salmon",
      description: "Down from a conservative estimate of 16 million annual salmon, around 2 million salmon return every year to the Columbia River. There are three seasons, with a modest spring season, a weak summer season, and a large fall season. In the spring from March to May, smaller chinooks can be had. In the summer season from June to July, the biggest Chinook historically come in, but most of them are extinct now. Sockeye also come in almost exclusively in this time. From August to October, a large run of Chinooks also come in high numbers and good sizes too. Cohos also come in these fall months exclusively. To catch these fish, bank fishing is done with a large surf rod and can be challenging to a novice. Charter boats that troll for Salmon are also very common, and even beginners enjoy success through them.",
      fish_types: ["Chinook Salmon", "Sockeye Salmon", "Coho Salmon"],
      fish_category: "salmon",
      locations: ["Lower Columbia River"],
      months: ["March", "April", "May", "June", "July", "August", "September", "October"],
      date_posted: "08-15-2015",
      image: "images/columbia_salmon.jpg",
      image_credit: "Terry Otto/The Columbian"
    },
    {
      id: 6,
      title: "Columbia River Summer Steelhead",
      description: "Not to be forgotten for the mightier salmon runs, the Columbia River also support a large run of summer steelhead. Steelhead are related to salmon, taste really good, and also migrate to and from the sea. While fishing for salmon anglers can also target  steelhead, since they overlap with salmon. Steelhead runs from July to October, overlapping with the summer and fall runs of salmon. Steelhead are caught from the bank most commonly by plunking, and from boats anchoring and letting out spinners.",
      fish_types: ["Steelhead Trout"],
      fish_category: "trout",
      locations: ["Lower Columbia River"],
      months: ["July", "August", "October"],
      date_posted: "06-15-2020",
      image: "images/columbia_steelhead.webp",
      image_credit: "Lance Fisher Fishing"
    },
    {
      id: 7,
      title: "Alpine Lake Trout",
      description: "Alpine Lakes trout are an interesting and rewarding fishery, not always guaranteed with big fish, but always great views. The biggest trout are found in lakes with sparse amounts of fish, stocked around 3-4 years ago. Unfortunately, no alpine lakes have been stocked since 2017, so most of the stocked fish should be dead now. The other option is naturally reproducing lakes, where trout are able to spawn offspring. These lakes often have abundant, smaller fish. There are even lakes listed as \"overpopulated\" by the WDFW, with so many fish they are overpopulated. These lakes are good to start with, as they have plenty of fish to catch, although they won't be as big. For larger fish, lakes on the east side of the Cascades tend to have bigger fish.",
      fish_types: ["Rainbow Trout", "Brown Trout", "Cutthroat Trout", "Golden Trout"],
      fish_category: "trout",
      locations: ["Alpine Lakes Wilderness"],
      months: ["June", "July", "August", "September"],
      date_posted: "03-15-2024",
      image: "images/alpine_lakes_trout.jpg",
      image_credit: "Riptidefish"
    },
    {
      id: 8,
      title: "Puget Sound Squidding",
      description: "Puget Sound has a abundant squid harvest each year, with a winter season in the Central Puget Sound. Easy access from piers near the city make it a popular pastime. People bring their own lights, and jig from a lit pier as well since light attracts squid. Nighttime is good but often the day is good too. People buy locally made jigs from fishermen on the piers, since the local squid prefer these special jigs. Jigging is easy with a rod, reel, and a squid jig, letting the jig fall for a few seconds before pulling up. Squids have a year life cycle so they are not prone to overfishing and reliably come back every year.",
      fish_types: ["Squid"],
      fish_category: "squid",
      locations: ["Edmonds Pier", "Alki Point", "Pier 70"],
      months: ["September", "October", "November", "December", "January"],
      date_posted: "01-05-2024",
      image: "images/squid.jpg",
      image_credit: "WDFW"
    },
    {
      id: 9,
      title: "Puget Sound Lingcod",
      description: "Lingcod are a large bottom fish, similar flesh to halibut or cod. They are protected well by regulations, allowing you to only catch one per day from 26 to 36 inches. This means it is not hard to catch one every year. Lingcod love rocky areas so the rocky San Juans are perfect. You can fish with metal jigs like buzz bombs, or plastic jigs with a weight, or even live bait. There are lots of greenling around the San Juans that you can catch for bait.",
      fish_types: ["Pacific Lingcod"],
      fish_category: "bottomfish",
      locations: ["San Juan Islands", "Double Bluff on Whidbey Island", "Possesion Bar", "Deception Pass"],
      months: ["May", "June"],
      date_posted: "05-05-2021",
      image: "images/lingcod.jpg",
      image_credit: "Riptidefish"
    },
    {
      id: 10,
      title: "Eulachon Smelt",
      description: "Eulachon Smelt have signifcant historical significance, as a huge source of fish oil for PNW native tribes. The fish is so oily they would dry it and light it on fire as a candle, and extract vats of it for potlatch feasts. The fish stocks have suffered and now it is on the endangered species list in the Columbia River, so limited harvests allowed. Recently, one day seasons are the norm, in February or March. This occurs on the Cowlitz river, a tributary of the Columbia River. Interestingly, these are dip net seasons, where you use a net to catch the fish.",
      fish_types: ["Eulachon Smelt"],
      fish_category: "smelt",
      locations: ["Cowlitz River"],
      months: ["February", "March"],
      date_posted: "07-05-2021",
      image: "images/eulachon.jpg",
      image_credit: "Northwest Power and Conservation Council"
    },
    {
      id: 11,
      title: "Dungeness Crabs",
      description: "Crabbing is a favorite pasttime for PNW resients, and it is not hard to catch them. Many locations have crabs, and they prefer sandy bottoms not too deep and preferably with eelgrass. Near rivers is often good too. A protected bay will prevent crab pots from floating away, and make sure the tides aren't rising too much or your pot could get pulled away.",
      fish_types: ["Dungeness Crab"],
      fish_category: "crustacean",
      locations: ["Alki Point", "Bainbridge Island", "Shoreline between Kingston and President's Point", "Browns Bay near Edmonds", "Guemes Island", "Cama Beach"],
      months: ["June", "July", "August"],
      date_posted: "01-05-2024",
      image: "images/crab.jpg",
      image_credit: "This is Whidbey"
    },
    {
      id: 12,
      title: "Jetty Black Rockfish",
      description: "Black Rockfish is a clean, mild tasting fish that suits cooking a variety of dishes. You can fish it off of a jetty with a swimbait lure and 9ft pole. You can also catch Lingcod with the same setup.",
      fish_types: ["Black Rockfish"],
      fish_category: "rockfish",
      locations: ["Ocean Shores Jetty", "Westport Jetty"],
      months: ["March", "April", "May", "June", "July", "August"],
      date_posted: "11-05-2019",
      image: "images/sea_bass.jpg",
      image_credit: "Riptidefish"
    }
  ]
  posts_data.forEach((item) => {
    item.image = process.env.PUBLIC_URL + "/" + item.image;
  });

  const [ posts, setPosts ] = useState(posts_data);
  const [ favorites, setFavorites ] = useState([]);
  const [ fishFilters, setFishFilters ] = useState(["trout", "salmon", "perch", "squid", "rockfish", "bottomfish", "crustacean","smelt"]);
  const [ monthFilters, setMonthFilters ] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
  
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 900);
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
        <div className='body'>
          
          <Posts posts={posts} fish_categories={fish_categories} months={months} sort_categories={sort_categories} sortPosts={sortPosts} addFavorite={addFavorite}/>
        </div>,
      
    },
    {
      key: '2',
      label: 'Favorites',
      children: 
        <div className='body'>
          <div className="tab-section">
            <Favorites favorites={favorites} removeFavorite={removeFavorite}/>
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
            <Posts posts={posts} fish_categories={fish_categories} months={months} sort_categories={sort_categories} sortPosts={sortPosts} addFavorite={addFavorite}/>
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
