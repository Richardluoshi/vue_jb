$(document).ready(function(){var jQueryEventFix=$.event.fix;$.event.fix=function(event){var offset,originalEvent,touches;event=jQueryEventFix.call($.event,event);originalEvent=event.originalEvent;var jcanvasScale=1;if(originalEvent){if(originalEvent.type=='touchmove')originalEvent.preventDefault();var target=originalEvent.target;if(target.tagName=='CANVAS'&&target.getAttribute('jcanvasScale')){jcanvasScale=parseInt(target.getAttribute('jcanvasScale'));}
touches=originalEvent.changedTouches;if(event.pageX!==undefined&&event.offsetX===undefined){offset=$(event.currentTarget).offset();try{if(offset){event.offsetX=(event.pageX-offset.left)*jcanvasScale;event.offsetY=(event.pageY-offset.top)*jcanvasScale;}}catch(error){}}else if(touches){try{offset=$(event.currentTarget).offset();if(offset){event.offsetX=(touches[0].pageX-offset.left)*jcanvasScale;event.offsetY=(touches[0].pageY-offset.top)*jcanvasScale;}}catch(error){}}}
return event;};var imgScaleMin=0.5,imgScaleMax=2;var elelayer;var widthOrg,heightOrg;pageInit();function pageInit(){$('article').css("opacity","1").fadeIn();$('.myphoto .btn-choose').on('click',btnNext);$('.congratulate p').on('click',confirmTitle);}
function btnNext(){$('.congratulate').show();}
var itemList=[];var increaseId=0;var selectId=0;var item={};function confirmTitle(){increaseId++;var left=($(window).width()-209)/2;var top=($(window).height()-209)/2;$('.congratulate').fadeOut();elelayer=$('<span data-id='+increaseId+' class="move active" style="left:'+left+'px;top:'+top+'px"> <a class="close"></a><a class="rotate"></a></span>').appendTo(".myphoto .imgbox");var id=$(this).data("id");var src=$(this).find("img").attr("src");imgChild=$('<img/>').attr({src:src}).appendTo(elelayer).addClass("wid"+id);widthOrg=elelayer.find("img").width();heightOrg=elelayer.find("img").height();var data={id:increaseId,width:widthOrg,height:heightOrg,tx:0,ty:0,_tx:0,_ty:0,rx:0,ry:0,_rx:0,_ry:0,disPtoO:0,scale:1,left:left,top:top,anglePre:0,angleNext:0,rotate:0,ox:left+widthOrg/2,oy:top+heightOrg/2,r:Math.sqrt(widthOrg*widthOrg+heightOrg*heightOrg)/2}
itemList[itemList.length]=data;}
$('.imgbox').on("touchstart",'.rotate ',function(e){selectId=$(this).parent().attr('data-id');itemList.forEach(function(currentValue){if(selectId==currentValue.id){item=currentValue}})
e.preventDefault();item.rx=e.offsetX;item.ry=e.offsetY;item.anglePre=getAngle(item.ox,item.oy,e.offsetX,e.offsetY);})
$('.imgbox').on("touchmove",'.rotate',function(e){e.preventDefault();item.disPtoO=getDistancs(item.ox,item.oy,e.offsetX,e.offsetY);item.scale=(item.disPtoO/item.r).toFixed(2);if(item.scale>=imgScaleMax)item.scale=imgScaleMax
if(item.scale<=imgScaleMin)item.scale=imgScaleMin
item.angleNext=getAngle(item.ox,item.oy,e.offsetX,e.offsetY);item.rotate+=item.angleNext-item.anglePre;$(this).parent().css({scale:item.scale,rotate:item.rotate})
$(this).css({scale:1/item.scale}).parent().find('.close').css({scale:1/item.scale})
item.anglePre=item.angleNext;})
$(".imgbox").on('touchstart','.move img',function(e){selectId=$(this).parent().attr('data-id');$(".move").removeClass('active');$(this).parents(".move").addClass('active');itemList.forEach(function(currentValue){if(selectId==currentValue.id){item=currentValue}})
item.tx=e.offsetX;item.ty=e.offsetY;})
$(".imgbox").on('touchmove','.move img',function(e){item._tx=e.offsetX-item.tx;item._ty=e.offsetY-item.ty;item.left+=item._tx;item.top+=item._ty;$(this).parent().css({left:item.left,top:item.top})
item.ox=+item.left+item.width/2;item.oy=+item.top+item.height/2;item.tx=e.offsetX;item.ty=e.offsetY;})
$(".imgbox").on('touchend','.move img',function(e){itemList.forEach(function(currentValue){if(selectId==currentValue.id){currentValue=item;}})})
$(".imgbox").on('touchend','.close',function(e){$(this).parents(".move").remove()})
function getAngle(px,py,mx,my){var x=px-mx;var y=py-my;var angle=Math.atan2(y,x)*360/Math.PI;return angle;}
function getDistancs(cx,cy,pointer_x,pointer_y){var ox=pointer_x-cx;var oy=pointer_y-cy;return Math.sqrt(ox*ox+oy*oy);}
$(".preventDefault").on("touchmove",function(e){e.preventDefault();})});