$(document).ready(function() {

  // Use the shorthand notation to retrieve the default app's services
  var firebaseStorage = firebase.storage();
  var firebaseDatabase = firebase.database();

  var id = 0;

  var color = 0;

  tasks = [];

  $.ajax({
    type: 'GET',
    url: '/data/homeworks.txt',

    success: function(result) {
        homeworks = result.split('|');
        loadHW(homeworks, tasks);
    }
  });

  firebase.database().ref('tasks')
  .on('value', function(snapshot) {
      loadHWFire(snapshot, tasks);
  });
});

function showTaskCards() {
  Object.values(tasks).forEach(function (task) {
    $("#taskList").append(task.getHtml());
  });

  $(document).ready(function(){
    $('ul.tabs').tabs();
  });
}

function loadHWFire(homeworks) {
  homeworks.forEach(function(childSnapshot) {
    this.homework = childSnapshot;
    var date = homework.val().date.day + "." + (homework.val().date.month + 1) + "." + (homework.val().date.year + 1900);
    var task = new Task(homework.val().subject, date, homework.val().description, "Nicht verfügbar", tasks.length, 'Keine Hilfen verfügbar');
    tasks[tasks.length] = task;
  });

  showTaskCards();
}

function loadHW(homeworks) {
  for (var i = 0; i < homeworks.length - 1; i++) {
      var homework = homeworks[i].split("&");
      var task = new Task(homework[2], homework[3], homework[4], homework[1], tasks.length, 'Keine Hilfen verfügbar');
      tasks[tasks.length] = task;
  }
}

function Task(subject, date, desc, teacher, id, help) {
  this.subject = subject;
  this.date = date;
  this.desc = desc;
  this.teacher = teacher;
  this.id = id;
  this.help = help;

  this.getHtml = function getHtml() {
    var html2 = [
      '<div class="col s12 l6 askCard">',
        '<div class="card orange darken-2 hoverable">',
          '<div class="card-content white-text">',
            '<span class="card-title">' + subject + '</span>',
            '<span>Abgabedatum: ' + date + '</span>',
            '<br>',
            '<span>Lehrer: ' + teacher + '</span>',
          '</div>',
          '<div class="card-tabs">',
            '<ul class="tabs tabs-fixed-width tabs-transparent">',
              '<li class="tab"><a class="active" href="#desc_' + id + '">Beschreibung</a></li>',
              '<li class="tab"><a href="#help_' + id + '">Hilfen</a></li>',
            '</ul>',
          '</div>',
          '<div class="card-content orange darken-1">',
            '<div id="desc_' + id + '">' + desc + '</div>',
            '<div id="help_' + id + '">' + help + '</div>',
          '</div>',
        '</div>',
      '</div>'
    ].join("\n");

    return html2;
  }
}
