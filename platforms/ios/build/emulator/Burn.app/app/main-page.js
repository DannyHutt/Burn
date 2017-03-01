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
var animation = require('ui/animation');
var label = require('ui/label');

function loaded(args){

    var page = args.object;
    
    var myPack = page.getViewById("packBG");
    var cig = page.getViewById("cig");
    var packFront = page.getViewById('packFront');
    var mainLayout = page.getViewById('mainLayout');

    // Debug labels
    var lblStartPos = page.getViewById('lblStartPosition');
    var lblDragDir = page.getViewById('lblDragDirection');
    var lblDragDist = page.getViewById('lblDragDistance');
    var lblThresholdBroken = page.getViewById('lblThresholdBroken');
    var lblAnimateTo = page.getViewById('lblAnimateTo');
    
    var topMin = 100;
    var topMax = 494;
    var centerVal = (topMax + topMin) / 2;
    var dragThreshold = 50;

    var startPosition = 'bottom';
    var packTop;
    //var dragTravel;

    mainLayout.on(gestures.GestureTypes.pan, function (args) {

        /* ******************************************************************

         This can be broken in some edge cases and should be fixed.

        ******************************************************************** */

        var touchY = args.deltaY;

        if(args.state === 1){
            // this is the 'began' state
            console.log('Pan state: began');
            // get the current location
            buttTop = absoluteLayout.AbsoluteLayout.getTop(cig);
            //dragTravel = 0;

            // if(packTop === topMin){
            //     startPosition = 'top';
            // }else if(packTop === topMax){
            //     startPosition = 'bottom';
            // }else{
            //     startPosition = '! top is at '+packTop;
            //     /*
            //     we keep falling into this after the first drag, need to save a variable for resting location
            //     using the exact location isnt really working.
            //     */
            // }

            // debug labels
            lblStartPos.text='Start Position: '+ startPosition;
        }


        if(args.state === 2){

            //dragTravel++;

            var newTop = buttTop + touchY;
            //var cigTop = newTop + 69;

            var curLoc = absoluteLayout.AbsoluteLayout.getTop(cig);
            var travelDist = curLoc - buttTop;
            var travelDir = travelDist>0?'down':'up';

            // debug labels
            lblDragDir.text='Drag Direction: '+ travelDir;
            lblDragDist.text='Drag Distance: '+ travelDist;

            //absoluteLayout.AbsoluteLayout.setTop(myPack, newTop);
            if(newTop <= topMax && newTop >= topMin){
                absoluteLayout.AbsoluteLayout.setTop(cig, newTop);
                //absoluteLayout.AbsoluteLayout.setTop(cig, cigTop);
                //absoluteLayout.AbsoluteLayout.setTop(packFront, newTop); 
            } 
            
            // if(travelDir === 'up'){
            //     // move the butt only 
            //     absoluteLayout.AbsoluteLayout.setTop(cig, cigTop);
            // }
        }


        if(args.state === 3){
            // this is the 'ended' state

            console.log('Pan state: ended');

            var curLoc = absoluteLayout.AbsoluteLayout.getTop(cig);
            // if the current location is not the min or the max then animate to one of them
            if(curLoc !== topMin && curLoc !== topMax){
                
                if(curLoc > centerVal){ // this does not work.. if at bottom going up and not going past center it animates up.
                //if(dragTravel > dragThreshold){

                    // debug labels
                    var boolVal = startPosition === 'top'?'yes':'no';
                    lblThresholdBroken.text='Threshold Broken: '+boolVal+' - curLoc: '+curLoc+' centerVal: '+centerVal;
                    lblAnimateTo.text='Animate To: bottom';

                    // animate to max
                    var distance = topMax - curLoc;  
                    console.log('distance: ',distance);
                    var animationArray = [
                        {target: cig, translate: {x: 0, y: distance}, curve: enums.AnimationCurve.easeOut},
                        {target: myPack, translate: {x: 0, y: 0},curve: enums.AnimationCurve.easeOut},
                        {target: packFront, translate: {x: 0, y: 0}, curve: enums.AnimationCurve.easeOut}
                    ];
                    var animations = new animation.Animation(animationArray);
                    animations.play();
                    startPosition = 'bottom';
                }else{

                    // debug labels
                    var boolVal = startPosition === 'bottom'?'yes':'no';
                    lblThresholdBroken.text='Threshold Broken: '+boolVal+' - curLoc: '+curLoc+' centerVal: '+centerVal;
                    lblAnimateTo.text='Animate To: top';

                    // animate to min 
                    var distance = topMin - curLoc;  
                    var animationArray = [
                        {target: cig, translate: {x: 0, y: distance}, curve: enums.AnimationCurve.easeOut},
                        {target: myPack, translate: {x: 0, y: 500},curve: enums.AnimationCurve.easeIn},
                        {target: packFront, translate: {x: 0, y: 500}, curve: enums.AnimationCurve.easeIn}
                    ];
                    var animations = new animation.Animation(animationArray);
                    animations.play();
                    startPosition = 'top';
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
