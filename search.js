// this module requires jquery to be working

module.exports = {

  /*
  field: jquery object (text field)
    the text field to get the filter text from
  list: jquery object (ul)
    the ul to search through and hide elements in
  datas: array of strings
    the data fields of ul elements to check the filter tet against
  tolower: boolean
    wether or not the filter/data should ignore case
  */
  register: function(field, list, data, tolower)
  {
    field.on("input", function() {
      text = $(this).val();

      if(tolower) {
        text = text.toLowerCase();
      }

      list.children("li").each(function() {
        found = false;
        for(key in data) {
          name = data[key];
          value = $(this).data(name);

          if(tolower) {
              value = value.toLowerCase();
          }

          if(value.includes(text)) {
            found = true;
            break;
          }
        }

        if(found) {
          $(this).show();
        } else {
          $(this).hide();
        }

      });

    });

  },

  registerTable: function(field, table, data, tolower)
  {
    field.on("input", function() {
      text = $(this).val();

      if(tolower) {
        text = text.toLowerCase();
      }

      table.children("tr").each(function() {
        found = false;
        for(key in data) {
          name = data[key];
          value = $(this).data(name);

          if(!value) {
            found = true;
            continue;
          }

          if(tolower) {
              value = value.toLowerCase();
          }

          if(value.includes(text)) {
            found = true;
            break;
          }
        }

        if(found) {
          $(this).show();
        } else {
          $(this).hide();
        }

      });

    });

  }

};
