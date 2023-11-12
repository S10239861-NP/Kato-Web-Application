# Kato Web Application
The official GitHub repository for the Kato web application.

Instructions to run this project (for development and/or testing):
- Open the Command Prompt and ensure that your working directory is the directory named "Kato-Web-Application".
- Type in the following command to start the server: ```run```
- Alternatively, you can run the following command to start the server instead: ```node server/server.js```
- Once the server has been started, open the browser of your choice and type in the following address into the address bar: ```localhost:3000```

Pre-requisites:
- You must have the "node" program installed on your system.

Additional notes:
- By default, the server listens on port 3000, if the situation necessitates it, you can change the port that the server is listening on by editing the constant called "serverPort" in the "server.js" file, which is located in the "server" folder. To prevent port mismatches and confusion that could potentially arise from commits changing the value of the "serverPort" constant without prior notice, it is advised that you change the value of the "serverPort" constant back to 3000 before committing any changes made to the "server.js" file unless otherwise explicitly stated.
