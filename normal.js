let addons = [] // List of activated addons.
// Current addons include: Perks, which adds the perks from Cube Warfare into your game.

let admins = [] // List of server administrator DB IDs.
let mods = [] // List of server moderator DB IDs.
let blacklist = [] // List of blacklisted player DB IDs.

let whitelist = [] // List of whitelisted player DB IDs.
let useWhitelist = false // Boolean that determines if whitelist will be used over blacklist. False by default.

const VALIDPERKS = []

function onPlayerChat(playerId, chatMessage, channelName) {
    for (const playerId2 of api.getPlayerIds()) {
        
    }
    return false
}

function playerCommand(playerId, command) {
    args = command.split(" ")
    command = args.splice(0, 1)
    if (command === "help") {api.sendMessage(playerId, "Unfortunately, Help is not yet completed as a command. Check back soon.", {color: "blue"})}
    if (command === "ping") {
        api.sendMessage(args[0], "You have been pinged by player " + playerId + "!", {color: "red"})
        api.sendMessage(playerId, "Successfully pinged player " + args[0] + ".", {color: "blue"})
    }
    if ((command === "perk1") && (addons.includes("Perks"))) {
        if (VALIDPERKS.includes(args[0])) {
            api.setMoonstoneChestItemSlot(playerId, 2, "Updraft", 1, {customAttributes: {customDisplayName: args[0], customDescription: "Selected " + args[0] + " as your Tier 1 perk."}})
            api.sendMessage(playerId, "You have selected " + args[0] + " as your Tier 1 perk.", {color: "blue"})
        }
    }
    if ((command === "perk2") && (addons.includes("Perks"))) {
        if (VALIDPERKS.includes(args[0])) {
            api.setMoonstoneChestItemSlot(playerId, 3, "Updraft", 1, {customAttributes: {customDisplayName: args[0], customDescription: "Selected " + args[0] + " as your Tier 2 perk."}})
            api.sendMessage(playerId, "You have selected " + args[0] + " as your Tier 2 perk.", {color: "blue"})
        }
    }
    if ((command === "perk3") && (addons.includes("Perks"))) {
        if (VALIDPERKS.includes(args[0])) {
            api.setMoonstoneChestItemSlot(playerId, 4, "Updraft", 1, {customAttributes: {customDisplayName: args[0], customDescription: "Selected " + args[0] + " as your Tier 3 perk."}})
            api.sendMessage(playerId, "You have selected " + args[0] + " as your Tier 3 perk.", {color: "blue"})
        }
    }
    if ((command === "changeInternalValue")) {
        if (VALIDPERKS.includes(args[0])) {
            api.setMoonstoneChestItemSlot(playerId, 4, "Updraft", 1, {customAttributes: {customDisplayName: args[0], customDescription: "Selected " + args[0] + " as your Tier 3 perk."}})
            api.sendMessage(playerId, "You have selected " + args[0] + " as your Tier 3 perk.", {color: "blue"})
        }
    }
    return false
}
