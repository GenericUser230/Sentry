// SETTINGS
// Change these variables to set up Sentry the way you want it.
let addons = [] // List of activated addons.
// Current addons include:
// Perks, which adds the perks from Cube Warfare into your game.

let admins = [] // List of server administrator DB IDs.
let mods = [] // List of server moderator DB IDs.

let blacklist = [] // List of blacklisted player DB IDs.
let whitelist = [] // List of whitelisted player DB IDs.
let useWhitelist = false // Boolean that determines if whitelist will be used over blacklist. False by default.

let muted = [] // List of muted DB IDs
let deafened = [] // List of deafned DB IDs.


// CONSTANT VARIABLES
// Do not mess with these.
const VALIDPERKS = []
const VALIDPERKST1 = []
const VALIDPERKST2 = []
const VALIDPERKST3 = []

// INTERNAL VARIABLES
// Do not mess with these.
let tracker = {}
let lastUpdatedSec = 0
let lastUpdatedTenthsec = 0

// Player Chatting: Does not allow muted players to send messages, or deafened players to receive messages.
function onPlayerChat(playerId, chatMessage, channelName) {
    for (const playerId2 of api.getPlayerIds()) {
    }
    return false
}

// Ticks: Every tick, a lot of things happen.
function tick(ms) {
    for (const playerId of api.getPlayerIds()) {
        if (((Math.floor(api.now() / 1000) % 10) === 0) && (Math.floor(api.now() / 1000)) > lastUpdatedSec) {
            // Players with the Healnow perk will receive a healing steak
            if ((tracker[playerId].upgrades.includes("Healnow")) && !api.hasItem(playerId, "Steak") && !api.inventoryIsFull(playerId)) {api.giveItem(playerId, "Steak", 1)}
            if ((tracker[playerId].upgrades.includes("Sneky")) && !api.hasItem(playerId, "Cracked Coconut") && !api.inventoryIsFull(playerId)) {api.giveItem(playerId, "Cracked Coconut", 1)}
        }
        if (((Math.floor(api.now() / 50) % 10) === 0) && (Math.floor(api.now() / 100)) > lastUpdatedTenthsec) {
            if ((tracker[playerId].upgrades.includes("Autoblock") && !api.inventoryIsFull(playerId) {api.giveItem(playerId, "Maple Leaves", 1, {customAttributes: {customDisplayName: "Auto Block"}})}
        }
        // Track if the current second has already been updated
        if (((Math.floor(api.now() / 100) % 10) === 0) && (Math.floor(api.now() / 1000)) > lastUpdatedSec)) {lastUpdatedSec = Math.floor(api.now() / 1000)}
        // Track if the current tenth of a second has already been updated
        if (((Math.floor(api.now() / 10) % 10) === 0) && (Math.floor(api.now() / 100)) > lastUpdatedTenthsec)) {lastUpdatedTenthsec = Math.floor(api.now() / 100)}

        
    }
}

function onPlayerJoin(playerId, fromGameReset) {
    tracker[playerId].points = 0
    tracker[playerId].perks = []
}

function onPlayerLeave(playerId, serverIsShuttingDown) {
    tracker[playerId].points = undefined
    tracker[playerId].perks = undefined
}

