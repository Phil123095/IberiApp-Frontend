# Iberiapp-Frontend

[Website Here](https://master.d3une9mtfnw6tc.amplifyapp.com/) - Please either register using your .ie.edu email, or log in using the test credentials: 
**test[at]final.com, password: final**

## General Flow:
  - App.js just holds the skeleton. Routes.js does the heavy lifting (or should I say, routing).
  - Authentication: The backend returns a JWT-Token that enables the frontend to keep a user logged in (and of course to authenticate). Routes are protected based on this.
  - Styling: Done mainly via the wonderful TailwindCSS framework, though there are still some Zombie styles out there (Note the inelegant rectangular, black-bordered inputs for Registration & LogIn).

## Main Modules (see /containers):
### Dashboard, organised as:
  - Dashboard.js + FilterBar.js <- Main two components (MASSIVE thanks for helping me solve that filtering bug!!)
  - Dashboard Sections -> Subsections containing different graph wrapping components.
  - Dashboard Elements -> Graph "Wrapping" components: Essentially prep the data to labels + data series before passing it on to the Graphs.
  - Dashboard Graphs -> Pretty self-explanatory :). I use Chart.js
  - Footer_Header (I think that's pretty clear)

### Frontpages:
  - All other types of pages: Landing Page, Login Page, Register Page, and File Upload Page (uploads files to an S3 bucket)

### Utils:
  - Some general miscellanea: a form handler here, an authentication input verifier there. Also has the token manager (for authentication), and a general_utils. 

P.S. Sorry for not writing a more extensive documentation, and for the 0 comments in the code. If you have any questions, feel free to reach out. 
