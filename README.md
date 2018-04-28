# CCT-4053: Senior Seminar

## Install and Run

```
npm install
npm start
```

## Build for Distribution

In order to get a distributable `.app` or `.exe` file, perform the following steps on a machine with your target OS.

Get [Electron Packager](https://www.npmjs.com/package/electron-packager):
``` 
# for use from cli 
npm install electron-packager -g
```

Inside ClassSizePredictor repository:
```
electron-packager .
```

## Copying Data Across Installations

### For Mac

Copy the data from `/Users/<your-username>/Library/Application Support/ClassSizePredictor/data.json` to the corresponding file for the other user's installation.

### For Windows

Copy the data from `%APPDATA%/ClassSizePredictor/data.json` to the corresponding file for the other's installation.

### For Linux

Copy the data from `~/.config/ClassSizePredictor/data.json` to the corresponding file for the other user's installation.

Next time you start the application, the data will be preloaded.

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

