
function randomChar(l) {

    var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
    var tmp = "";

    for (var i = 0; i < l; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
    }

    return tmp;
}

function RefreshCheckCodeImg(isFocus) {
    try {
        var oImageCheck = document.getElementById("imgCheckCode");
        if (oImageCheck && isFocus && oImageCheck.style.display == "block") {
            return;
        }

        oImageCheck.style.display = "block";
        //oImageCheck.src = '/UserControls/Common/DrawImage.aspx?v=' + randomChar(12);
        oImageCheck.src = "/Services/DrawImage.ashx?t=vc&f=" + encodeURIComponent("宋体") + "&v=" + randomChar(12);
    }
    catch (e) {
    }
}

function RefreshCheckCodeImg2(isFocus) {
    try {
        var oImageCheck = document.getElementById("imgCheckCode2");
        if (oImageCheck && isFocus && oImageCheck.style.display == "block") {
            return;
        }

        oImageCheck.style.display = "block";
        //oImageCheck.src = '/UserControls/Common/DrawImage.aspx?v=' + randomChar(12);
        oImageCheck.src = "/Services/DrawImage.ashx?t=vc&f=" + encodeURIComponent("宋体") + "&v=" + randomChar(12);
    }
    catch (e) {
    }
}

function SetObjFocus(targetObjId) {
    if (event.keyCode == 13) {

        if (targetObjId.indexOf("btnLogin") != -1) {
            document.getElementById(targetObjId).click();
        }
        else {
            document.getElementById(targetObjId).focus();
        }

    }
}

function ShowForgetPassword() {
    self.location = '/common/forgetpassword.htm';
}

//文本框获取焦点清楚指定文本
function inputClearText(obj, text) {
    if (obj.value == text) {
        obj.value = "";
    }
    obj.style.color = "#000000";
}

//文本框失去焦点
function inputClearTextBlur(obj, text) {
    if (obj.value == "") {
        obj.value = text;
        obj.style.color = "#AAAAAA";
    }
}

function changeonblur(str) {
    if (str == "Name") {
        $("#divname").attr("class", "textboxout");
        //document.getElementById("divname").className = "textboxout";
    }
    else if (str == "Word") {
        $("#divword").attr("class", "textboxout");
        //document.getElementById("divword").className = "textboxout";
    }
    else if (str == "reg") {
        $("#divreg").attr("class", "textboxout1");
        //document.getElementById("divreg").className = "textboxout1";
    }

}

function changeonfocus(str) {
    if (str == "Name") {
        $("#divname").attr("class", "textboxin");
        //document.getElementById("divname").className = "textboxin";
    }
    else if (str == "Word") {
        $("#divword").attr("class", "textboxin");
        //document.getElementById("divword").className = "textboxin";
    }
    else if (str == "reg") {
        $("#divreg").attr("class", "textboxin1");
        //document.getElementById("divreg").className = "textboxin1";
    }
    
}

function changeonblur2(str) {
    if (str == "Name") {
        $("#divname").attr("class", "textboxout");
        //document.getElementById("divname").className = "textboxout";
    }
    else if (str == "Word") {
        $("#divword").attr("class", "textboxout");
        //document.getElementById("divword").className = "textboxout";
    }
    else if (str == "reg") {
        $("#imgCheckCode2").show();
    }

}

function changeonfocus2(str) {
    if (str == "Name") {
        $("#divname").attr("class", "textboxin");
        //document.getElementById("divname").className = "textboxin";
    }
    else if (str == "Word") {
        $("#divword").attr("class", "textboxin");
        //document.getElementById("divword").className = "textboxin";
    }
    else if (str == "reg") {
        $("#imgCheckCode2").show();
    }

}


