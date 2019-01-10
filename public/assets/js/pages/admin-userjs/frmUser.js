function imageUserGet(id){
    var response = "";
    $.ajax({
        url: cosmo.urlbase + cosmo.routes_name.ADM_GET_PHOTO_USER + id,
        type: "GET",
        async: false,
        success: function(data){
            response = data;
        }
    });
    return response;
}

function frmUser() {}
frmUser.prototype.initialize = function() {
    $(".table-responsive").on("show.bs.dropdown", function() {
        $(".table-responsive").css("overflow", "inherit")
    }), $(".table-responsive").on("hide.bs.dropdown", function() {
        $(".table-responsive").css("overflow", "auto")
    }), this.drawTable(), $("#frmuser-search").on("keyup", function() {
        $("#table-users").DataTable().search(this.value).draw()
    })
}, frmUser.prototype.drawTable = function() {
    var e = function(e){
            $("#table-users").DataTable().destroy(), $("#table-users tbody").html(""), e.forEach(function(e, o) {
                var s = "";
                s += "<tr>",
                s += "   <td>",
                s += '       <div class="avatar">',
                s += '           <img src="' + imageUserGet(e.id) + '"/>';
                s += "       </div>",
                s += "   </td>",
                s += "   <td>" + e.fullname + "</td>",
                s += "   <td>" + e.username + "</td>",
                s += "   <td>",
                s += '       <div class="btn-group">',
                s += '           <a type="button" class="btn btn-default" href="' + window.cosmo.urlbase + window.cosmo.routes_name.ADM_REGISTER_USER_MODIFY + "/" + e.id + '"><i class="fa fa-cog" aria-hidden="true"></i></a>',
                s += '           <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
                s += '               <span class="caret"></span>',
                s += '               <span class="sr-only">Toggle Dropdown</span>',
                s += "           </button>",
                s += '           <ul class="dropdown-menu" role="menu">',
                s += '               <li><a href="' + window.cosmo.urlbase + window.cosmo.routes_name.ADM_REGISTER_USER_MODIFY + "/" + e.id + '">Editar</a></li>',
                s += '               <li><a href="#">Excluir</a></li>',
                s += '               <li class="divider"></li>';
                s += "           </ul>",
                s += "       </div>",
                s += "   </td>",
                s += "</tr>",
                $("#table-users tbody").append(s)
            }), $("#table-users").DataTable({
                language: {
                    url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Portuguese-Brasil.json"
                }
            })
        },
        o = function(e) {
            cosmo.dialog.error("Erro", e.responseJSON[0])
        },
        s = cosmo.ajax.getDefaults();
    return s.url = cosmo.urlbase + cosmo.routes_name.ADMIN_GET_ALL_USER, s.method = "GET", s.type = "json", s.sucess = e, s.error = o, s.target = $("#table-users"), cosmo.ajax.send(s), !0
}, window.cosmo = window.cosmo || {}, window.cosmo.frmuser = window.cosmo.frmuser || new frmUser, $("document").ready(function() {
    window.cosmo.frmuser.initialize()
});