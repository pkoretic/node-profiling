/* a simple script that runs a v8-profiler for n seconds and the shuts down whole process
 * can be easily adapted to run multiple times */

const fs = require("fs")
const profiler = require("v8-profiler")

module.exports = function ()
{
    setTimeout(startProfiling, 5000)
}

/**
 * Starts profiling and schedules its end
 *
 * @returns {void}
 */
function startProfiling()
{
    const id = Date.now() + ".profile"

    // start profiling
    profiler.startProfiling(id)

    // stop profiling in n seconds and exit
    setTimeout(() =>
    {
        const profile = JSON.stringify(profiler.stopProfiling(id))

        fs.writeFile(`${__dirname}/${id}`, profile, () =>
        {
            console.log("profiling done, written to:", id)
            process.exit()
        })
    }, process.env.PROFILE_TIMEOUT || 15000)
}
