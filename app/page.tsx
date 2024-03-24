"use client"
import { useEffect, useState } from "react";
import "../public/App.css";
import { IconAt } from '@tabler/icons-react';
import { IconPhoneCall } from '@tabler/icons-react';
import { IconBrandDribbble } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { IconUserPlus } from '@tabler/icons-react';
import { IconStar } from '@tabler/icons-react';


export default function HomePage() {
  const [userData, setUserData] = useState([]);
  const [followStatus, setFollowStatus] = useState(true);
  const [followList, setFollowList] = useState([]);
  const [errorShow, setErrorShow] = useState("")
  const fetchData = () => {
    return new Promise(async(resolve, reject)=> {
      try{
        if(errorShow == ""){
          const url = await fetch("https://jsonplaceholder.typicode.com/users");
          if (!url.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await url.json();
          resolve(data);
          setErrorShow("")
        }
      }
      catch(err){
        reject(err);
        setErrorShow("Failed TO fetch API")
      }
    })
  }
  useEffect(()=> {
    fetchData().then((res)=> setUserData(res));
  },[]);
  console.log(errorShow)
const handleFollowClick = (item) => {
  const updatedFollowList = [...followList];
  const index = updatedFollowList.findIndex((followedItem) => followedItem === item);
  
  if (index !== -1) {
    updatedFollowList.splice(index, 1);
  } else {
    updatedFollowList.push(item);
  }

  setFollowStatus(!followStatus); 
  setFollowList(updatedFollowList);
};

  const handleDeleteClick = (selectedItem) => {
    setUserData((prev)=> [...prev].filter(item => item != selectedItem))
  }
  return(
    <>
    <div className="homePage">
      <div className="cardsDiv">
        {
          errorShow != "" ? <div>{errorShow}</div> : userData && userData.map((item,i)=> {
            return <div key={i} className="card">
            <div className="headingDiv">
              <div className="nameInitial"><img src = {`https://api.dicebear.com/7.x/initials/svg?seed=${item.name}`} alt={`userInitial`} />JD</div>
              <div className="name">{item.name} {followList.includes(item) ? <IconStar width="16" height="16"/> : ''}</div>
            </div>
            <div className="dataDiv">
              <a className="email" href={`mailto:${item.email}`} ><IconAt stroke={2} width="16" height="16"/>{item.email}</a>
              <a className="phone" href={`tel:${item.phone}`}><IconPhoneCall stroke={2} width="16" height="16"/>{item.phone}</a>
              <a className="website" href={item.website} target="_blank"><IconBrandDribbble stroke={2} width="16" height="16"/>{item.website}</a>
            </div>
            <div className="bottomDiv">
              <button className={`followBtn ${followList.includes(item) ? 'follow' : ''}`} onClick={()=>handleFollowClick(item)}><IconUserPlus width="16" height="16"/>{followList.includes(item) ? "Unfollow" : "Follow"}</button>
              <button className="deleteBtn" onClick={()=>handleDeleteClick(item)}><IconTrash width="16" height="16"/> Delete</button>
            </div>
          </div>
          })
        }
        
        
      </div>
    </div>
    </>
  )
}
