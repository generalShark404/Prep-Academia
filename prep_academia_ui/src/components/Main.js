import {Routes, Route, BrowserRouter, Router, Outlet } from 'react-router-dom';
import { getLocalStorage } from './utilities';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap';
import Header from './header';
import Home from './home';
import Contact from './contact';
import Courses from './courses'
import Pricing from './pricing'
import Blog from './blog';
import CourseDetail from './courseDetail';
import PopularCourses from './popularCourses';
import CategoryCourses from './categoryCourses';
import PopularInstructors from './popularTeachers';
import EditCourse from './Instructor/editCourse';
import Search from './Search';
import StudyMaterials from './StudyMaterials';
import AddStudyMaterial from './AddStudyMaterial';
import Category from './category';
import FAQ from './FAQ';
import NotFound from './404';
import MyInstructors from './student/MyIntructors';
import About from './About';
import Quiz from './quiz';
import Quizes from './quizes';
import AddNoteAndSummary from './Instructor/addNotesAndSummaries';
import AllCourseTopics from './Instructor/AllCourseTopics';
import QuizResult from './QuizResult';

//Chapters
import AllChapters from './Instructor/courseChapters';
import EditChapters from './Instructor/editChapter';
import Topics from './Topics/Topics';

//Users / Students
import Login from './login';
import UserRegister from './student/register';
import OtpVerification from './otp/otp';
import UserDashboard from './student/dashboard';
import UserCourses from './student/userCourses';
import FavouriteCourses from './student/favouriteCourses';
import RecommendedCourses from './student/recommendedCourses';
import ProfileSetting from './student/profileSetting';
import ChangePassword from './student/changePassword';
import StudentLogout from './student/studentLogout';
import FavoriteCourses from './student/favouriteCourses';
import StudentAssignment from './student/studentAssignment';
import CourseQuizList from './student/CourseQuizList';
import TakeQuiz from './student/TakeQuizList';
import StudentStudyMaterials from './student/StudentStudyMaterials';
import AttemptedStudents from './Instructor/AttemptedStudents';
import VerifyStudent from './student/verifyStudent';
import WelcomeStudent from './student/welcomStudent';
import StudentQuiz from './student/studentQuiz';

// Instructor
import TeacherLogin from './Instructor/Teacherlogin';
import InstructorRegister from './Instructor/InstructorRegister';
import TeacherCourses from './Instructor/InstructorCourses';
import InstructorProfileSettings from './Instructor/InstructorProfileSettings';
import AddCourses from './Instructor/addCourses';
import AddTopic from './Instructor/AddTopic';
import TeacherDashboard from './Instructor/TeacherDashboard';
import Students from './Instructor/students';
import InstructorChangePassword from './Instructor/changePassword';
import TeacherDetail from './Instructor/InstructorDetail';
import AllCourses from './AllCourses';
import TeacherLogout from './Instructor/teacherLogout';
import EnrolledStudents from './Instructor/enrolledStudents';
import AddAssignment from './Instructor/addAssignment';
import ShowAssignment from './Instructor/showAssignment';
import AddQuiz from './Instructor/add-quiz';
import AllQuiz from './Instructor/allQuiz';
import EditQuiz from './Instructor/editQuiz';
import AddQuizQuestion from './Instructor/addQuizQuestions';
import AssignQuiz from './Instructor/assignQuiz';
import VerifyTeacher from './Instructor/verifyTeacher';
import ForgotPassword from './ForgotPassword';
import TeacherChangeForgotPassword from './Instructor/InstructorChangePassword';
import Loader from './loader';
import InstructorQuiz from './Instructor/instructorQuiz';
import EditTopic from './Instructor/editTopic';
import AllQuizQuestions from './Instructor/AllQuizQuestions';
import AllTopicNotes from './Instructor/AllTopicNotes';

import Summary from './Summary';
import Notes from './Note';

import Footer from './footer';
import QuizQuestions from './Instructor/QuizQuestions';

