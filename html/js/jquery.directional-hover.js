(function($){$.fn.directionalHover=function(options){var opts=$.extend({},$.fn.directionalHover.defaults,options);var FLAG_T=1,FLAG_R=2,FLAG_B=4,FLAG_L=8;var tlMask=FLAG_T|FLAG_L,trMask=FLAG_T|FLAG_R,blMask=FLAG_B|FLAG_L,brMask=FLAG_B|FLAG_R;function slideOverlay(overlay,direction,px,py,ew,eh,ex,ey){var cornerFlags=0;if(py-ey<=eh/2)cornerFlags^=FLAG_T;if(px-ex>=ew/2)cornerFlags^=FLAG_R;if(py-ey>eh/2)cornerFlags^=FLAG_B;if(px-ex<ew/2)cornerFlags^=FLAG_L;findSide(cornerFlags,overlay,direction,px-ex,py-ey,ew/2,eh/2);}function findSide(flags,overlay,direction,x,y,w,h){if(testMask(flags,tlMask)){testTopLeftToBottomRight(x,y,w,h)?setOverlayPosition(overlay,direction,0,-w*2):setOverlayPosition(overlay,direction,-h*2,0);}else if(testMask(flags,trMask)){testBottomRightToTopLeft(x,y,w,h)?setOverlayPosition(overlay,direction,-h*2,0):setOverlayPosition(overlay,direction,0,w*2);}else if(testMask(flags,blMask)){testBottomRightToTopLeft(x,y,w,h)?setOverlayPosition(overlay,direction,0,-w*2):setOverlayPosition(overlay,direction,h*2,0);}else if(testMask(flags,brMask)){testTopLeftToBottomRight(x,y,w,h)?setOverlayPosition(overlay,direction,h*2,0):setOverlayPosition(overlay,direction,0,w*2);}}function testMask(flags,mask){return(flags&mask)===mask;}function testTopLeftToBottomRight(x,y,w,h){return(h*x-w*y)<0;}function testBottomRightToTopLeft(x,y,w,h){return(w*(y-h)+h*x-w*h)<0;}function setOverlayPosition(overlay,direction,top,left){if(direction==='in'){overlay.animate({top:top,left:left},0,function(){overlay.stop().animate({top:0,left:0},opts.speed,opts.easing);});}else if(direction==='out'){overlay.animate({top:0,left:0},0,function(){overlay.stop().animate({top:top,left:left},opts.speed,opts.easing);});}}this.css({position:'relative',overflow:'hidden'});this.find('.'+opts.overlay).css({position:'absolute',top:'-100%'});return this.each(function(){var container=$(this);container.hover(function(e){slideOverlay(container.find('.'+opts.overlay),'in',e.pageX,e.pageY,container.width(),container.height(),Math.floor(container.offset().left),container.offset().top);},function(e){slideOverlay(container.find('.'+opts.overlay),'out',e.pageX,e.pageY,container.width(),container.height(),Math.floor(container.offset().left),container.offset().top);});});};$.fn.directionalHover.defaults={overlay:"dh-overlay",easing:"swing",speed:400};}(jQuery));