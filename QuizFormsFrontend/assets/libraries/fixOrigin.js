if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
if(!window.console){
    window.console = {
        log : function(){},
        error: function(){},
        info : function(){}
    }
}
window.isIE = /*@cc_on!@*/false;