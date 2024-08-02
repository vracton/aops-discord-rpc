const presence = new Presence({
	clientId: "1230749736617639966",
})
const browsingTimestamp = Math.floor(Date.now() / 1000);


presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		startTimestamp: browsingTimestamp
	};

	const path = document.location.pathname.split("/")

	//alcumus
	if (path[1]=="alcumus"){
		if (path[2]=="problem"){
			try {
				presenceData.details = document.querySelector(".alc-subject-progress > h1").textContent + " • "+ document.querySelector(".alc-focus-panel > .alc-one-line").textContent.slice(10)
			} catch (e){
				presenceData.details = "Solving Problems"
			}
		} else if (path[2]==null){
			presenceData.details = "Idling on the Menu"
		} else if (path[2]=="profile"){
			if (path[3]=="me"){
				presenceData.details = "Looking at My Profile"
			}
		} else if (path[2]=="report"){
			presenceData.details = "Looking at My Stats"
		} else if (path[2]=="hall_of_fame"){
			//add detection for the different leaderboards in future
			presenceData.details = "Gazing at the Hall of Fame"
		} else if (path[2]=="help"){
			presenceData.details = "Looking for Some Help"
		} else if (path[2]=="settings"){
			presenceData.details = "Tweaking my Settings"
		} else {
			presenceData.details = "Lost in the Alcumus Backrooms"
		}
	}
	presence.setActivity()
	if (presenceData.details){
		presence.setActivity(presenceData)
	} else {
		console.log("none found")
	}
});