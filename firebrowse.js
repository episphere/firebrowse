console.log('firebrowse.js loaded');

firebrowse={}

firebrowse.created_at=Date();

firebrowse.get=async(url='http://firebrowse.org/api/v1/Samples/Clinical_FH?format=json&cohort=PRAD&fh_cde_name=psa_value&page=1&page_size=250&sort_by=cohort')=>{
    return (await fetch('https://firebrowse.herokuapp.com/?'+url)).json()
}

firebrowse.getClinical_FH=async(tcga_participant_barcodes,n=50)=>{ //(Array of codes, length of slice)
    if(!tcga_participant_barcodes){ // composing an example
        console.log('no barcodes provided, loading 250 tcga participan barcodes for PRAD cohort as an example')
        tcga_participant_barcodes = await firebrowse.get('http://firebrowse.org/api/v1/Samples/Clinical_FH?format=json&cohort=PRAD&fh_cde_name=psa_value&page=1&page_size=250&sort_by=cohort')
        tcga_participant_barcodes=tcga_participant_barcodes.Clinical_FH.map(x=>x.tcga_participant_barcode)
    }
    let url = 'http://firebrowse.org/api/v1/Samples/Clinical_FH?format=json&tcga_participant_barcode='
    let results = {
        "Clinical_FH":[]
    }
    let calls = []
    for(var i=0;i<tcga_participant_barcodes.length;i+=n){
        let codes = tcga_participant_barcodes.slice(i,i+n)
        console.log('loading Clinical_FH for:',codes)
        calls[i]=firebrowse.get(url+codes.join(',')).then(x=>{
            results.Clinical_FH=results.Clinical_FH.concat(x.Clinical_FH)
            //debugger
        })
    }
    await Promise.all(calls)
    return results
    
}

if(typeof(define)!='undefined'){
    define(firebrowse)
}


/*
https://github.com/web4bio/webgen/blob/addClinicalFeatures/main/js/fillSelectBoxes.js#L158 
From Richard Moffitt to Everyone: (11:59 AM)
 betterFetch = async function(url,body){
  let fetchData = { 
      method: 'POST', 
      body: JSON.stringify(body),
      headers:{'Content-Type':'application/json'}
  };
  let tmpData = (await fetch(url, fetchData)).json();
  return(tmpData);
}; https://github.com/web4bio/webgen/blob/master/archive/richard/richard.js 
From Adit Anand to Everyone: (12:45 PM)
 I have a hard out at 12:45 today, so I sadly can't stay. Have a great weekend everyone! 
From Soma Kobayashi to Everyone: (12:46 PM)
 <script>var exports = {"__esModule": true};</script> 
 */


