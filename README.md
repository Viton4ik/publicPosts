# PublicPostsApp

## _PublicPostsApp - messenger with using Django and React/Webpack_

##
✨Idea:✨
> Create a simple messenger
> 
> Backend with Django REST API
>
> Frontend with REACT/WEBPACK 
>

## BackEnd

- Database: usage with Django admin panel (The DB has only some examples to show how site works. Should be filled up by an owner) 
- DB contains: Posts, text for posts, likes
- Django REST API:posts (http://127.0.0.1:8000/api/posts/)
- Django REST API:likes (http://127.0.0.1:8000/api/like_post/)

## FrontEnd

- React/Webpack manually adjusted
- Webpack-dev-server

## Usage
#### _BackEnd_

- Create a new folder in VS Code/PyCharm/Atom and download the project

```sh
git clone https://github.com/Viton4ik/publicPosts.git

```
```sh
cd publicposts
```
- Create a virtual environment

```sh
python3 -m venv venv
```
- Activate the virtual environment

```sh
source venv/bin/activate
```
- Download libraries

```sh
cd publicPosts
pip3 install -r requirements.txt
```
- Run Django server

```sh
python3 manage.py runserver
```
#### _FrontEnd_

- Webpack/React preparation. 
- Open a new terminal

```sh
cd frontend
```
- Initialization 

```sh
npm init -y
```
- Components installation 

```sh
npm install webpack webpack-cli
npm install @babel/core babel-loader @babel/preset-react @babel/preset-env
npm install react react-dom
npm install style-loader css-loader
npm i html-webpack-plugin
npm install --save-dev webpack-dev-server
```
- Run Webpack

```sh
npm start
```

## Views

<img src="https://img.shields.io/static/v1?label=1&message=view&color=9cf"/>
<h3 align="center"><img src="https://github.com/Viton4ik/publicPosts/blob/master/pic.png"/></h3> 
