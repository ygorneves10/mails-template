# Welcome to Mail Templates Generator!

- Clone the repository
	- **git clone https://github.com/ygorneves10/mails-template.git**.
- Open the directory and install dependencies.
	- **cd mails-template**
	- **npm install**

## Structure and files

The statics files **header** and **footer** is on the folder **/default**.
To edit the middle of each template, you can create a file on folder **/mails** with the final name of your template, Ex.: "order-placed.html".

## Generating templates

After create the files on **/mails** and defines your static **header** and **footer**. You can run the build command to generate the finals templates to publish.

**npm run mail**

This command above will generate the finals **HTML File** of each templates in **/mails** directory. You can do CTRL + Click on Terminal listed to see the template. If it's all right, **CTRL + C** to stop the server and your **HTML Templates** will waiting to be publish published :wink:.
