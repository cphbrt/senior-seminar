require('./renderer.js');
var storage = require("./storage");

semesters = {};

course_list = null;
$(document).ready(function() {
  for(var i = 1; i < 10; i++)
  {
    semesters["semester-" + i] = [];

  }

  storage.readData("data.json", function(obj){
    course_list = obj.class_list;

    semester_select = $("#semester_select");
    semester_select.change(function() {
      semester = $("option:selected" ,this).val();
      course_select = $("#course_select");
      course_select.empty();

      //TODO: make this eliminate classes that the prereqs for aren't present in a previous semester
      for(key in course_list) {
        c = course_list[key];
        found = false;
        for(semester_key in semesters)
        {
          semester_obj = semesters[semester_key];
          for(ident_key in semester_obj)
          {
            ident = semester_obj[ident_key];
            if(ident.toLowerCase() == c.ident.toLowerCase())
            {
              found = true;
              break;

            }

          }
        }

        if(!found)
        {
          item = $("<option/>", { value: c.ident,
            html: c.name + " - " + c.ident });
          course_select.append(item);
        }

      }
    });
    semester_select.change();

    add_course = $("#add_course");
    add_course.click(function() {
      semester_select = $("#semester_select");
      semester = $("option:selected", semester_select).val();
      course_select = $("#course_select");
      ident = $("option:selected", course_select).val();
      name = $("option:selected", course_select).html();
      if(ident)
      {
        semester_ul_id = "#" + semester;
        semester_ul = $(semester_ul_id);
        item = $('<li>' + name + " - " + ident + '</li>');
        item.data("ident", ident);
        item.data("semester", semester);
        item.click(function() {
          ident = $(this).data("ident");
          semester = $(this).data("semester");
          removeIdent(semester, ident);
          $(this).remove();
        });
        semester_ul.append(item);
        semesters[semester].push(ident);
        semester_select.change();
      }
    });
  });

  $("#save").click(function(){
    name = $("#name").val();

    if(name != "") // validate
    {
      storage.readData("data.json", function(obj){
        storage.updatePlan(obj, name, name, semesters);
        storage.saveData("data.json", obj, function(){
          window.location.href = 'degree-plans.html';
        });
      });

    }
  });

});

function removeIdent(semester, ident)
{
  semester_obj = semesters[semester];
  for(var i = 0; i < semester_obj.length; i++)
  {
    s = semester_obj[i];
    if(s.toLowerCase() == ident.toLowerCase())
    {
      semester_obj.splice(i, 1);
      semester_select = $("#semester_select");
      semester_select.change();
      break;

    }

  }

}
