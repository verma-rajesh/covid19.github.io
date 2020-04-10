
var vars={}
function get() {
var states=[];
var districts;
var daily;


fetch('https://api.covid19india.org/data.json')
    .then((response) => response.json())
        .then((data) => {
            // console.log(data)
        function header_data() {
            let s = data.statewise[0];
            document.getElementById('allcase1').innerHTML = '<div class="map-stats"><div class="stats fadeInUp" style="animation-delay: 2s;"><h4>Total</h4><div class="stats-bottom"><h5>'+ `${s.confirmed}` + '</h5><h6><span style="margin-left:.3rem;"id="total"></span></h6><h6></h6></div></div><div class="stats is-blue fadeInUp" style="animation-delay: 2.1s;"><h5>Active</h5><div class="stats-bottom"><h5>'+ `${s.active}` + '</h5><h6><span style="margin-left:.3rem;"id="total"></span></h6><h6></h6></div></div><div class="stats is-green fadeInUp" style="animation-delay: 2.2s;"><h5>Recover</h5><div class="stats-bottom"><h5> '+ `${s.recovered}` + '</h5><h6><span style="margin-left:.3rem;"id="recover"></span></h6><h6></h6></div></div><div class="stats is-gray fadeInUp" style="animation-delay: 2.3s;"><h5>Death</h5><div class="stats-bottom"><h5>'+ `${s.deaths}` + '</h5><h6><span style="margin-left:.3rem;"id="death"></span></h6><h6></h6></div></div></div></div> ' 
            //         <div class="col col-sm-3" style="font-size: 30px;color:#007bff;">Total <br>  '+ `${s.confirmed}` + '</div> \
            //         <div class="col col-sm-3" style="font-size: 30px;color:red;">Active <br>  '+ `${s.active}` + '</div> \
            //         <div class="col col-sm-3" style="font-size: 30px;color:gray; ">Death <br>  '+ `${s.deaths}` + '</div> \
            //         <div class="col col-sm-3" style="font-size: 30px;color:green;">Recovered <br>  '+ `${s.recovered}` + '</div> \
            //       </div> ';
            document.getElementById('total').innerHTML='[+'+ s["deltaconfirmed"] +']';
            document.getElementById('recover').innerHTML='[+'+ s["deltarecovered"] +']';
            document.getElementById('death').innerHTML='[+'+ s["deltadeaths"] +']';
            
            document.getElementById('last date').innerHTML='Last update date: '+s['lastupdatedtime'];
            
        }
        header_data()
       
        function card_loader() {
            
            document.getElementById('here').innerHTML = '';
            var k=0;
            data.statewise.forEach(function (s) {
               
                if (s.confirmed!=0 && s.state != 'Total') {
                    
                    document.getElementById('here').innerHTML += '<div class="flex-item"> \
                <div class="card"> \
                    <div class="card-body"> \
                        <h5 class="card-title" >'+ s.state + '</h5> \
                        <h6 class="card-subtitle mb-2 text-muted" >Total: '+ s.confirmed +'<span style="margin-left:1rem;color:#ff073a;">[+'+ s.deltaconfirmed+']</span></h6> \
                       <p> <div class="container"> \
                        <div class="row"> \
                        <div class="map-stats1"> \
                        <div class="stats1 is-blue1 fadeInUp1" style="animation-delay: 2.1s;"><h5 style="font-size:1rem;">Infected</h5><div class="stats-bottom1"><h4 style="font-size:1rem;">'+ s.active +' </h4><h6></h6></div></div> \
                        <div class="stats1 is-green1 fadeInUp1" style="animation-delay: 2.2s;"><h5 style="font-size:1rem;">Recovered</h5><div class="stats-bottom1"><h4 style="font-size:1rem;">'+ s.recovered +'</h4><h6></h6></div></div> \
                        <div class="stats1 is-gray1 fadeInUp1" style="animation-delay: 2.3s;"><h5 style="font-size:1rem;">Death</h5><div class="stats-bottom1"><h4 style="font-size:1rem;">'+ s.deaths +'</h4><h6></h6></div></div> \
                    </div> </div></div></p>\
                       <button class="btn" style="margin-top:1rem;" onclick="load_disctict(\''+ s.state + '\')" ><a href="#" class="card-link">See Districts</a></button> \
                   </div> \
                </div> \
            </div>';
           
                }
        
            });
            
        }
       // console.log(states);
        card_loader();
        
        
    })

    

    
		
                
            fetch('https://api.covid19india.org/v2/state_district_wise.json')
            .then((res)=> res.json())
            .then((data)=>{
               
               
               let k=0
                for(i in data){
                   
                     var arr=[]
                     var brr=[]
                     var crr=[]
                    var result={}
                    
                     for (j in data[i].districtData){
                         arr[j]=data[i].districtData[j]
                     }
                    
                     for(k in arr){
                        result[arr[k].district]=arr[k].confirmed
                     }
                    vars[data[i].state]=result
                   
                     
                     
                     
                }
            })
}





