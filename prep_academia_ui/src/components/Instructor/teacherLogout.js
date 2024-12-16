function TeacherLogout(){

    localStorage.removeItem('teacherLoginStatus');
    localStorage.removeItem('teacherId');
    window.location.href='/teacher-login';
    
}
export default TeacherLogout