function playerCommand(playerId, command) {
    args = command.split(" ")
    command = args.splice(0, 1)
    if (command === "help") {
        api.sendMessage(playerId, "Unfortunately, Help is not yet completed as a command. Check back soon.", {color: "blue"})
    } else if (command === "ping") {
        api.sendMessage(args[0], "You have been pinged by player " + playerId + "!", {color: "red"})
        api.sendMessage(playerId, "Successfully pinged player " + args[0] + ".", {color: "blue"})
    } else if (command === "perkT1") {
        args[0] = args[0].charAt(0).toUpper() + args[0].slice(1).toLower()
        if (VALIDPERKST1.includes(args[0]) && (addons.includes("Perks"))) {
            api.setMoonstoneChestItemSlot(playerId, 2, "Updraft", 1, {customAttributes: {customDisplayName: args[0], customDescription: "Selected " + args[0] + " as your Tier 1 perk."}})
            api.sendMessage(playerId, "You have selected " + args[0] + " as your Tier 1 perk.", {color: "blue"})
        } else if (VALIDPERKS.includes(args[0]) && (addons.includes("Perks"))) {
            api.sendMessage(playerId, "Error: " + args[0] + " is not a valid perk for Tier 1.", {color: "red"})
        } else if (addons.includes("Perks")) {
            api.sendMessage(playerId, "Error: " + args[0] + " is not a valid perk.", {color: "red"})
        } else {
            api.sendMessage(playerId, "System error: the Perks addon is not enabled. Please contact an administrator.", {color: "red"})
        }
    } else if (command === "perkT2") {
        args[0] = args[0].charAt(0).toUpper() + args[0].slice(1).toLower()
        if (VALIDPERKST2.includes(args[0]) && (addons.includes("Perks"))) {
            api.setMoonstoneChestItemSlot(playerId, 3, "Updraft", 1, {customAttributes: {customDisplayName: args[0], customDescription: "Selected " + args[0] + " as your Tier 2 perk."}})
            api.sendMessage(playerId, "You have selected " + args[0] + " as your Tier 2 perk.", {color: "blue"})
        } else if (VALIDPERKS.includes(args[0]) && (addons.includes("Perks"))) {
            api.sendMessage(playerId, "Error: " + args[0] + " is not a valid perk for Tier 2.", {color: "red"})
        } else if (addons.includes("Perks")) {
            api.sendMessage(playerId, "Error: " + args[0] + " is not a valid perk.", {color: "red"})
        } else {
            api.sendMessage(playerId, "System error: the Perks addon is not enabled. Please contact an administrator.", {color: "red"})
        }
    } else if (command === "perkT3") {
        args[0] = args[0].charAt(0).toUpper() + args[0].slice(1).toLower()
        if (VALIDPERKST3.includes(args[0]) && (addons.includes("Perks"))) {
            api.setMoonstoneChestItemSlot(playerId, 4, "Updraft", 1, {customAttributes: {customDisplayName: args[0], customDescription: "Selected " + args[0] + " as your Tier 3 perk."}})
            api.sendMessage(playerId, "You have selected " + args[0] + " as your Tier 3 perk.", {color: "blue"})
        } else if (VALIDPERKS.includes(args[0]) && (addons.includes("Perks"))) {
            api.sendMessage(playerId, "Error: " + args[0] + " is not a valid perk for Tier 3.", {color: "red"})
        } else if (addons.includes("Perks")) {
            api.sendMessage(playerId, "Error: " + args[0] + " is not a valid perk.", {color: "red"})
        } else {
            api.sendMessage(playerId, "System error: the Perks addon is not enabled. Please contact an administrator.", {color: "red"})
        }
    } else if (command === "changeInternalValue" && ) {
        if (args[0] === "points") {
            tracker[playerId].points += ParseInt(args[1])
        } else if (args[0] === "gold") {
            api.setMoonstoneChestItemSlot(playerId, 0, "Gold Coin", 1, {customAttributes: {customDisplayName: ParseInt(api.getMoonstoneChestItemSlot(playerId, 0).customAttributes.customDisplayName) + ParseInt(args[1]), customDescription: "You have " + args[1] + " gold."}})
        } else if (args[0] === "gems") {
            api.setMoonstoneChestItemSlot(playerId, 0, "Diamond", 1, {customAttributes: {customDisplayName: ParseInt(api.getMoonstoneChestItemSlot(playerId, 0).customAttributes.customDisplayName) + ParseInt(args[1]), customDescription: "You have " + args[1] + " gems."}})
        } else if ((args[0] === "perk") && (addons.includes("Perks") {
            tracker[playerId].upgrades.push(args[1])
        } else if (args[0] === "perk") {
            api.sendMessage(playerId, "System error: the Perks addon is not enabled. Please contact an administrator.", {color: "red"})
        }
    } else {
        return false
    }
    return true
}
