require('./renderer.js');

elec = require("electron");
const {dialog} = require('electron').remote;

var search = require("./search");

var storage = require("./storage");

settings_obj = null;

var p = require('path');


function updateOptions(obj) {
  selector = $("#select_workspace");
  selector.empty();
  for(key in settings_obj.workspaces) {
    path = settings_obj.workspaces[key];
    console.log(path);
    op = $('<option value="' + path + '">' + path + '</option>');
    op.data("path", path);

    selector.append(op);
  }

  selector.change(function() {
    op = $("option:selected", this).val();
    settings_obj.current = op;
    storage.updateSettings(settings_obj);

  });
}

$( document ).ready(function() {
  storage.readSettings(function(obj) {
    settings_obj = obj;
    console.log(settings_obj);
    $("#workspacename").text(settings_obj.current);
    updateOptions(obj);


  });

  $("#import").click(function(){
    files = dialog.showOpenDialog(
      {
        properties: ['openFile'],
        filters: [
          {
            name: 'JSON',
            extensions: ['json']
          }
        ]
      });

      for(key in files) {
        path = files[key];
        settings_obj.workspaces.push(path);
          storage.readData(path, function(obj) {
            storage.saveData(storage.getPath(p.parse(path).base), obj);
          });
      }
      storage.updateSettings(settings_obj);
      updateOptions(settings_obj);

  });


});
