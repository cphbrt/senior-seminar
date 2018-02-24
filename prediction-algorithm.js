
module.exports = {
    predict : predict02
}

function predict02( course_ids, degree_plans, enrollments ) {
    console.log(course_ids);
    console.log(degree_plans);
    console.log(enrollments);
    console.log("##########################################################\n");
    
    var course_sum_dict = {};
    for( var i = 0 ; i < course_ids.length ; i++ ) {
        course_sum_dict[course_ids[i]] = 0;
    }
    
    // NOTE: Assumes that each degree plan has same amount of enrollment info
    var semesters_of_dp_enrollment_info = 0;
    if( enrollments.length > 0 ) {
        semesters_of_dp_enrollment_info = enrollments[0].enrollments_descending_semesters.length;
    }
    
    for(var i=0; i<semesters_of_dp_enrollment_info; i++) {
        for(var ii=i; ii<semesters_of_dp_enrollment_info; ii++) {
            var i_diff = ii - i;
            for(var j=0;j<enrollments.length;j++) {
                var degree_plan_id = enrollments[j].degree_plan_id;
                
                var degree_plan;
                for(var jj=0;jj<degree_plans.length;jj++) {
                    if(degree_plans[jj].degree_plan_id === degree_plan_id) {
                        degree_plan = degree_plans[jj];
                        break;
                    }
                }
                if(i_diff < degree_plan.semesters.length) {
                    var semester = degree_plan.semesters.length - 1 - i_diff;
                    
                    for(var jj=0;jj<degree_plan.semesters[semester].length;jj++) {
                        course_sum_dict[degree_plan.semesters[semester][jj]] += enrollments[j].enrollments_descending_semesters[ii];
                    }
                } else {
                    
                }
            }
        }
        // print course_sum_dict data
        console.log("\nITERATION " + i + "\n");
        for(var id in course_sum_dict) {
            console.log("id: "+id + ", sum: "+course_sum_dict[id]);
        }
        
        // clear course_sum_dict
        for(var id in course_sum_dict) {
            course_sum_dict[id] = 0;
        }
    }
    
    return "yolo";
}