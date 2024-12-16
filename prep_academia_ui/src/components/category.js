import {Link, useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import {useState,useEffect} from 'react'

const baseUrl = 'http://127.0.0.1:8000/api';
const url = `${baseUrl}/category/`;

function Category(){
  const [categoryData, setCategoryData]=useState([]);
  const [nextCategory, setNextCategory]= useState();
  const [previousCategory, setPreviousCategory]= useState();
  const [dataIsAvailable, setDataAvailable] = useState(false);
  const [searchData, setSearchData] = useState(false);
  const navigate = useNavigate();
  const search = searchData.search;

  useEffect(()=>{
    if(search){
      try {
        axios.get(`${process.env.REACT_APP_API_URL}/get-category/${search}`)
        .then((res) => {
          setCategoryData(res.data.results);
        })
      } catch (error) {
        
      }
      
    }else{  
      try {
        axios.get(url).then((res)=>{
          setNextCategory(res.data.next);
          setPreviousCategory(res.data.previous);
          setCategoryData(res.data.results);
          setDataAvailable(true);
          console.log(res.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
    
  },[search]);

  const  imageSrc = (src)=>{
    console.log(src)
   return src.startsWith('http') ? src : `http://127.0.0.1:8000/${src}`
  }




  const paginationHandler=(url)=>{
    try {
      axios.get(url)
      .then((res)=>{
        setNextCategory(res.data.next);
        setPreviousCategory(res.data.previous);
        setCategoryData(res.data.results)
      })        
    } catch (error) {
      console.log(error)
    }  
  };  



  const searchDataOnchange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]:e.target.value
    });  
    
  
  };  

  const submitCourseSearch = () => {
  };  


  console.log(categoryData);
  const imgStyle = {
    'width':'100%',
    'height':'100%',
    'object-fit':'cover',
  };

  const height = {
    'height':'230px',
    'width':'100%',
    'object-fit':'cover'
  }

  const containerStyle2 = {
    'box-shadow':'1px 1px 5px 1px grey',
    "border-radius":'2px'
  }

// const containerStyle2 = {
//   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//   borderRadius: '10px',
//   overflow: 'hidden',
// };

const imageStyle = {
  width: '100%',
  height: 'auto', // Keep aspect ratio
  objectFit: 'cover', // Ensures the image covers the container proportionally
  borderRadius: '10px 10px 0 0', // Rounded corners for the top
};

const overlayText = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
  textAlign: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background for better readability
  padding: '10px',
  borderRadius: '5px',
  width: '90%', // Responsive width
};
    return(
  <div className='m-5'>

   {/* Courses Start */}
   <div className="container-xxl py-5">
    <div className="m-5 text-center wow fadeInUp my-5 " data-wow-delay="0.1s">
        <h2 className="my-5 section-title bg-white text-center text-primary px-3  fs-1">All Categories</h2>
    </div>

    <div>
          <input
                      className="col-lg-3 col-md-4 form-control bg-light mb-0"
                      placeholder="Search courses"
                      name="search"
                      onChange={searchDataOnchange}
                    />
                
          </div>

    {dataIsAvailable ? (
      categoryData.length == 0 ? (
        <div className="text-center fw-bold display-6 mt-5 p-5">
          No categories yet !
        </div>
      ) : (
        <div className="container">
        <div className="row g-4">
          {categoryData && categoryData.map((course, index) => (
            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12" key={index}>
              <div className="course-item">
                <Link to={`/category/${course.title}/${course.id}`} className="course-link">
                  <div className="course-image-wrapper">
                    <img
                      src={imageSrc(course.category_thumbnail)}
                      alt={`${course.title}`}
                      className="img-fluid course-image"
                    />
                    <div className="course-overlay fs-1">
                      <h2 className="couse-title text-light">
                        {course.title.length > 15 ? `${course.title.slice(0, 15)}...` : course.title}
                      </h2>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>  
      )
    ) : (
      <div className="text-center fw-bold display-6 mt-5 p-5">
         Loading....
      </div>
    )}
  </div>

  {/* pagination start */}
  <div className='m-1 row justify-content-center float-center'>
    <nav aria-label='justify-content-center Page navigation example' className='d-flex justify-content-center'>
        <ul className='d-flex pagination m-5   justify-content-center col-6 m-5'>
            {previousCategory &&
              <li className='page- display'><Link className='page-link h4'  onClick={()=>paginationHandler(previousCategory)}>Previous</Link></li>
            }
            {nextCategory && 
              <li className='page-item'><Link className='page-link h4' onClick={()=>paginationHandler(nextCategory)}>Next</Link></li>
            }
        </ul>
    </nav>
      </div>
  {/* pagination end */}
 
  {/* Courses End */} 
        </div>
    )
}

export default Category;
//feng shui