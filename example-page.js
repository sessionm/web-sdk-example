// Visit the developer portal at https://developer.sessionm.com/get_started
// to get your app ID as well as setup actions and achievements

// Fill in the variables below with values from the developer portal
var SM_APP_ID = ""; // Your appID
var YOUR_STANDARD_ACTION = ""; // Your action for standard achievement that fades in from top
var YOUR_CUSTOM_ACTION = ""; // Your action for achievement with custom presentation


// === Widget Initialization ===

// Button widget on navigation bar
var navBarButtonWidget = new sessionm.widget({ appID : SM_APP_ID,
                                               style : "button" });
navBarButtonWidget.embed("nav_bar_button_widget_container", console.log("Initialized nav bar button widget"));

// Box widget on navigation bar
var navBarBoxWidget = new sessionm.widget({ appID : SM_APP_ID,
                                            style : "box" });
navBarBoxWidget.embed("nav_bar_box_widget_container", console.log("Initialized nav bar box widget"));

// Bar widget fixed to bottom of screen
var barWidget = new sessionm.widget({ appID : SM_APP_ID,
                                      style : "bar" });
barWidget.embed("bar_widget_container", console.log("Initialized bar widget"));

// Custom widget used to send achievement actions and display custom achievements
var achievementWidget = new sessionm.widget({ appID : SM_APP_ID,
                                              style : "custom" });
achievementWidget.embed("achievement_widget_container", console.log("Initialized achievement widget"));

// Present welcome modal and add the userUpdated event listener
presentWelcomeModal();
sessionm.addEventListener("userUpdated", function(user) { updateAchievementCount(); });


// === Function Definitions ===

// Presents the welcome modal
function presentWelcomeModal() {
  document.getElementById("present_modal_btn").click();
}

// Closes the welcome modal
function closeWelcomeModal() {
  document.getElementById("close_modal_btn").click();
}

// Sends an action for a standard achievement
function sendStandardAction() {
  achievementWidget.sendAction(YOUR_STANDARD_ACTION, {
    alertStyle : "topFadeIn",
    throttleByUrlUniqueness : false, // This is set to false for easier testing (setting to true prevents
                                     // the achievement from being earned by reloading the page)
    callback : function(action, earned, achievement) {
      console.log("Sent standard action");
      if (earned) {
        console.log("Earned standard achievement");
      }
    }
  });
}

// Sends an action for a custom achievement
function sendCustomAction() {
  achievementWidget.sendAction(YOUR_CUSTOM_ACTION, {
    alertStyle : "custom",
    throttleByUrlUniqueness : false, // This is set to false for easier testing (setting to true prevents
                                     // the achievement from being earned by reloading the page)
    callback : function(action, earned, achievement) {
      console.log("Sent custom action");
      // Displays the achievement widget if an achievement is earned
      if (earned) {
        console.log("Earned custom achievement");
        var achievementWidgetContainer = document.getElementById("achievement_widget_container");
        achievementWidgetContainer.style.display = "block";
        document.getElementById("achievement_name").innerHTML = achievement.getName();
        document.getElementById("achievement_message").innerHTML = achievement.getMessage();
        document.getElementById("achievement_point_value").innerHTML = achievement.getPointValue() + " points";
      }
    }
  });
}

// Claims a custom achievement and hides the achievement widget
function claimCustomAchievement() {
  console.log("Claimed achievement");
  var achievementWidgetContainer = document.getElementById("achievement_widget_container");
  achievementWidgetContainer.style.display = "none";    
  achievementWidget.openPortal();
}

// Opens the rewards portal
function openPortal() {
  sessionm.openPortal();
}

// Updates the achievement count for the rewards badge in the drop down menu
function updateAchievementCount() {
  document.getElementById("achievementCount").innerHTML = String(sessionm.getUser().getUnclaimedAchievementCount() || 0);
}
