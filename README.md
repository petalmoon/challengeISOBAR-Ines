# Readable API Server

This is the starter project for the final assessment project for Udacity's Redux course where you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

## Start Developing

To get started developing right away:

- Install and start the API server

  - `cd api-server`
  - `npm install`
  - `node server`

- In another terminal window, use Create React App to scaffold out the front-end

  - `create-react-app frontend`
  - `cd frontend`
  - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## Project specification

Information about the project specification [README file](specs/README.md).

## Front-End Implementation

This challenge was resolved as a single-page application, for purposes of demonstration. All projects specifications were implemented,
those being: create/edit/delete/vote posts and comments. 

UI:
- First of all, as there wasn't supposed to be any Register/Login mechanism, users should insert their username on top of the page. Just after insertion, the state is updated with the active user. There is no need to click on any button for that (with that said, if the page is reloaded, the username must be inserted again);
- Users can create new posts, providing a title, message and category for the post (can only be one of the three: React, Redux or Udacity);
- Users can only edit or delete posts of their own authority;
- The voting mechanism is very simple and has no checks for state (meaning, any user can click on the 'thumbs up' or 'thumbs down' icon as many times as they want), for purposes of demonstration only;
- The user avatar is the same for every user entered, for purposes of demonstration only.
- Every post displays its own category.
- The user can choose to only see posts of a certain category. When the user selects a category, only posts from that category will be displayed below. If 'none' is selected, all posts from all categories will be displayed (this is why I ended up not creating tabs for each category). 

Code Specs:
- Inside the web/src/components directory, there is a .js file whose purpose is simply to store the active user (as a way to create an easy global state).


