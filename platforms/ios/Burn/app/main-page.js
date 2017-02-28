/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
var view = require("ui/core/view");
var stackModule = require("ui/layouts/stack-layout");
var gestures = require("ui/gestures");
var absoluteLayout = require("ui/layouts/absolute-layout");
var enums = require('ui/enums');

function loaded(args){
    var page = args.object;
    var myPack = page.getViewById("packBG");
    var mainLayout = page.getViewById('mainLayout');

    var topMin = 125;
    var topMax = 400;
    var centerVal = (topMax + topMin) / 2;

    var packTop;

    mainLayout.on(gestures.GestureTypes.pan, function (args) {

        /* ******************************************************************

         This can be broken in some edge cases and should be fixed.

         EXAMPLE: 
         If the user drags the pack below
         the min (dragging up on the screen) and then 
         quickly lets go and presses again for a second 
         pan gesture before the pack has a chance to
         get to the topMin position - it will have a 
         curLoc value that is less than the topMin
         so it will not fall into the 'changed' if block
         and nothing will happen.

         UPDATE:
         in the lower position it should maybe work different than in the upper
         position. or maybe they should both be independent.

         the user probably shouldnt have to drag all the way to the center point
         to make the animation start. maybe just a set number of pixels.

        ******************************************************************** */

        var touchY = args.deltaY;

        if(args.state === 1){
            // this is the 'began' state
            console.log('Pan state: began');
            // get the current location
            packTop = absoluteLayout.AbsoluteLayout.getTop(myPack);
        }


        if(args.state === 2){
            // this is the 'changed' state
            console.log('Pan state: changed');
            // we need to know the direction in case the user drags the view above the max or below the min
            // in that case the pan should continue to move the view past the min or the max but still stop at the next one.
            var newTop = packTop + touchY;
            //absoluteLayout.AbsoluteLayout.setTop(myPack, newTop);
            if(newTop <= topMax && newTop >= topMin){
                absoluteLayout.AbsoluteLayout.setTop(myPack, newTop);
            }
            
        }


        if(args.state === 3){
            // this is the 'ended' state

            console.log('Pan state: ended');

            var curLoc = absoluteLayout.AbsoluteLayout.getTop(myPack);
            var travelDist = curLoc - packTop;
            var travelDir = travelDist>0?'down':'up';
            // if the current location is not the min or the max then animate to one of them
            if(curLoc !== topMin && curLoc !== topMax){
                // check if the current location is greater than the center location
                // if it is then move it to the max spot
                // otherwise, move it to the min spot
                console.log('current location: ',curLoc + ' centerVal: ',centerVal);
                if(curLoc > centerVal){
                    // animate to max
                    var distance = topMax - curLoc;  
                    myPack.animate({
                        translate: {x: 0, y: distance},
                        //duration: '',
                        curve: enums.AnimationCurve.easeOut
                    });
                }else{
                    // animate to min 
                    var distance = topMin - curLoc;  
                    myPack.animate({
                        translate: {x: 0, y: distance},
                        //duration: '',
                        curve: enums.AnimationCurve.easeOut
                    });
                }
            }
        }

        
              
        
        
        
              
              
              
              
              // PHASE 1
              // get the pack image top val
              
              // myPack.top = touchY;
              
              // change the pack image top val when the touchY changes
              // dont let the pack image go too close to the top of the screen
              // dont let the pack image go too far down the screen
              // the whole screen should work with the touch event, not just the pack image
              
              // PHASE 2
              // when the pack reaches the topmost point, and the user starts the touch action again, this time it moves the cigarette instead of the pack.
              // when the cigarette is back down in the pack the user can start dragging down again to move the pack down
              // cigarette and pack dragging are seperate processes
    });
    
    
}

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/
var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    var page = args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = createViewModel();
}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.loaded = loaded;
exports.onNavigatingTo = onNavigatingTo;
