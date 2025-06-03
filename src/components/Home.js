import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
  }
  const slideImages = [
    {
      url: '/images/banner.jpg'
    },
    {
      url: '/images/banner-2.jpg'
    },
    {
      url: '/images/banner-3.jpeg'
    },
    {
      url: '/images/banner-4.webp'
    }, 
    {
      url: '/images/banner-5.webp'
    }
  ];
  

function Home(){
    const [featprods,setfeatprods]=useState([]); 
    const [loading,setloading]=useState(false); 
    const fetchfeatprods=async()=>
    {
      setloading(true); 
        try
        {
            const apiresp=await axios.get(`${process.env.REACT_APP_APIURL}/api/getfeatprods`); 
            if(apiresp.data.success)
            {
                setfeatprods(apiresp.data.prodsdata); 
            }
        }
        catch(e)
        {
            console.log("Failed to fetch featured products", e.message); 
        }
    }
    useEffect(()=>
    {
        fetchfeatprods();
    },[]); 
    return(
        <>
        <Helmet>
            <title>Home Page</title>
        </Helmet>
        <div className="ckeckout">
                <div className="slide-container" style={{marginTop: '-80px'}}>
        <Slide autoplay={true} duration={3000} transitionDuration={500} infinite={true}>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{textAlign: 'center'}}>
                <img src={slideImage.url} style={{width: '100%', height: 'auto', maxHeight: '700px'}}/>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    </div>
    <div className="shoes" style={{ padding: '30px' }}>
  <div className="container">
  {loading && featprods.length>0 && (
    <h2 style={{fontWeight:'600', marginBottom:'10px', textAlign: 'center'}}>Top Picks of the Season</h2>
  )}
    <div className="product-one" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {featprods.length > 0 ? featprods.map((pdata, i) => (
        <div className="col-md-3 product-left" key={i} style={{ marginBottom: '20px' }}>
          <div className="p-one simpleCart_shelfItem">
            <Link to={`/details?pid=${pdata._id}`}>
              <img src={`uploads/${pdata.picname}`} alt="" height="150" />
              <h4>{pdata.prodname}</h4>
            </Link>
          </div>
        </div>
      )) : <p>No featured products available.</p>}
    </div>
  </div>
</div>
        </>
    )
}
export default Home