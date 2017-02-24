var Observable = require("data/observable").Observable;
var imageSource = require('image-source');
var enums = require("ui/enums");
var frame = require("ui/frame");
var platform = require("platform");
var application = require('application');

var AppDelegate = UIResponder.extend({
    
    applicationDidFinishLaunchingWithOptions: function () {
        // Set the status bar to light content
        console.log('appDelegate');
        UIApplication.sharedApplication.statusBarStyle = 2;
        return true;
    }
}, 
{
name: "AppDelegate",
    protocols: [UIApplicationDelegate]
});
application.ios.delegate = AppDelegate;


// function getMessage(counter) {
//     if (counter <= 0) {
//         return "Damn, you're out of heaters.";
//         // this will change to a function that adds the red dots for each cheat
//     } else {
//         return counter; // take this out now?
//     }
// }


// navigationBar.barStyle = 2;

function createViewModel() {
    var viewModel = new Observable();
 
    console.log("create view model");

    if (platform.isIOS) {
        var navigationBar = frame.topmost().ios.controller.navigationBar;
        //navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
        frame.topmost().ios.navBarVisibility = enums.NavigationBarVisibility.never;
    } 

    
    viewModel.blueDotPath = "~/images/reserveDotBlue-38.png";
    viewModel.redDotPath = "~/images/reserveDotRed-38.png";
    viewModel.blackDotPath = "~/images/reserveDotBlack-38.png";
    viewModel.counter = 20;
    // set the initial message
    // viewModel.message = getMessage(viewModel.counter);

        viewModel.imgSrc20 = viewModel.blueDotPath;
        viewModel.imgSrc19 = viewModel.blueDotPath;
        viewModel.imgSrc18 = viewModel.blueDotPath;
        viewModel.imgSrc17 = viewModel.blueDotPath;
        viewModel.imgSrc16 = viewModel.blueDotPath;
        viewModel.imgSrc15 = viewModel.blueDotPath;
        viewModel.imgSrc14 = viewModel.blueDotPath;
        viewModel.imgSrc13 = viewModel.blueDotPath;
        viewModel.imgSrc12 = viewModel.blueDotPath;
        viewModel.imgSrc11 = viewModel.blueDotPath;
        viewModel.imgSrc10 = viewModel.blueDotPath;
        viewModel.imgSrc9 = viewModel.blueDotPath;
        viewModel.imgSrc8 = viewModel.blueDotPath;
        viewModel.imgSrc7 = viewModel.blueDotPath;
        viewModel.imgSrc6 = viewModel.blueDotPath;
        viewModel.imgSrc5 = viewModel.blueDotPath;
        viewModel.imgSrc4 = viewModel.blueDotPath;
        viewModel.imgSrc3 = viewModel.blueDotPath;
        viewModel.imgSrc2 = viewModel.blueDotPath;
        viewModel.imgSrc1 = viewModel.blueDotPath;
  

    // tap event
    viewModel.onTap = function() {

        if(this.counter > 0){
            // remove a blue dot
            this.set("imgSrc"+this.counter, this.blackDotPath);
            this.counter--;
        }else if(this.counter > -20){
            // add a red dot
            this.counter--;
            var num = Math.abs(this.counter);
            this.set("imgSrc"+num, this.redDotPath);
        }else{
            // reset the counter
            this.counter = 20;
            for(var i=0; i<=20; i++){
                this.set("imgSrc"+i, this.blueDotPath);
            }
        }

        
        // this.set("message", getMessage(this.counter));

        
        
        
    }

    return viewModel;
}

exports.createViewModel = createViewModel;
