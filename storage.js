var fs = require('fs');

module.exports = {

readData: function(path, callback)
{
  fs.readFile(path, 'utf8', function(error, data) {
    if(error)
    {
      console.log(error);
    }
    else
    {
      obj = JSON.parse(data);
      callback(obj);

    }

  });
},

saveData: function(path, obj, callback)
{
  data = JSON.stringify(obj);
  console.log(data);
  fs.writeFile(path, data, 'utf8', function(error) {
    if(error)
    {
      console.log(error);
    }

    if(callback)
    {
      callback();

    }
  });
},

get: function(obj, ident)
{
  class_list = obj.class_list;
  for(key in class_list)
  {
    c = class_list[key];
    if(c.ident.toLowerCase() == ident.toLowerCase())
    {
      return c;
    }

  }

  return null;

},

exists: function(obj, ident)
{
  return get(obj, ident) != null;

},

//insert or overwrite. set oldident to ident if creating new
update: function(obj, oldident, name, ident, prereq)
{
  class_list = obj.class_list;
  for(key in class_list)
  {
    c = class_list[key];
    if(c.ident.toLowerCase() == oldident.toLowerCase())
    {
      c.ident = ident;
      c.name = name;
      c.prereq = prereq;
      return;

    }

  }

  obj.class_list.push({"name": name, "ident": ident, "prereq": prereq});

},

remove: function(obj, ident)
{
  class_list = obj.class_list;
  nclass_list = [];
  for(key in class_list)
  {
    c = class_list[key];
    if(c.ident.toLowerCase() != ident.toLowerCase())
    {
      nclass_list.push(c);
    }

  }

  obj.class_list = nclass_list;

}

};
