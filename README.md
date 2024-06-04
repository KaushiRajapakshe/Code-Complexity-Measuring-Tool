# Project Title - Code Complexity Measuring Tool
SIT725 - Applied Software Engineering

This readme provides an overview of the project functionalities and instructions on how to run it.

# Group Members Names
Hasindu Deshitha Welarathne - s224009927
Isuri Kaushalya Rajapaksha Dona - 223681886
Shreya Bista - 224114235
Tharidhi Vihansa Perera Parana Hewage - s224193867
Dilushika Savindi Gamachchi Pathiranage - 224255793

Our project aims to develop a Code Complexity Measuring Tool that assists software developers in evaluating the complexity of their codebases. By analysing various metrics such as code size, type, the nesting level of control structures, inheritance, and recursion, the tool provides detailed measurements using charts and tables, and assigns a grade. Using this tool allows developers to refactor, optimise, download their code, and identify basic code errors.Code Complexity Measuring Tool.

### User Management

•	Sign Up: Allows users to create an account.

•	Sign In: Enables users to log in to their accounts.

•	View Profile: Displays user profile information.

•	Update Profile: Allows users to modify their profile details.

•	Delete Profile: Allows users to deactivate their accounts.


### Code Management

•	Upload Code: Enables users to upload code files.

•	Format Code: Formats code files.

•	Download Format Code: Allows users to download formatted code files.

•	Delete Code: Enables users to delete uploaded code files.

•	View Formatted Code: Displays formatted code files.

•	Formatted Code Logic: Provides logic for formatting code.

•	Formatted Code History: Maintains a history of formatted code files.


### Code Complexity Management

•	Insert Data with Code Complexity: Inserts code complexity data into the database.

•	View Code Complexity: Displays code complexity in a table view.

•	Keep Downloadable Code History: Maintains a history of downloadable code files.

•	Update Complexity Measure: Allows updating the measured complexity of code.

•	Delete Complexity Measure: Enables deletion of code complexity measures.

•	Show Code Complexity via Graph: Visualizes code complexity through graphs.

•	Keep Code Complexity History: Maintains a history of code complexity measurements.


### Code Complexity Visualization

•	Visualization of Code Complexity: Provides visualizations of code complexity.

•	Keep Code Complexity History: Maintains a history of code complexity visualizations.

•	Update Code Complexity History Item: Allows updating code complexity history items.

•	Delete Code Complexity History Item: Enables deletion of code complexity history items.


### Admin Functions - Hasindu

•	Assign Grade: Assigns grades to users based on code quality.

•	Suggest Code Quality Rules: Provides suggestions for code quality rules.

•	Admin View: Allows administrators to view, create, and delete code complexity rules.

•	Update Rules: Enables updating of code quality rules.


## How to Run

Follow these steps to run the project:
1.	Download the Project: Clone or download the project from the repository.

2.	Install Dependencies:

      o	Run npm install command to install frontend dependencies. o	Run npm run build command to build the frontend.
      o	Copy all files from ui -> build to ui -> public.
3.	Backend Setup:

      o	Open terminal in the CodeQuality folder.

      o	Run mvn clean install command to install backend dependencies.
      o	Open terminal in the CodeQuality -> target folder.

      o	Run java -jar CodeQuality-1.0-SNAPSHOT.jar command to start the backend server.

### Technologies Used

      •	UI:
        o	Javascript

      •	Backend:
        o	Express JS

      •	Database:
        o	MongoDB
