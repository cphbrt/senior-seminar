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

getClass: function(obj, ident)
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

classExists: function(obj, ident)
{
  return getClass(obj, ident) != null;

},

//insert or overwrite. set oldident to ident if creating new
updateClass: function(obj, oldident, name, ident, prereq)
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

removeClass: function(obj, ident)
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

},

getPlan: function(obj, name)
{
  plan_list = obj.plan_list;
  for(key in plan_list)
  {
    p = plan_list[key];
    if(p.name.toLowerCase() == name.toLowerCase())
    {
      return p;
    }

  }

  return null;

},

//insert or overwrite. set oldident to ident if creating new
updatePlan: function(obj, oldname, name, semesters)
{
  plan_list = obj.plan_list;
  for(key in plan_list)
  {
    p = plan_list[key];
    if(p.name.toLowerCase() == oldname.toLowerCase())
    {
      p.name = name;
      return;

    }

  }

  obj.plan_list.push({"name": name, semesters});

},

removePlan: function(obj, name)
{
  plan_list = obj.plan_list;
  nplan_list = [];
  for(key in plan_list)
  {
    p = plan_list[key];
    if(p.name.toLowerCase() != name.toLowerCase())
    {
      nplan_list.push(p);
    }

  }

  obj.plan_list = nplan_list;

}

};
