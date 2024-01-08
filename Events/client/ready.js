const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
    name: "ready",
    once: true,
    execute(client){
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log(" 🟢 The client is ready");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━");

        loadCommands(client);
    }
} 