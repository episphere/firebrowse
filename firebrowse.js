console.log('firebrowse.js loaded');

firebrowse={}

firebrowse.created_at=Date();

firebrowse.get=async(url='http://firebrowse.org/api/v1/Samples/Clinical_FH?format=json&cohort=PRAD&fh_cde_name=psa_value&page=1&page_size=250&sort_by=cohort')=>{
    return (await fetch('https://firebrowse.herokuapp.com/?'+url)).json()
}

// ---------------------------------------------------------------------------------------------------

// Retrieve Clinical_FH data

firebrowse.getClinical_FH_b=async(tcga_participant_barcodes,n=50)=>{ //(Array of codes, length of slice)
    if(!tcga_participant_barcodes){ // composing an example
        //console.log('no barcodes provided, loading 250 tcga participan barcodes for PRAD cohort as an example')
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
        // console.log('loading Clinical_FH for:',codes)
        calls[i]=firebrowse.get(url+codes.join(',')).then(x=>{
            results.Clinical_FH=results.Clinical_FH.concat(x.Clinical_FH)
            //debugger
        })
    }
    await Promise.all(calls)
    return results
    
}

firebrowse.getClinical_FH_bf=async(tcga_participant_barcodes,clinicalFeatures,n=50)=>{ //(Array of codes, length of slice)
    if(!tcga_participant_barcodes){ // composing an example
        //console.log('no barcodes provided, loading 250 tcga participan barcodes for PRAD cohort as an example')
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
        //console.log('loading Clinical_FH for:',codes)
        calls[i]=firebrowse.get(url+codes.join(',')+'&fh_cde_name='+clinicalFeatures).then(x=>{
            results.Clinical_FH=results.Clinical_FH.concat(x.Clinical_FH)
            //debugger
        })
    }
    await Promise.all(calls)
    return results
    
}

// ---------------------------------------------------------------------------------------------------

// Retrieve mRNASeq data

firebrowse.getmRNASeq_cgb=async(cohort,gene,tcga_participant_barcodes,n=50,m=10) => { //(Array of codes, length of slice)
    if(!tcga_participant_barcodes){ // composing an example
        //console.log('no barcodes provided, loading 250 tcga participant barcodes for PRAD cohort as an example')
        tcga_participant_barcodes = await firebrowse.get('http://firebrowse.org/api/v1/Samples/mRNASeq?format=json&sample_type=TP&protocol=RSEM&cohort=PRAD&gene=TP53&page=1&page_size=250&sort_by=tcga_participant_barcode')
        tcga_participant_barcodes=tcga_participant_barcodes.mRNASeq.map(x=>x.tcga_participant_barcode)
    }
    let url = 'http://firebrowse.org/api/v1/Samples/mRNASeq?format=json&sample_type=TP&protocol=RSEM&page=1&page_size=2001&sort_by=tcga_participant_barcode&tcga_participant_barcode='
    let results = { 
        "mRNASeq":[] 
    }
    let calls = []
    for(var i=0;i<tcga_participant_barcodes.length;i+=n){
        let codes = tcga_participant_barcodes.slice(i,i+n)
        // console.log('loading mRNASeq for:',codes)
        for(var j=0;j<gene.length;j+=m) {
            let geneSlices = gene.slice(j,j+m)
            calls.push(firebrowse.get(url+codes.join(',')+'&gene='+geneSlices+'&cohort='+cohort).then(x=>{
                results.mRNASeq=results.mRNASeq.concat(x.mRNASeq)
                //debugger
            }))
            
        }
    }
    await Promise.all(calls)
    return results
    
}

if(typeof(define)!='undefined'){
    define(firebrowse)
}