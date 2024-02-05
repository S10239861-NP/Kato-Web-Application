# Draft
## Observations
For the password input box on the login page, only on a Microsoft Edge browser, a "Show Password" button is automatically added to the side of the login input box.

## Authentication
We will be using JSON Web Tokens (JWTs) for authentication.

We will be using cookies to allow the browser (client) to automatically send the token (that the client receives only after a
successful login) along with every request (regardless of whether it is a "GET" request, "POST" request or another type of request).

Making use of cookies will also allow us to enforce that certain webpages can only be accessed by clients that have logged in
successfully to an account (as cookies are automatically sent with every "GET" request).

There are 3 ways we can send a token with a "GET" request to the server:
- As a URL query parameter.
- As a cookie.
- Using XMLHttpRequest and including the token in its body or as a separate header.

Disadvantages of sending a token as a URL query parameter:
- The token will be visible in the user's browser history (which they might not clear) and in server logs, if the token has not expired
yet, this could allow a threat actor with access to the user's browser history or the server logs to impersonate the actual user.

Disadvantages of sending a token in the body or as a separate header in an XMLHttpRequest:
- This method cannot be used for ensuring that the browser sends the token with each "GET" request made to the server for a resource
(e.g. a HTML, CSS, JS, or image file etc).

Additional notes regarding cookies:
- By default, cookies are cleared once the user closes their browser.
- A cookie can be deleted by setting its expiry date to a past date.
- Cookies can be set on the browser by a response from the server by setting the value of the "Set-Cookie" header (for the response).

## Database schema and data
Employee table:
- StaffID (Text)
- Password
- FirstName
- LastName
- DepartmentName
- JobPositionName
- DateJoined
- TeamID

Notes:
- If DateJoined is set to a past date or the current date, the employee is considered as not being onboarded. If DateJoined is set to a future date, the employee is considered as currently being onboarded.
- The format for DateJoined is: YYYY-MM-DD.

Training table:
- ID (Number, auto increment)
- CourseName
- CategoryName
- Duration
- Description

Notes:
- The format for Duration is: m.
- m refers to minutes in this case.

### Testing data
#### Onboarding employees
S001, abc, Josh, Lee, Product & Engineering, Backend Developer, 22/11/2023, 1

S002, def, Jane, Tan, Business Technology, Salesforce Administrator, 22/11/2023, 2

#### Current employees
S003, abcd, Ava, Sophia, Product & Engineering, Frontend Developer, 10/04/2021, 1

S004, abcd, Lily, Rose, Product & Engineering, Frontend Developer, 10/04/2021, 1

S005, abcd, Oliver, Alexander, Product & Engineering, Database Architect, 10/04/2021, 1

S006, abcd, Theodore, Liam, Product & Engineering, UX/UI Designer, 10/04/2021, 1

S007, abcd, Ethan, James, Product & Engineering, Frontend Developer, 10/04/2021, 2

S008, abcd, Lucas, Noah, Product & Engineering, Backend Developer, 10/04/2021, 2

S009, abcd, Chloe, Olivia, Product & Engineering, UX/UI Designer, 10/04/2021, 2

S010, abcd, Isabella, Grace, Product & Engineering, UX/UI Designer, 10/04/2021, 2

#### Trainings
Our Policies and Procedures, Company Policies and Procedures, 40 minutes

Our Platform’s Features, Product and Service Knowledge, 40 minutes

Managing Stress on the Job, Stress Management and Wellness, 30 minutes

Our Performance Management Processes, Feedback and Performance Management, 60 minutes

## WidgetBot
It is a platform that might allow us to embed a Discord chatbot into the Kato web application, it allows the user to view and chat with a Discord chatbot in a server.

Pre-requisites (to be able to chat with the Discord chatbot):
- The user must authorize the application (using Discord OAuth) to grant it access to their Discord account.

