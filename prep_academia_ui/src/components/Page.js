import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom';

const baseUrl = "http://127.0.0.1:8000/api"

function Page(){
    const [pageData, setPageData]=useState([]);
    let {page_id, page_slug} = useParams();

    useEffect(()=>{
        axios.get(`${baseUrl}/page/${page_id}/${page_slug}`)
        .then((res)=>{
            setPageData(res.data);
        });
    },[page_id]);
    console.log(pageData)
    return(
  <div>
   <div>
   <header id="fh5co-header" className="fh5co-cover fh5co-cover-sm" role="banner" style={{backgroundImage: 'url(../../assets/images/img_bg_2.jpg)'}} data-stellar-background-ratio="0.5">
    <div className="overlay" />
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center">
          <div className="display-t">
            <div className="display-tc animate-box" data-animate-effect="fadeIn">
              <h1>{pageData.title}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
   </header>
   </div>
  </div>
    )
}

export default Page;