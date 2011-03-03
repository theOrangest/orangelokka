$(function() {
  $('#aside li.parent h3.title').mouseover(function() {
    $(this).addClass('current');
    $(this).next().addClass('current');

    $(this).next().mouseover(function() {
      $(this).addClass('current');
      $(this).prev().addClass('current');
    });

    $(this).next().mouseout(function() {
      if(!$(this).prev().hasClass('default')) {
        $(this).removeClass('current');
        $(this).prev().removeClass('current');
      }
    });
  });

  $('#aside li.parent h3.title').mouseout(function() {
    if(!$(this).hasClass('default')){
      $(this).removeClass('current');
      $(this).next().removeClass('current');
    }
  });

  var paths = location.pathname.split("/");
  if(paths.length > 1 && paths[1] == "admin") {
    if(paths[2] == "") return;
    var inflector = new Inflector();
    var lastPath = paths[paths.length-1];
    if(lastPath == "new") {
      pathIdx = 2;
    } else if(lastPath == "edit") {
      pathIdx = 3;
      while(paths[paths.length-pathIdx].match(/[0-9]/g)) {
        pathIdx++;
      }
    } else {
      pathIdx = 1;
    }
    var currentClass = inflector.singularize(paths[paths.length-pathIdx]);
    var currentMenu = $('#aside li.parent.' + currentClass + ' h3.title');
    currentMenu.addClass('default');
    currentMenu.addClass('current');
    currentMenu.next().addClass('current');
  }

});