When authorizing the application, a new browser window is opened where the authorization is performed, however, it seems that the browser gets stuck on a white screen after authorization has been granted (after authorization is granted, I am redirected to another page which is completely white and blank), the following error was also logged to the Developer Console at this time:
```
Uncaught TypeError: null has no properties
    <anonymous> https://s-e.widgetbot.io/api/auth/discord/cb?code=J7wfx4BoQAaynmP0jjXa80vD4qZPQB line 1 > injectedScript:1
    activateScript https://s-e.widgetbot.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js:1
    n https://s-e.widgetbot.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js:1
    run https://s-e.widgetbot.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js:1
    x https://s-e.widgetbot.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js:1
    runOnLoad https://s-e.widgetbot.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js:1
cb:1:3
    <anonymous> https://s-e.widgetbot.io/api/auth/discord/cb?code=J7wfx4BoQAaynmP0jjXa80vD4qZPQB line 1 > injectedScript:1
    activateScript https://s-e.widgetbot.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js:1
    n https://s-e.widgetbot.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js:1
    run https://s-e.widgetbot.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js:1
    x https://s-e.widgetbot.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js:1
    runOnLoad https://s-e.widgetbot.io/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js:1
```

This happened when I was attempting to chat through the embedded widget on the landing page of WidgetBot's official website.

## Development issues
Duplication of code throughout certain parts of the codebase (which violates the DRY (Do not Repeat Yourself) principle) has resulted in the occurrence of unexpected bugs in the Kato web application.

The absence of a bundler (such as Webpack or Vite) has led to issues such as global namespace pollution, an increased chance of syntax errors due to lack of type hinting, and having to be particular about the order in which scripts are included into a HTML file (or else unanticipated bugs or other issues may arise).

### Proposal to address these development issues
These issues can be fixed by taking the following measures:
- Follow the DRY (Do not Repeat Yourself) principle, this means that one should avoid or at least minimize code duplication, as a result, this means that there should be no copying and pasting of identical pieces of code in different files unless there is absolutely no choice whatsoever.
- Use a bundler such as Vite.

Making use of a framework such as React can help minimize code duplication, however, 1 disadvantage of this measure is that there is a learning curve when it comes to learning how to use React which might reduce development efficiency especially in projects with a shorter timeline.

Advantages of using React:
- Minimizes/eliminates code duplication.
- Using React components, UI elements can be easily reused in different pages of a website, in different parts of a page, and even in other projects.
- Using React components, new UI elements can be created and extended easily.

Disadvantages of using React:
- The learning curve for React can be smooth or steep, this depends on the developer.
- Build tools (mainly a bundler) will have to be set up first.

An alternative to using React would be to instead use the native browser's custom HTML elements API. There are certain limitations to using this API (such as the fact that custom elements can sometimes take a while to render, resulting in issues like blatantly visible flickering).

## List of issues found in latest analysis of codebase (Outdated)
- HTML code for the sidebar is duplicated (there are separate copies of this code for each page), convert the sidebar into a component instead so that it can be used in different pages easily. This way, changes made to the sidebar will also be automatically applied to all the pages with the sidebar.
- Sidebar and main container rely on hardcoded values to render at the correct positions, refactor HTML code for the sidebar and main container to allow them to still be rendered at their intended positions while allowing for dynamic positioning.

## Revised database schema
### Tables
- OnboardingEmployees
- Employees
- Teams
- TrainingModules
- TrainingModuleLessons
- OnboardingTasks

### Columns for OnboardingEmployees table
- StaffID
- Password
- FirstName
- LastName
- JobPositionName
- DateJoined
- TeamID

### Columns for Employees table
- FirstName
- LastName
- JobPositionName
- TeamID

### Columns for Teams table
- ID

### Columns for TrainingModules table
- Name
- Description

### Columns for TrainingModuleLessons table
- Name
- TrainingModuleName
- Description
- EstimatedNumMinutesToComplete

### Columns for OnboardingTasks table
- Name
- AssigneeStaffID
- Description

## Mock data that we will be using
### Included training module names
- Products and Services Training
- Policies and Procedures Training
- Data Security and Privacy Training
- Communication and Collaboration Training

## Observations made while attempting to fix sidebar not fitting the entire screen's height (on PC and on mobile) when the content of the body overflows vertically
Setting the "overflow" or "overflow-y" property of the neighbouring element (the one that is overflowing) of the sidebar element to a value such as "auto" or "scroll" fixes the issue with sidebar's height being lesser than the viewport's height (both on PC and mobile) when the content of a neighbouring element of the sidebar element overflows vertically.


