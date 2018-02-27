# CCT-4053: Senior Seminar

## Introduction
We are Project Team #1, working on an application for Class Enrollment Prediction.

The completed application will allow Dr. Randrianasolo to:
- [ ] create courses
    - [ ] edit courses
    - [ ] delete courses
- [ ] assign pre-requisite relationships among courses (or otherwise indicate intended time courses are to be taken)
    - [ ] drag and drop UI
- [ ] predict number of students enrolled in certain classes in future
    - [ ] input initial enrollments in starting semester
    - [ ] press play button to predict next semester, and then the next
- [ ] save the results in some format

## Components

1. Dynamic/Functional UI compnents (drag and drop, text editing, linking, course creation, etc.)
2. Static UI components (appearance, graphics, colors, formatting)
3. Prediction algorithm
4. Loading/Storing/Importing/Exporting courses and their degree plan relationships

## Install and Run

```
npm install
npm start
```
## Build for Distribution

Get [Electron Packager](https://www.npmjs.com/package/electron-packager):
``` 
# for use from cli 
npm install electron-packager -g
```

Inside repository:
```
electron-packager .
```
