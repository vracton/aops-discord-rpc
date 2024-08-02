
const presence = new Presence({
	clientId: "1230749736617639966",
})

const browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://i.ibb.co/Xy1YLbf/aopslogo.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
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
			try {
				const xp = Number(document.querySelector(".alc-xp-bar > .alc--label").textContent)
				const lvlUpXp = Number(document.querySelector(".alc-small-stats").textContent.trim().split(" ")[0])
				const progress = Array.from(document.querySelectorAll('.aops-bar-int-caption')).find(e => e.textContent !== '').textContent
				presenceData.state = progress+"% to Next Level"
				presenceData.smallImageKey = (document.querySelector(".alc-level-emblem > img") as HTMLImageElement).src
				presenceData.smallImageText = "Level "+document.querySelector(".alc-level-emblem > span").textContent+" • "+xp+"/"+(lvlUpXp+xp)+" XP"
			} catch (e){console.log(e)}
		} else if (path[2]==null){
			presenceData.details = "Idling on the Menu"
		} else if (path[2]=="profile"){
			if (path[3]=="me"){
				presenceData.details = "Looking at My Profile"
				presenceData.buttons = [{
					label: "My Profile",
					url: document.location.href
				}]
			} else {
				try {
					presenceData.details = `Looking at ${document.querySelector(".aops-panel.alc-profile-main-panel > .alc-left.alc-one-line").textContent}'s Profile`
					presenceData.buttons = [{
						label: document.querySelector(".aops-panel.alc-profile-main-panel > .alc-left.alc-one-line").textContent+"'s Profile",
						url: document.location.href
					}]
				} catch (e){
					presenceData.details = "Looking at Someone's Profile"
					presenceData.buttons = [{
						label: "Profile",
						url: document.location.href
					}]
				}
			}
		} else if (path[2]=="report"){
			try {
				presenceData.details = `Looking at My ${document.querySelector(".aops-panel.alc-left.alc-report-progress-table > .alc-one-line").textContent.slice(12)} Stats`
			} catch (e){
				presenceData.details = "Looking at My Stats"
			}
			try {
				presenceData.state = `${Number(document.querySelectorAll(".alc-value.alc-right:not(.alc--bigger)")[3].textContent.trim().split("\t\t\t")[1])} Correct • ${Number(document.querySelector(".alc-value.alc-right:not(.alc--bigger)").textContent.trim().split("\t\t\t")[1])}% Accuracy`
			} catch (e) {}
		} else if (path[2]=="hall_of_fame"){
			//eventually add detection for the different leaderboards in future
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