function frmUpdateUser() {}
frmUpdateUser.prototype.initialize = function() {
    $("#btn-create-user").on("click", function() {
        return cosmo.frmupdateuser.validate() && cosmo.frmupdateuser.save(), !1
    }), $("#btn-alter-image").click(function() {
        cosmo.frmupdateuser.wrapImage()
    }), $("#input-frmuser-fileupload").on("change", function() {
        cosmo.frmupdateuser.loadAvatar()
    }), $("#input-frmuser-block").on("change", function(){
        if ($("#input-frmuser-block").is(":checked"))
            $("#frmuser-reason-box").css("display", "block");
        else
            $("#frmuser-reason-box").css("display", "none");
    });
}, frmUpdateUser.prototype.createObject = function() {
    var e = {};
    return e.id = $("#input-hidden-id").val(),
        e.avatar = $("#img-frmuser-avatar").attr("src"),
        e.fullname = $("#input-frmuser-name").val(),
        e.admin = $("input#input-frmuser-administrator:checked").length,
        e.block_status = $("input#input-frmuser-block:checked").length,
        e.block_reason = $("#input-frmuser-reason").val(),
        e
}, frmUpdateUser.prototype.wrapImage = function() {
    $("#input-frmuser-fileupload").click()
}, frmUpdateUser.prototype.validate = function() {
    var e = this.createObject();
    return "" === e.fullname.trim() ? (cosmo.dialog.error("Erro", "O campo Nome Completo é obrigatório!"), !1) : !!this.isDataURL(e.avatar) || (cosmo.dialog.error("Erro", "O campo Imagem é obrigatório!"), !1)
}, frmUpdateUser.prototype.loadAvatar = function() {
    var e = new FileReader,
        a = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i,
        r = $("#input-frmuser-fileupload").get(0).files[0];
    if (!a.test(r.type)) return void cosmo.dialog.error("Erro", "O arquivo selecionado é inválido.");
    e.onload = function(e) {
        var a = new Image;
        a.src = e.target.result, a.onload = function() {
            var e = document.createElement("canvas");
            e.width = 96, e.height = 96, e.getContext("2d").drawImage(this, 0, 0, 100, 100), $("#img-frmuser-avatar").attr("src", e.toDataURL())
        }, a.src = e.target.result
    }, 0 !== $("#input-frmuser-fileupload").get(0).files.length && e.readAsDataURL(r)
}, frmUpdateUser.prototype.isDataURL = function(e) {
    var a = /^\s*data:([a-z]+\/[a-z0-9\-\+]+(;[a-z\-]+\=[a-z0-9\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
    return !!e.match(a)
}, frmUpdateUser.prototype.save = function() {
    var e = this.createObject(),
        a = function(e) {
            cosmo.dialog.success("Atualização de usuário!", e.message, function() {
                window.location.href = e.callback
            })
        },
        r = function(e) {
            cosmo.dialog.error("Erro", e.responseJSON[0])
        },
        t = cosmo.ajax.getDefaults();
    return t.url = cosmo.urlbase + cosmo.routes_name.ADM_REGISTER_USER_UPDATE, t.method = "POST", t.data = e, t.type = "json", t.sucess = a, t.error = r, cosmo.ajax.send(t), !0
}, window.cosmo = window.cosmo || {}, window.cosmo.frmupdateuser = window.cosmo.frmupdateuser || new frmUpdateUser, $("document").ready(function() {
    window.cosmo.frmupdateuser.initialize()
});