function touchScroll(id){
  if( navigator.userAgent.match(/Android/i) && isTouchDevice() ){ //if touch events exist...
    var el = document.getElementById(id);
    var scrollStartPos = 0;

    document.getElementById(id).addEventListener("touchstart", function(event){
      scrollStartPos = this.scrollTop + event.touches[0].pageY;
    }, false);

    document.getElementById(id).addEventListener("touchmove", function(event){
      this.scrollTop = scrollStartPos - event.touches[0].pageY;
      event.preventDefault();
    },false);
  }
}