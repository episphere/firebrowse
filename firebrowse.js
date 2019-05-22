console.log('firebrowse.js loaded');

(function(){ // ananymous wrapping to keep glocal scope clean for modular use

const firebrowse={}

firebrowse.created_at=Date()

firebrowse.get=async function(url){
    url = url||'http://firebrowse.org/api/v1/Analyses/Mutation/MAF?format=json&cohort=BLCA&tool=MutSig2CV&gene=PSCA&page=1&page_size=250&sort_by=tcga_participant_barcode'
    return (await fetch('https://firebrowse.herokuapp.com/?'+url)).json()
}


if(typeof(define)!='undefined'){
    define(firebrowse)
}else{
    window.firebrowse=firebrowse
}


})()