require('./renderer.js');

elec = require("electron");

var search = require("./search");

var storage = require("./storage");
var prereqArray = [];
datapath = null;
$( document ).ready(function() {
  selected = elec.remote.getGlobal("params").name;

  prereqs = $("#prereqs");
  unselected = $("#unselected");

  storage.readSettings(function(obj) {
    datapath = storage.getPath(obj.current);


  storage.readData(datapath, function(obj){
    course = null;
    prereq_list = null;
    if(selected) {
      course = storage.getClass(obj, selected);
      prereq_list = course.prereq;
      $("#name").val(course.name);
      $("#ident").val(course.ident);

    }

    class_list = obj.class_list;
    for(key in class_list)
    {
      c = class_list[key];

      if(c.ident == selected) {
        continue;
      }

      item = $('<li><strong>' + c.name + '</strong>  ' + c.ident + '</li>');
      item.data("ident", c.ident);
      item.data("name", c.name);

      item.click(function() {
        item = $(this);
        current_list = item.closest("ul");
        id = current_list.prop("id");

        item.detach();

        if(id == "prereqs") {
          unselected.append(item);
        } else {
          prereqs.append(item);
        }
      });

      if(course) {
        found = false;
        for(key in prereq_list) {
          ident = prereq_list[key];
          if(ident == c.ident) {
            found = true;
            break;
          }
        }

        if(found) {
          prereqs.append(item);
        } else {
          unselected.append(item);
        }

      } else {
        unselected.append(item);
      }

    }

  });   });

  searchBox = $("#search");
  search.register(searchBox, unselected, ["ident", "name"], true);

  $("#save").click(function(){
    name = $("#name").val();
    ident = $("#ident").val();

    if(name != "" && ident != "") // validate
    {
      storage.readData(datapath, function(obj){

        prereqArray = getPrereqArray();

        storage.updateClass(obj, name, name, ident, prereqArray);
        storage.saveData(datapath, obj, function(){
          window.location.href = 'courses.html';
        });
      });

    }
  });

  if(selected) {
    $("#delete").click(function() {
      storage.readData(datapath, function(obj){
        storage.removeClass(obj, selected);
        storage.saveData(datapath, obj, function(){
          window.location.href = 'courses.html';
        });
      });
    });
  } else {
    $("#delete").hide();
  }

});


function getPrereqArray() {
  arr = [];
  prereqs = $("#prereqs");
  prereqs.children("li").each(function() {
    ident = $(this).data("ident");
    arr.push(ident);
  });
  console.log(arr);
  return arr;
}
