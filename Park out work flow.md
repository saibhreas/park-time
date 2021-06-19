# Park out work flow

## **Once logged in as member, validation should be checked between pages using email
  inside program throw error and send back to index  Bcrypt

## Welcome page

  * ./public/index.html
    1 No api routes needed.
    2 html return route only (home button works on all pages)

### New member Sign up
  * ./public/signUp.html
    1 Routes
      API route to Database
        Get form class= "sign-up"{
          id="name-input" = User Name
          id ="email-input" = Email
          id = "password"   = password
            function newMemberCheck (email){
              if emailValid =>{
                if email !in DB then proceed
              }
              else {promt user"A member already exists with that password"
              console.log ("already member");
              }
            }
        }
            function addMember(new user){
              post user to database
              return user to member login page
            }

### Member Login
  * ./public/memberLogin.html
    1 Routes
      API route to Database //should return member id or error
        Get form class= "login"{
          id ="email-input" = Email
          id = "password"   = password
            function checkMembership (email){
              if emailValid =>{
                if email !in DB {
                  console.log ("Email checked, not in DB");
                  for (let i= 3, i>0, i--){
                    prompt user "please enter vaild email and password"
                  }
                  Send user to ./public/index
                } 
                route to ./public/memberChoice.html
                console.log ("member " + user-id)
                return user-id
              }

### Member Choice
  * ./public/memberChoice.html
    1 Routes//no real routes, button take you to the choices but primary key needs to be passed to next page
      - button selection dictates route
          1  ./public/where2Go
              initiates park search
              //see orginal logic.js // Fetching Data from NPS API
      
          2  ./public/planner.html 
              uses email to link to database

          3   ./public/planner

### Where 2 Go /Search for park
  * ./public/where2Go.html
    1. Route 
        ###follow routes from  refactored/updated logic.js
        ### **must keep passing is valid member

    2. Route to html for member area   



### Trip Log
  * ./public/planner.html
    1 Routes/  Multiple
      1 API get (primary key)  from id ="req-by-park"
        where saved parks
        join with <div id = "canned-data"
        join with 
        <section id ="new-note-comments"></section>
                          <textarea>
                            Placeholder for new commments
                          </textarea>

      1 API get (primary key) from id 
      id="search-by-date"
        where  ? saved notes