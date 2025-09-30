// SETTINGS
// Change these variables to set up Sentry the way you want it.
let addons = ["Perks"] // List of activated addons.
// Current addons include:
// Perks, which adds the perks from Cube Warfare into your game.

let admins = ["MWigP_HpQcCa4yEs0oR30"] // List of server administrator DB IDs.
let mods = [] // List of server moderator DB IDs.

let blacklist = [] // List of blacklisted player DB IDs.
let whitelist = [] // List of whitelisted player DB IDs.
let useWhitelist = false // Boolean that determines if whitelist will be used over blacklist. False by default.

let muted = [] // List of muted DB IDs
let deafened = [] // List of deafened DB IDs.


// CONSTANT VARIABLES
// Do not mess with these.
const VALIDPERKS = ["Autoblock", "Healthup", "Hitem", "Goodaimer", "Sneky", "Healnow", "Airspring", "Blockbreaker", "Speedy"]
const VALIDPERKST1 = ["Autoblock", "Healthup", "Hitem", "Goodaimer"]
const VALIDPERKST2 = ["Sneky", "Healnow", "Airspring"]
const VALIDPERKST3 = ["Blockbreaker", "Autoblock", "Healthup", "Speedy"]

// INTERNAL VARIABLES
// Do not mess with these.
let tracker = {}
let lastUpdatedSec = 0
let lastUpdatedTenthsec = 0

// WORLD CODE
// Player Chatting: Does not allow muted players to send messages, or deafened players to receive messages.
function onPlayerChat(playerId, chatMessage, channelName) {
    for (const playerId2 of api.getPlayerIds()) {
    }
    return false
}

// Ticks: Every tick...
function tick(ms) {
    for (const playerId of api.getPlayerIds()) {
        // If the current second hasn't been updated, and it is divisible by 10...
        if (((Math.floor(api.now() / 1000) % 10) === 0) && (Math.floor(api.now() / 1000)) > lastUpdatedSec) {
            // Players with the Healnow perk will receive a healing steak
            if ((tracker[playerId].perks.includes("Healnow")) && !api.hasItem(playerId, "Steak") && !api.inventoryIsFull(playerId) && addons.includes("Perks")) {api.giveItem(playerId, "Steak", 1)}
            // Players with the Sneky perk will receive a coconut that makes them faster
            if ((tracker[playerId].perks.includes("Sneky")) && !api.hasItem(playerId, "Cracked Coconut") && !api.inventoryIsFull(playerId) && addons.includes("Perks")) {api.giveItem(playerId, "Cracked Coconut", 1)}
        }
        // If the current tenth of a second hasn't been updated, and it is divisible by 5...
        if (((Math.floor(api.now() / 50) % 10) === 0) && (Math.floor(api.now() / 100)) > lastUpdatedTenthsec) {
            // Players with the Autoblock perk will receive an AutoBlock
            if ((tracker[playerId].perks.includes("Autoblock")) && !api.inventoryIsFull(playerId) && addons.includes("Perks")) {api.giveItem(playerId, "Maple Leaves", 1, {customDisplayName: "AutoBlock"})}
        }
        // Track if the current second has already been updated
        if (((Math.floor(api.now() / 100) % 10) === 0) && (Math.floor(api.now() / 1000)) > lastUpdatedSec) {lastUpdatedSec = Math.floor(api.now() / 1000)}
        // Track if the current tenth of a second has already been updated
        if (((Math.floor(api.now() / 10) % 10) === 0) && (Math.floor(api.now() / 100)) > lastUpdatedTenthsec) {lastUpdatedTenthsec = Math.floor(api.now() / 100)}

        // Players with the Airspring perk will get the Double Jump effect
        if (tracker[playerId].perks.includes("Airspring") && addons.includes("Perks")) {api.applyEffect(playerId, "Double Jump", 1, {inbuiltLevel: 1})}
        // Players with the Speedy perk will get the Speed effect
        if (tracker[playerId].perks.includes("Speedy") && addons.includes("Perks")) {api.applyEffect(playerId, "Speed", 1, {inbuiltLevel: 1})}
        // Players with the Blockbreaker perk will get the Haste effect
        if (tracker[playerId].perks.includes("Blockbreaker") && addons.includes("Perks")) {api.applyEffect(playerId, "Haste", 1, {inbuiltLevel: 1})}
        // NEEDS FIX Players with the Healthup perk will get their health boosted
        if (tracker[playerId].perks.includes("Healthup") && addons.includes("Perks")) {api.setHealth(playerId, 130, undefined, true)}
    }
}

