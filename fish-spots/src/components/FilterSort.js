import { useState, useEffect } from 'react';
import { Space, Dropdown, Checkbox } from 'antd';

import {
    DownOutlined
} from '@ant-design/icons';

const fishOptions = ["Trout", "Salmon", "Perch", "Squid", "Rockfish", "Bottomfish", "Crustacean","Smelt"];
const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function FilterSort(props){
    const [ fishFilters, setFishFilters ] = useState(fishOptions);
    const [ monthFilters, setMonthFilters ] = useState(monthOptions);

    const filter = () => {
        const copy_posts = [].concat(props.posts);
        console.log(`posts is ${props.posts}`)
        console.log(copy_posts)
        const filtered = copy_posts.filter((post) => {
            var copy_month_filters = [].concat(monthFilters);
            var copy_fish_filters = [].concat(fishFilters);
            console.log(`month filters is ${copy_month_filters}`)
            const intersection = copy_month_filters.filter(value => post.months.includes(value));
            return (copy_fish_filters.includes(post.fish_category)&& intersection.length > 0)
        });
        props.updatePostsOrFavorites(filtered)
    }
    
    useEffect(filter,[fishFilters, monthFilters]);

    const checkAllFish = fishOptions.length === fishFilters.length;
    const checkAllMonths = monthOptions.length === monthFilters.length;

    const onFishCheckAllChange = (e) => {
        setFishFilters(e.target.checked ? fishOptions : []);
    };

    const onMonthCheckAllChange = (e) => {
        console.log("month check all change")
        console.log(e.target.checked ? monthOptions : [])
        setMonthFilters(e.target.checked ? monthOptions : []);
    };

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

    function convertDateFormat(dateString) {
        // Split the input string by "-"
        var parts = dateString.split("-");
        // Rearrange the parts into YYYY-MM-DD format
        var formattedDate = parts[2] + "-" + parts[0] + "-" + parts[1];
        return formattedDate;
    }
      
    const sortPosts = (e) => {
        const sorted_posts = [].concat(props.posts).sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          if(e.key == "latest"){
            return new Date(convertDateFormat(b.date_posted)) - new Date(convertDateFormat(a.date_posted));
          }else if(e.key == "oldest"){
            return new Date(convertDateFormat(a.date_posted)) -  new Date(convertDateFormat(b.date_posted));
          }
            
        });
        props.updatePostsOrFavorites(sorted_posts);
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

    const sort_categories= [
        {
        label: 'Latest',
        key: 'latest'
        },
        {
        label: 'Oldest',
        key: 'oldest'
        },
    ];

    return(
        <div className="filter-sort">
              <Space direction="horizontal">
                <Dropdown 
                  menu={{
                    items: fish_categories, 
                    onClick:(e) => {e.domEvent.stopPropagation();}
                  }} 
                  
                  trigger={['click']}
                >
                  <button onClick={(e) => {e.stopPropagation(); e.preventDefault();}} className="button">Fish Type <DownOutlined/></button>
                </Dropdown>
                <Dropdown menu={{items: months}} trigger={['click']}>
                  <button className="button">Months <DownOutlined/></button>
                </Dropdown>
              </Space>
              <Dropdown 
                menu={{
                  items: sort_categories,
                  selectable: true,
                  defaultSelectedKeys: ['latest'],
                  onClick:(e) => {sortPosts(e)}
                }} 
                trigger={['click']}
              >
                  <button className="button">Sort: <DownOutlined/></button>
              </Dropdown>
            </div>
    )
}