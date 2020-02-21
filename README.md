Live demonstration: https://courses-website.herokuapp.com/
This website is a mix between an open online course platform and a course platform from a college's point of view.

<b> Admin account details - Username: 'Admin' Password: 'admin' </b>
<b> Account to test credit constraint when enrolling and university constraint(university of this account is VITC so try enrolling in Maths course MAT1002 which is for VITV only) <br>
  Username: 'restrict_test' Password: 'password' </b> <br>
Every exisiting account apart from Admin was made with a password of <b>'password'</b>. This is done for testing purposes and if you want to check out any existing user's account. <br>
You are still free to set any password you want during registration. 
<h1> This is a course registration website implemented with Express along with mongoDB Atlas and PUG as a template engine. </h1>

<h2> Implementation Details </h2>
  <ul>
    <li> <b> Promises and Async/Await: </b> <br>
        These have been used everytime we do something with the database like retrieving data to load content on a page.
    <li> <b> Middleware: </b> <br>
      Middleware has been implemented everywhere we want to do some sort of contraint check. <br>
      Some examples of the middleware implemented: <ul>
      <li> Login Checker - To check if user has logged in. Used when trying to view user pages without being logged in. Also used when trying to enroll.
        <li> University Constraint - Checks before enrollment if course is restricted or open and if restricted checks if user is allowed to enroll.
          <li> Credit Checker - Checks credit count before enrolling if enrolling in a university course with credits. Doesn't allow you to enroll if credit count exceeds 27.
      </ul>
    <li> <b>PUG Conditionals</b>: <br>
      PUG conditionals and loops have been used throughout the website to render data easily. Loops usually used to display data from database and conditionals to show or hide data based on type of user and if logged in or not.
    <li><b> MongoDB with Mongoose</b>: <br>
      Two models have been implemented - Course and User and they can be seen in the models folder.<br>
      Mongoose was used to interact with the database.
  <li> <b> Session</b>: <br>
      Sessions have been used throughout the website to store relevant information in session variables and these session variables are used in every middleware function that checks the status of something. <br>
      Each session expires after 30 minutes and session is destroyed on logout.
</ul>  
      

<h2> Key Features </h2>
<ul>
  <li> <b>User Registration and Login(User creation)</b>: <br>
        There are 3 types of users - general, instructor and admin of which the registration page lets us create a general account or an instructor account. Further these accounts can be affiliated with a university or be open("No University").
  <li><b> Course Creation:</b> <br>
        An admin exclusive feature which lets a course be created.
  <li> <b>Course Enrollment: </b><br>
    Users can enroll themselves in courses and dropout of them too. Both of these are done on the course page itself.
  <li><b> Open and University exclusive courses: </b><br>
        Courses can be open("No University") or belong to a university("VITC" or "VITV"). A university course can be open but if restricted only accounts affiliated with that university can enroll in the course.
  <li><b> Credit system for university accounts:</b>
        Following VIT's credit system, a college account can have at most 27 credits after which enrollment in a new course is not possible. A user can enroll in any number of open courses however.
  <li><b> Users Page:</b> <br>
        A page where we can view all the users on the website split into the categories of General and Instructor. From here we can go to their user pages.
  <li> <b> User Page:</b> <br>
        Users can update details such as their name and password by going to the user page. Users also get shown what courses they've enrolled in and can check details such as registered credits. If the account is an Instructor's then it also shows students under them in courses they teach.
  <li> <b>Courses Page:</b> <br>
        People can view the various courses available and also group based on which category they belong to.
  <li> <b>Course Page:</b> <br>
        A page that shows all the course details.
  <li> <b> View Count: </b> <br>
        Page view count is monitored for all course and user pages.
    
 <h2> Planned Features that were not completed on time: </h2>
 <ul>
  <li> <b> Course Rating System: </b> <br>
    A simple 5 scale rating system that takes the average of all ratings by users to show course rating. <br>
    <b> Reason for not completing: </b> <br>
        Feature was thought up later and a lot of changes had to be made such as how a user's registered courses were tracked and so there wasn't enough time to make the necessary changes before the deadline. 
  <li> <b> Sort users by popularity and courses by popularity or rating: </b> <br>
      Some backend work done to view users or courses based on popularity. This is what page views(no_views) was measured for. <br>
    <b> Reason for not completing: </b> Ran into issues using Mongoose to sort the results of a query. Rating system wasn't implemented as mentioned above.
   <li> <b> Time Table: </b> <br>
     This was a feature intended for accounts tied to a university and creates a timetable similar to VITs timetable. <br>
     <b>Reason for not completing:</b> The issue was that neither of the models kept track of slots of university courses(course model doesn't even have a slot attribute) because the initial intention was to make a more general website with 
coure registration rather than the hybrid general/university focused website created later.
     
<h2> Some screenshots: </h2>

 <h4> Course Creation </h4>
  
![course creation](https://raw.githubusercontent.com/vespersword/courses-website/master/screenshots/course_create.png)
  
 <h4> User details </h4> 
  
  ![User Details](https://raw.githubusercontent.com/vespersword/courses-website/master/screenshots/user_details.png)
  
 <h4> User Edit Details </h4> <br>
 
  ![edit](https://raw.githubusercontent.com/vespersword/courses-website/master/screenshots/edit.png)
  
  <h4> User Registered Courses </h4>
  
  ![my courses](https://raw.githubusercontent.com/vespersword/courses-website/master/screenshots/my_courses.png)
  
  <h4> Instructor's students </h4>
  
  ![registered users](https://raw.githubusercontent.com/vespersword/courses-website/master/screenshots/reg_users.png)
  
  <h4> Courses View Page </h4>
    
  ![Courses View](https://raw.githubusercontent.com/vespersword/courses-website/master/screenshots/courses.png)
  
  <h4> Restricted Course </h4>
  
  ![restrict test](https://raw.githubusercontent.com/vespersword/courses-website/master/screenshots/restrict_test.png)
  <h4> Credits Check
  
  ![credit test](https://raw.githubusercontent.com/vespersword/courses-website/master/screenshots/credit_test.png)
