console.log('firebrowse.js loaded');

(function(){ // ananymous wrapping to keep glocal scope clean for modular use

const firebrowse={}

firebrowse.created_at=Date()


if(typeof(define)!='undefined'){
    define(firebrowse)
}else{
    window.firebrowse=firebrowse
}


})()