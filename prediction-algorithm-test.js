// Run with command:
//   node prediction-algorithm-test.js

var fs = require('fs');
var input = JSON.parse(
    fs.readFileSync('prediction-algorithm-test-v01.json', 'utf8')
);

var prediction_algorithm = require( './prediction-algorithm.js' );
var predict = prediction_algorithm.predict;

function testPredict( input ) {
    var course_ids = input.course_ids;
    var degree_plans = input.degree_plans;
    var enrollments = input.enrollments;
    
    var result = predict( course_ids, degree_plans, enrollments );
    console.log(result);
}
testPredict(input);
