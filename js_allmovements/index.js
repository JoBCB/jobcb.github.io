  window.onload = function () {
    
    var vw = window.innerWidth;
    var vh = window.innerHeight;

    // var vw = 640;
    // var vh = 480;

    var currentT;

    $('#stage').attr('width',vw);
    $('#stage').attr('height',vh);
    var fps = 24;
    navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;
    var v = document.getElementById('v'); 
    var a = document.getElementById('track'); 
    var average 
    function errorCallback() {
          console.log('no');
    }
    navigator.getUserMedia({video: true}, function(stream) {
      v.src = window.URL.createObjectURL(stream);
      localMediaStream = stream;

      update();

    }, errorCallback); 
    var canvas = document.getElementById('stage');
      var context = canvas.getContext('2d');
      var x = 0;
      var y = 0;

      var tolerance = 170;

      var cw = Math.floor(canvas.clientWidth );
      var ch = Math.floor(canvas.clientHeight );
        canvas.width = cw;
        canvas.height = ch;

$('#control-bg input').on('keyup', function(){
  var bg =  $('#control-bg input').val();
  $('#stage').css('background-image' , 'url('+bg+')');
});

var distort = 0;


function draw(v,canvas,w,h) { 

      var mode = $('#control-mode select').val();
        distort = $('#control-distort input').val();
         

      var ghostData2=context.createImageData(vw-distort ,vh);
   
    canvas.drawImage(v,0,0,w,h);
    var video = context.getImageData(0,0,w,h);
    var data = video.data;

   
 
  average = 20;
   

              
  context.globalCompositeOperation = "multiply";
  context.globalAlpha = 1;
   for (var i= 0;i<ghostData2.data.length;i+=4){
   
      ghostData2.data[i+0] = data[i +0];
      ghostData2.data[i+1] = data[i +1];
      ghostData2.data[i+2] = data[i +2];
      ghostData2.data[i+3] = data[i + 3];


      if (mode == "1") {
          if ( Math.abs(ghostData2.data[i+0]  - ghostData2.data[i+1] - ghostData2.data[i+2]) >  tolerance ) {
            ghostData2.data[i+3] = 0;
        } 
      }
      else {
        if ( Math.abs(ghostData2.data[i+0]  - ghostData2.data[i+1] - ghostData2.data[i+2]) <  tolerance ) {
            ghostData2.data[i+3] = 0;
        } 
      }

      

  } 

 
                  
          video.data = data;
          // canvas.putImageData(video,0,0);

          context.putImageData( ghostData2, 0 ,  0 );
                  
             
                   
     }

    function update() {
           setTimeout(function () {

            
            
             context.clearRect(0,0,vw,vh);  
              requestAnimationFrame(update);

              tolerance = 100;
              
              draw(v,context,cw,ch);


               analyser.getByteFrequencyData(frequencyData);  

                var values = 0;
                for (var k = 0; k < F_length; k++) {
                  values += frequencyData[k];
                }
                average = values / F_length;

               // canvas.style.webkitFilter = "  brightness("+map_range(average,50 ,100,1,4)+") ";

           },1000/fps);
 }
}