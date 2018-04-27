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

## Copying Data.json (for Mac)

If you want the mock data in the `data.json` file to show up when you run the app, copy the contents of the repository's `data.json` file into:
`/Users/<your-username>/Library/Application Support/ClassSizePredictor/data.json`

Next time you open ClassSizePredictor, it will have all the data preloaded.

## API for Prediction Algorithm


The prediction algorithm takes 3 parameters: `course_ids`, `degree_plans`, and `enrollments`.

### `course_ids`

```js
var course_ids = [1, 2, 3];
```

`course_ids` contains a list of all the course ids (or whatever unique identifiers they have; I can make this handle strings if that helps).

### `degree_plans`

```js
var degree_plans: [];
```

`degree_plans` is an array of `degree_object`s that look like this:

```js
var degree_object = {
    degree_plan_id : 1, // unique identifier for this degree_plan
    semesters : [
        [1, 2], // list of course ids students enrolled in this degree plan will take their 1st semester
        [3], // list of course ids students enrolled in this degree plan will take their 2nd semester
        [4, 7], // list of course ids students enrolled in this degree plan will take their 3rd semester
        [6, 8, 10], // list of course ids students enrolled in this degree plan will take their 4th semester
        [11, 9], // list of course ids students enrolled in this degree plan will take their 5th semester
        [12], // list of course ids students enrolled in this degree plan will take their 6th semester
        [13, 14, 15, 16], // list of course ids students enrolled in this degree plan will take their 7th semester
        [17, 19, 18] // list of course ids students enrolled in this degree plan will take their 8th semester
    ]
};
```

### `enrollments`

```js
var enrollments = [];
```

`enrollments` is an array of `enroll_object`s that look like this:

```js
var enroll_object = {
    degree_plan_id : 1, // unique identifier for this degree plan, corresponds to same from degree_object above
    enrollments_descending_semesters : [
        12, // number of students currently enrolled in final semester
        10, // number of studnets currently enrolled in second to last semester
        11, // number of studnets currently enrolled in third to last semester
        15, // number of studnets currently enrolled in fourth to last semester
        18, // ...
        22, // number of students who will begin next semester
        25, // number of students who will begin the semester after that
        26, // number of students who will begin the semester after that
        30 // ...
    ]
};
```

