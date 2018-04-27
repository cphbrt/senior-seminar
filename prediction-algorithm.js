
module.exports = {
    predict : predict01
}

function predict01( course_ids, degree_plans, enrollments ) {
    // NOTE: Assumes that each degree plan has same amount of enrollment info
    var semesters_of_dp_enrollment_info = 0;
    if( enrollments.length > 0 ) {
        semesters_of_dp_enrollment_info = enrollments[0].enrollments_descending_semesters.length;
    }
    
    var course_sum_dicts = [];
    for(var i=0 ; i < semesters_of_dp_enrollment_info ; i++) {
        course_sum_dicts.push({});
        for( var j = 0 ; j < course_ids.length ; j++ ) {
            course_sum_dicts[i][course_ids[j]] = 0;
        }
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
                        course_sum_dicts[i][degree_plan.semesters[semester][jj]] += enrollments[j].enrollments_descending_semesters[ii];
                    }
                } else {
                    
                }
            }
        }
    }
    return course_sum_dicts;
}