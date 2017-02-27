/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
var view = require("ui/core/view");
var stackModule = require("ui/layouts/stack-layout");
var gestures = require("ui/gestures");
var absoluteLayout = require("ui/layouts/absolute-layout");

function loaded(args){
    var page = args.object;
    var myPack = page.getViewById("packBG");
    var mainLayout = page.getViewById('mainLayout');

    var touchStart;
    var touchEnd;

    var packTop;

    mainLayout.on(gestures.GestureTypes.pan, function (args) {

        // *********************************************
        //  Just got this to work so the pack wont jump 
        //  to the bottom when you touch it
        // *********************************************
        
        var touchY = args.deltaY;

        if(args.state === 1){
            // this is the 'began' state
            console.log('BEGAN');
            // get the current location
            packTop = absoluteLayout.AbsoluteLayout.getTop(myPack);
        }

        if(args.state === 2){
            // this is the 'changed' state
            console.log('CHANGED');

            var newTop = packTop + touchY;
            absoluteLayout.AbsoluteLayout.setTop(myPack, newTop);
        }

        if(args.state === 3){
            // this is the 'ended' state
            console.log('ENDED');
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