function load_disctict(s){
    table = '<table class="table"><tr><th>Districts</th><th>Confirmed</th></tr>';
    
    for (i in vars[s]){
        table+='<tr><td>'+i+'</td><td>'+vars[s][i]+'</td></tr>'; 
    }
    table+='</table>';
    bootbox.dialog({
    title: s,
    message: table,
    size: 'large',
    
    callback: function (result) {
        console.log(result);
    }
});

    }


var text = '{"employees":[' +
        '{"first":"Do you have cough?"},' +
        '{"first":"Do you have cold?"},' +
        '{"first":"Are you having Diarrhea?"},' +
        '{"first":"Are you having sore throat?"},' +
        '{"first":"Are you having body aches?"},' +
        '{"first":"Are you having a headache?"},' +
        '{"first":"Do you have fever?"},' +
        '{"first":"Are you having any difficulty in breathing?"},' +
        '{"first":"Are you experiencing V fatigue?"},' +
        '{"first":"Have you traveled recently during the past 14 days?"},' +
        '{"first":"Do you have a history of traveling to an area infected with COVID-19 ?"},' +
        '{"first":"Do you have direct contact with or are you taking care of a positive COVID-19 PATIENT? "},' +
        '{"first":"Have you traveled recently during the past 14 days?"}]}';

obj = JSON.parse(text);

var yes = 0;
var no = 0;
var count=0;
    function question(){
        document.getElementById("demo1").innerHTML=+(count+1)+'. ' +obj.employees[count].first;
        count+=1;
        if(count==13){
            Result();
        }
    }
    function Result(){
        var re=(yes/(count-1))*100;
        
        if (re>65){
            document.getElementById("demo1").innerHTML='<h5>Result:</h5><h1 style="color:#d35622">HIGH</h1><h5 style="color:#444444e0">Please see a doctor immediately.Do not panic,isolate yourself from friends and family.</h5>';
        }
        else if(40<re && re<64){
            document.getElementById("demo1").innerHTML='<h5>Result:</h5><h1 style="color:#a97f01">MEDIUM</h1><h5 style="color:#444444e0"> \
                Drink water regularly and observe personal good hygiene. \
                Pay attention to your health and redo test after two days.</h6>';
        }
        else{
            document.getElementById("demo1").innerHTML='<h5>Result:</h5><h1 style="color:#093e10f0">LOW</h1><h5 style="color:#444444e0">You may be stressed,get some rest.</h5>'
        }
        document.getElementById('btn1').innerHTML='';
//
        yes=0;
        count=0;
        no=0;
    }
    function closedailog1(){
        bootbox.dialog({
        onEscape: true,
        function() {},
// ...
});
    }
    function inc() {
        yes++;
        
        question();
        
        
    }
    function inc1() {
        no++;
       
        question();
      
    }
function load_symtoms(){
bootbox.dialog({
title: '<h2 style="color:#0e0e0ec7">Corona Virus symptoms Check</h2>',
message: '<div><h2 style="color:#444444e0" id="demo1"></div><br></h2><div id="btn1"><button type="button" class="btn btn-danger" style="width:6rem;height:2.5rem;" onclick="inc()">YES</button> \
    <button type="button" class="btn btn-info" style="width:6rem;height:2.5rem;" onclick="inc1()">No</button></div>',
size: 'large',
onEscape: true,
backdrop: true,
callback: function (result) {
    console.log(result);
}
});
count=0;
question();
yes=0;
no=0;

}
// load_disctict('Delhi')
