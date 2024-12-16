export default function SecondNavBar(props) {
  const { colorStyle } = props;
//   repeating-linear-gradient(rgb(255, 140, 0) 2%, black 98%) rgb(255, 119, 0) rgb(255, 119, 0)
  return (
    <>
    <div  className={`second-navbar  g-dark  position-absolute  mt-50 mx2 p-1`} style={{top:'0%', transform:'translateY(-110%)'}}>
      <div className="p- md-5">
        <span
          className="bi bi-grid-fill text-warning second-navbar-icon h2 mt-md-5 "
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sideBarCanvas"
        >
        </span>
      </div>
    </div>
    <div className="" style={{marginBottom:'100px'}}></div>
    </>
  );
}