// PVP Damage: When players attack each other...
function onPlayerDamagingOtherPlayer(attackingPlayer, damagedPlayer, damageDealt, withItem, bodyPartHit, damagerDbId) {
    // If the damage is done using a gun, it gets boosted by Goodaimer and Hitem
	if (["AK-47", "M16", "M1911", "MP40", "TAR-21", "AWP", "Double Barrel", "Minigun", "One Shot Pistol"].includes(withItem)) {
		if ((bodyPartHit === "head") && tracker[attackingPlayer].perks.includes("Goodaimer") && addons.includes("Perks")) {damageDealt *= (4.6 / 3)}
		if (tracker[attackingPlayer].perks.includes("Hitem") && addons.includes("Perks")) {damageDealt *= 1.3}
	}
    // If the victim is overkilled, the overkill amount is subtracted from the damage
	if (api.getHealth(damagedPlayer) < 0) {damageDealt += api.getHealth(damagedPlayer)}
    // If the damage is negative, it gets set to 0
	if (damageDealt < 0) {damageDealt = 0}
    // The attacker gets Points based on the damage dealt
	tracker[attackingPlayer].points += damageDealt
    // The victim takes damage
	return damageDealt
}

// Player Join: Players have their points and perks logged in the tracker upon joining the game.
function onPlayerJoin(playerId, fromGameReset) {
    tracker[playerId] = {points: 0, perks: []}
    if (!api.getMoonstoneChestItemSlot(playerId, 0)) {api.setMoonstoneChestItemSlot(playerId, 0, "Gold Coin", 1, {customDisplayName: "0", customDescription: "You have 0 gold."})}
    if (!api.getMoonstoneChestItemSlot(playerId, 1)) {api.setMoonstoneChestItemSlot(playerId, 1, "Diamond", 1, {customDisplayName: "0", customDescription: "You have 0 gems."})}
    if (!api.getMoonstoneChestItemSlot(playerId, 2)) {api.setMoonstoneChestItemSlot(playerId, 2, "Updraft", 1, {customDisplayName: "None", customDescription: "No Tier 1 perk selected."})}
    if (!api.getMoonstoneChestItemSlot(playerId, 3)) {api.setMoonstoneChestItemSlot(playerId, 3, "Updraft", 1, {customDisplayName: "None", customDescription: "No Tier 2 perk selected."})}
    if (!api.getMoonstoneChestItemSlot(playerId, 4)) {api.setMoonstoneChestItemSlot(playerId, 4, "Updraft", 1, {customDisplayName: "None", customDescription: "No Tier 3 perk selected."})}
}

// Player Leave: Players have their points and perks wiped from the tracker upon leaving the game.
function onPlayerLeave(playerId, serverIsShuttingDown) {
    tracker[playerId] = undefined
}