import Page from './Page';
import { AuthContext } from './auth-context';
import PasswordReset from './PasswordReset';
import SearchCourse from './searchCourse';
import CourseTags from '../CourseTags';
import AddNoteSample from './Instructor/AddNoteSample';
import Discussions from './discussions/discussions';
import Discussion from './discussions/discussionSample';
import EditNoteAndSummary from './Instructor/EditNote';

function Main() {
  const student = Boolean(getLocalStorage('user'));
  const instructor = Boolean(getLocalStorage('instructor'));

  return (
  <div className=''>
    
      <Header/>
      
      <Routes>
          {/* Main Pages */}
              {/* {!student && !instructor && */}
                  {/* <> */}
              <Route path="/register" element={<UserRegister />}/>
              <Route path="/instructor/login" element={<TeacherLogin/>}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/otp/verification" element={<OtpVerification />}/>

                  {/* </> */}
              {/* } */}

              <Route path="/edit/topic/:topic_title/:topic_id" element={<EditTopic />}/>
              <Route path="/loader" element={<Loader/>}/>
              <Route path="*" element={<NotFound/>}/>
              <Route path="/" element={<Home /> }/>
              <Route path="/contact" element={<Contact />}/>
              <Route path="/Courses" element={<Courses />}/>
              <Route path="/pricing" element={<Pricing />}/>
              <Route path="/blog" element={<Blog />}/>
              <Route path="/about/:course_title/:course_id" element={<CourseDetail />}/>
              <Route path="/popular-teachers" element={<PopularInstructors/>}/>
              <Route path='/category' element={< Category/>}/>
              <Route  path="/contact-us" element={<Contact/>}/>
              <Route path="/search/:searchstring" element={<Search/>}/>
              <Route path="/instructor/register" element={<InstructorRegister/>}/>
              <Route path={'/course-quiz/:course_id'} element={<CourseQuizList/>}/>
              <Route path={'/take-quiz/:quiz_id'} element={<TakeQuiz/>}/>
              <Route path="/all-courses" element={<AllCourses/>}/>
              <Route path="/all-chapters/:course_id" element={<AllChapters/>}/>
              <Route path="/popular-courses" element={<PopularCourses/>}/>
              <Route path="/category/:category_slug/:category_id" element={<CategoryCourses/>}/>
              <Route path="/study-materials/:course_id" element={<StudyMaterials/>}/>
              <Route path="/instructor/profile/:instructor_id" element={<TeacherDetail/>}/>
              <Route path="/logout" element={<StudentLogout />}/>
              <Route path="/about" element={<About />}/>
              <Route path="/quizes/:course_title/:course_id" element={<Quizes/>}/>
              <Route path="/quiz/:quiz_title/:quiz_id" element={<Quiz/>}/>
              <Route path="/:course_title/topics/:course_id" element={<Topics/>}/>
              <Route path="notes/:topic_title/:course_id/:topic_id/:note_id" element={<Notes />}/>
              <Route path="notes/:topic_title/:course_id/:topic_id" element={<Notes />}/>
              <Route path="add/note/topic/:topic_title/:topic_id" element={<AddNoteAndSummary />}/>
              {/* add/note/topic/Memory: How Do We Remember What We Know?/2 */}

              <Route path="all-topics/:course_title/:course_id" element={<AllCourseTopics />}/>
              <Route path="all/topic/notes/:topic_title/:topic_id" element={<AllTopicNotes />}/>
              <Route path=":quiz_title/all-questions/:quiz_id" element={<AllQuizQuestions />} />
          {/* Main Pages End */}
          <Route path='password-reset/:id/:token' element={<PasswordReset />} />
          <Route path='search-course/:course' element={<SearchCourse />} />
          <Route path='tags/:course_tag' element={<CourseTags />} />
          <Route path='add-note-sample' element={<AddNoteSample />} />
          <Route path='discussion/:course_title/:course_id' element={<Discussions />} />
          <Route path='discussion2/:course_title/:course_id' element={<Discussion />} />

          {/* ------------------------------ */}

          {/* Student Start*/}
          {/* {student &&  */}
           <>
            <Route path="/dashboard" element={<UserDashboard />}/>
            <Route path="/assignments/:student_id" element={<StudentAssignment/>}/>
            <Route path="/welcome/:student_id" element={<WelcomeStudent/>}/>
            <Route path="/my-courses" element={<UserCourses/>}/>
            <Route path="/favourite-courses" element={<FavouriteCourses/>}/>
            <Route path="/recommended-courses" element={<RecommendedCourses/>}/>
            <Route path="/change-password" element={<ChangePassword/>}/>
            <Route path="/profile-setting" element={<ProfileSetting/>}/>
            <Route path="/user/study-material/:course_id" element={<StudentStudyMaterials/>}/>
            <Route path='/verify-student/:student_id' element={<VerifyStudent/>}/>
            <Route path='/my-instructors' element={<MyInstructors/>}/>
            <Route path='/my-quiz' element={<StudentQuiz/>}/>
            <Route path='/result/:quiz_title/:quiz_id' element={<QuizResult/>}/>
           </>
          {/* } */}
          {/* Student End*/}
          {/* ------------------------------ */}

            {/* Course */}
           

              <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
          {/* Instructor Start */}
          {instructor && 
           <>
              <Route path="/add-course" element={<AddCourses/>}/>
              <Route path="/edit-course/:course_id" element={<EditCourse/>}/> 
              <Route path="/instructor/logout" element={<TeacherLogout/>}/>
              <Route path="/instructor/dashboard" element={<TeacherDashboard/>}/>
              <Route path="/instructor-courses/" element={<TeacherCourses/>}/>
              <Route path='verify-teacher/:teacher_id' element={<VerifyTeacher />}/>
              <Route path="/instructor/courses" element={<TeacherCourses/>}/>
              <Route path="/instructor/profile-settings" element={<InstructorProfileSettings/>}/>
              <Route path="/students" element={<Students/>}/>
              <Route path="/teacher-change-password" element={<InstructorChangePassword/>}/>
              <Route path="/enrolled-students/:course_id" element={<EnrolledStudents/>}/>
              <Route path="/add-assignment/:student_id/:teacher_id" element={<AddAssignment/>}/>
              <Route path="/all-assignments/:student_id/:teacher_id" element={<ShowAssignment/>}/>
              <Route path={'teacher-change-forgot-password/:teacher_id'} element={<TeacherChangeForgotPassword/>}/>
              <Route path="/add-quiz/:course_id" element={<AddQuiz/>}/>
              <Route path="/:quiz_name/edit/quiz/:quiz_id" element={<EditQuiz/>}/>
             
              <Route path={'/all-questions/:quiz_id'} element={<QuizQuestions/>} />
              <Route path={'/:quiz_title/add/quiz/questions/:quiz_id'} element={<AddQuizQuestion/>}/>
              <Route path={'/assign-quiz/:course_id'} element={<AssignQuiz/>}/>
              <Route path={'/attempted-students/:quiz_id'} element={<AttemptedStudents/>}/>
              <Route path="/add-topic/:course_name/:course_id" element={<AddTopic/>}/> 
              <Route path="/edit-chapter/:chapter_id" element={<EditChapters/>}/>
              <Route path="/add-study-material/:course_id" element={<AddStudyMaterial/>}/>
              <Route path="/instructor/quiz" element={<InstructorQuiz />}/>
              
              </>
          }
          <Route path="/edit/note/:note_title/:note_id" element={<EditNoteAndSummary />}/>
          {/* Instructor End */}
          {/* ---------------------------------------------- */}

            {/* Student Dashboard Quiz */}

            {/* Chapter */}
      
            {/* <Route path="/category/:course_id" element={<CategoryCourses/>}/> */}
            
            {/* <Route path="/edit-study/:study_id" element={<StudyMaterials/>}/> */}
          </Routes>
          <Footer/>
    {/* </Provider> */}
  </div>
  );
}
export default Main;