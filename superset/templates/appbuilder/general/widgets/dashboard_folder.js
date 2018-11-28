function find_duplicate_in_array(arra1) {
    var object = {};
    var result = [];
    arra1.forEach(function (item) {
      if(!object[item])
          object[item] = 0;
        object[item] += 1;
    })
    for (var prop in object) {
       if(object[prop] >= 2) {
           result.push(prop);
       }
    }
    return result;
}

function listView() {
    $(".folder-container").hide();
    $('.form-actions-container').show();
    $('#filter_form').show();
    $(".table-responsive").show();
    $(".pagination-container").show();
}

function folderView() {
    $(".folder-container").show();
    $('.form-actions-container').hide();
    $('#filter_form').hide();
    $(".table-responsive").hide();
    $(".pagination-container").hide();
}

function computeFolderView() {
    folderView();
    var panelStyles = {
      display : "inline-block",
      paddingRight: 40
    };
    $('.panel-title').css(panelStyles);
    var viewSwitch = `<div class="btn-group btn-group-xs" role="group" style="margin-left: 12px;">
                  <button id="listView" type="button" class="btn btn-default">List all</button>
                  <button id="folderView" type="button" class="btn btn-default">Folders</button>
                </div>`

    $(viewSwitch).insertAfter('.panel-title');

    $( "#listView" ).click(function() {
        listView();
    });

    $( "#folderView" ).click(function() {
        folderView();
    });

    var dashboards = [];
    var dashboardTitles = [];
    $("table tr td:nth-child(3)").each(function () {
        var $this = $(this);
        var title = $this.text();
        dashboards.push({
            title: title,
            link: $this.children('a').attr("href")
        })
        var titleSplit = title.split(' ');
        dashboardTitles.push(titleSplit[0]);
    });

    var folders = find_duplicate_in_array(dashboardTitles)
    var others = 'Others';
    folders.push(others);

    var directory = {};
    folders.forEach(function(item) {
        directory[item] = [];
    })

    dashboards.forEach(function(item) {
        var tSplit = item.title.split(' ');
        if (folders.indexOf(tSplit[0]) > -1) {
            directory[tSplit[0]].push(item);
        } else {
            directory[others].push(item);
        }
    })

    $('.list-container').append('<div class="folder-container container"></div>');

    for (var key in directory) {
        var divInner = $('<div>').addClass('folder col-md-12');
        var folder = $('<h4>').text(key);
        divInner.append(folder);
        var ul = $('<ul>').addClass('list-group');
        directory[key].forEach(function(item) {
            var li = $('<li>').addClass('list-group-item col-md-11');
            var aTag = $('<a>').text(item.title);
            aTag.attr("href", item.link);
            li.append(aTag);
            ul.append(li);
        })
        divInner.append(ul);
        $(".folder-container").append(divInner);
    }
}

$(document).ready(function() {
    if (window.location.pathname === '/dashboard/list/') {
        computeFolderView()
    }
})