// Commands: Various commands are added, such as...
function playerCommand(playerId, command) {
    args = command.split(" ")
    command = args.splice(0, 1)[0]
    // /help: Would display a help message. Currently not available.
    if (command === "help") {
        api.sendMessage(playerId, "Unfortunately, Help is not yet completed as a command. Check back soon.", {color: "blue"})
    // /ping: Allows players to ping others.
    } else if (command === "ping") {
        api.sendMessage(api.getPlayerId(args[0]), "You have been pinged by player " + api.getEntityName(playerId) + "!", {color: "red"})
        api.sendMessage(playerId, "Successfully pinged player " + args[0] + ".", {color: "blue"})
    } else if (command === "getDbId") {
        api.sendMessage(playerId, "Your Bloxd database ID is " + api.getPlayerDbId(playerId) + ". As of yet, there is no harm in sharing database IDs.", {color: "blue"})
    // /perkT1, /perkT2, /perkT3: Only works with the Perks addon. Allows players to select their Perks for each of the 3 tiers. 
    } else if (command === "perkT1") {
        args[0] = args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase()
        if (VALIDPERKST1.includes(args[0]) && (addons.includes("Perks"))) {
            api.setMoonstoneChestItemSlot(playerId, 2, "Updraft", 1, {customDisplayName: args[0], customDescription: "Selected " + args[0] + " as your Tier 1 perk."})
            api.sendMessage(playerId, "You have selected " + args[0] + " as your Tier 1 perk.", {color: "blue"})
        } else if (VALIDPERKS.includes(args[0]) && (addons.includes("Perks"))) {
            api.sendMessage(playerId, "Error: " + args[0] + " is not a valid perk for Tier 1.", {color: "red"})
        } else if (addons.includes("Perks")) {
            api.sendMessage(playerId, "Error: " + args[0] + " is not a valid perk.", {color: "red"})
        } else {
            api.sendMessage(playerId, "System error: the Perks addon is not enabled. Please contact an administrator.", {color: "red"})
        }
    } else if (command === "perkT2") {
        args[0] = args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase()
        if (VALIDPERKST2.includes(args[0]) && (addons.includes("Perks"))) {
            api.setMoonstoneChestItemSlot(playerId, 3, "Updraft", 1, {customDisplayName: args[0], customDescription: "Selected " + args[0] + " as your Tier 2 perk."})
            api.sendMessage(playerId, "You have selected " + args[0] + " as your Tier 2 perk.", {color: "blue"})
        } else if (VALIDPERKS.includes(args[0]) && (addons.includes("Perks"))) {
            api.sendMessage(playerId, "Error: " + args[0] + " is not a valid perk for Tier 2.", {color: "red"})
        } else if (addons.includes("Perks")) {
            api.sendMessage(playerId, "Error: " + args[0] + " is not a valid perk.", {color: "red"})
        } else {
            api.sendMessage(playerId, "System error: the Perks addon is not enabled. Please contact an administrator.", {color: "red"})
        }
    } else if (command === "perkT3") {
        args[0] = args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase()
        if (VALIDPERKST3.includes(args[0]) && (addons.includes("Perks"))) {
            api.setMoonstoneChestItemSlot(playerId, 4, "Updraft", 1, {customDisplayName: args[0], customDescription: "Selected " + args[0] + " as your Tier 3 perk."})
            api.sendMessage(playerId, "You have selected " + args[0] + " as your Tier 3 perk.", {color: "blue"})
        } else if (VALIDPERKS.includes(args[0]) && (addons.includes("Perks"))) {
            api.sendMessage(playerId, "Error: " + args[0] + " is not a valid perk for Tier 3.", {color: "red"})
        } else if (addons.includes("Perks")) {
            api.sendMessage(playerId, "Error: " + args[0] + " is not a valid perk.", {color: "red"})
        } else {
            api.sendMessage(playerId, "System error: the Perks addon is not enabled. Please contact an administrator.", {color: "red"})
        }
    // /changeInternalValue: Mod-only command. Allows mods to change player point, gold & gem values, as well as give and take away Perks.
    } else if (command === "changeInternalValue" && (admins + mods).includes(api.getPlayerDbId(playerId))) {
        if (args[0] === "points") {
            tracker[api.getPlayerId(args[2])].points += parseInt(args[1])
        } else if (args[0] === "gold") {
            api.setMoonstoneChestItemSlot(api.getPlayerId(args[2]), 0, "Gold Coin", 1, {customDisplayName: String(parseInt(api.getMoonstoneChestItemSlot(playerId, 0).attributes.customDisplayName) + parseInt(args[1])), customDescription: "You have " + String(parseInt(api.getMoonstoneChestItemSlot(playerId, 0).attributes.customDisplayName) + parseInt(args[1])) + " gold."})
        } else if (args[0] === "gems") {
            api.setMoonstoneChestItemSlot(api.getPlayerId(args[2]), 0, "Diamond", 1, {customDisplayName: String(parseInt(api.getMoonstoneChestItemSlot(playerId, 1).attributes.customDisplayName) + parseInt(args[1])), customDescription: "You have " + String(parseInt(api.getMoonstoneChestItemSlot(playerId, 1).attributes.customDisplayName) + parseInt(args[1])) + " gems."})
        } else if ((args[0] === "perk") && addons.includes("Perks")) {
            tracker[api.getPlayerId(args[2])].perks.push(args[1])
        } else if (args[0] === "perk") {
            api.sendMessage(playerId, "System error: the Perks addon is not enabled. Please contact an administrator.", {color: "red"})
        }
    } else if (command === "changeInternalValue") {
        api.sendMessage(playerId, "Error: Permissions level is not high enough. Please contact a moderator or administrator", {color: "red"})
    } else {
        return false
    }
    return true
}

api.log("World code is live!")
