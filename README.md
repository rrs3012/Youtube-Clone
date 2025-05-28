# ** My Tube (A YouTube Clone) **

This is my Capstone project given by Internshala Trainings. It is a youtube clone built on MERN technology.


---

## Fixed incorrect submission

MongoDB Atlas is now accessible from all IPs for evaluation.
I will end the public access after the evaluation.



---




## Demo Video Usage

Click this [DEMO VIDEO](https://drive.google.com/file/d/1r1sAdCXwBxvsWMwEwkqFUcew3rSyqu6J/view?usp=sharing) to watch DEMO.


---




## Tech Stack
- **Frontend:** React, React Router, Redux, Axios
- **Backend:** Node.js, Express, MongoDB
- **Database:** MongoDB, MongoDB Atlas
- **Authentication:** JWT
- **Version Control:** Git & GitHub


---

## Features of Frontend 

# Home page with:
  - YouTube-style header
  - Toggleable sidebar
  - Category filter buttons
  - Responsive video grid
# Authentication:
  - Sign up and login using JWT
  - Dynamic header based on auth state
# Search & Filter:
  - Search videos by title
  - Filter videos by category
# Video Player Page:
  - In-browser video player
  - Likes/dislikes
  - Comment section (add/delete)
# Channel Page:
  - Create channel
  - Upload, edit, and delete videos
  - Display channel banner and video list
  - Fully responsive for mobile, tablet, and desktop devices


---

  ## Features of Backend

  # User registration and login with JWT
  # CRUD operations for:
  - Users
  - Channels
  - Videos
  - Comments
# MongoDB collections for:
  - Users
  - Channels
  - Videos
  - Comments
# JWT-based protected routes


---




## Usage

Once you run the app, here is how you can use it:

### 1. User Authentication
- Click the "Sign In" button in the header.
- Fill out the form to register or login.
- After login, your name will appear in the header, and you'll have access to more features.

### 2. Browse Home Page
- View a grid of video thumbnails.
- Use the filter buttons at the top to browse by category.
- Use the search bar to find videos by title.

### 3. Watch Videos
- Click on a video card to open the video player page.
- View title, description, and uploader info.
- Like or dislike the video.
- Add or delete your comments under the video.

### 4. Channel Management
- After signing in, open sidebar and click on "Your Channel" tab.
- Create your own channel by entering channel details.
- Upload new videos to your channel.
- Edit or delete your videos anytime.
- View all videos uploaded under your channel page.

### 5. Search & Filter
- Use the search bar to find videos by title.
- Click on filter buttons to show videos based on category.

### 6. Responsive Layout
- Fully usable on mobile, tablet, and desktop.


---




## Installation

Follow the steps to set up the project om your machine:

### Clone the Repository

```bash
git clone https://github.com/WasiuzzamanAnsari/YouTube-Clone.git
cd Youtube-Clone
cd server
npm i



### Setup Enviroment Variables (create .env file in root of server folder)

PORT=7272
MONGO=your-mongodb-uri
JWT=your-secret-key

## Start server
npm start


### Now for the frontend
cd ../frontend
npm i
npm run dev

### Enviroment variable for frontend
VITE_API_URL=http://localhost:7272/api


---