try{
   let open = document.querySelector(".openNav");
   let close = document.querySelector(".closeNav");
   let sideNav = document.querySelector('.side_nav');
   let lessonSummary = document.querySelector('.lessonSummaryCont');
   console.log(sideNav)

   let topic = document.querySelectorAll('.topic');
   
   for(let i =0; i < topic.length; i++){
      topic[i].addEventListener('click', ()=>{ 
         lessonSummary.classList.toggle('openTopic');
         console.log("All")
      });
   }
   open.addEventListener('click', ()=>{
      sideNav.classList.toggle('hamburger');
      if(sideNav.classList.contains('hamburger')){
         open.src = close.src
      }else{
         open.src = '/img/open.png'
      }
   });
}catch(err){
   console.log(err)
}