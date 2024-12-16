import { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { Link } from "react-router-dom";

const ProgressChart = ({ courseId }) => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const response = await axiosInstance.get(`student/student-course-progress`);
      setProgressData(response.data);
      console.log(response);
    };

    fetchProgress();
  }, []);

  const containerStyle = {
    "border-radius": "2px",
    // "background":"rgb(235, 235, 235)"
    "box-shadow": "1px 1px 5px 1px grey",
  };

  const height = {
    height: "200px",
    width: "100%",
    "object-fit": "cover",
    // "border-radius": "2px",
  };

  console.log(progressData);

  return (
    <>
      <div className="borde col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
      <p className="display-5 bordr border-3 mb-5 fw-bold mt-5 d-lg-block text-center p-4 badge text-bg-dark fs-1 text-daek fw-bold text-light">
          <span className="bi bi-question-circle  me-3 "></span>
          My Progress
        </p>
      <div className="table-responsive">
        <table className="table table- table-bordered">
          <thead className="table-dark">
            <tr className="text-warnig">
              <th className="col">No</th>
              <th className="col">Course</th>
              <th className="col">Progress</th>
            </tr>
          </thead>
          <tbody>
            {progressData &&
              progressData.length > 0 &&
              progressData.map((progress, number) => (
                <tr
                >
                  <th>{++number}</th>
                  <td>{progress.course.title.length > 10
                    ? `${progress.course.title.slice(0, 16)}...`
                    : progress.course.title}</td>
                  <td>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-success "
                        aria-valuenow={progress.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: `${progress.progress}%` }}
                      >
                        <span className="fw-bold">{progress.progress}%</span>
                      </div>
                    </div>
                  </td>

                  {/* ---------- */}
                </tr>
              ))}


          </tbody>
        </table>
      </div>

      </div>
    </>
  );
};

export default ProgressChart;
