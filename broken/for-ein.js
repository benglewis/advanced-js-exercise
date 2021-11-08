const potion = {
    magic: "spell"
}

const cast = (obj) => {
    console.time("wizzardry")
    for (const something of obj) {
        console.log("Cast the ${something} ${obj[something]}")
    }
    console.timeEnd("wizzardry")
}

cast(potion)
// Should write "Cast the magic spell"
// followed by "wizzardry: time" 
// where time is the time that the wizzardry took