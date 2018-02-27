// Run with command:
//   node prediction-algorithm-test.js

function testPredict() {
    var prediction_algorithm = require( './prediction-algorithm.js' );
    
    var prediction = prediction_algorithm.predict(4);
    
    if(prediction == 5) {
        console.log("Pass");
    } else {
        console.log("Fail");
    }
}

testPredict();
