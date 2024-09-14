"use strict";
autowatch = 1;
outlets = 2;
var utils_1 = require("./utils");
var config = {
    outputLogs: false
};
var log = (0, utils_1.logFactory)(config);
var OUTLET_NOTE = 0;
var OUTLET_VELO = 1;
setoutletassist(OUTLET_NOTE, 'Note Number (0-127)');
setoutletassist(OUTLET_VELO, 'Velocity (0-127)');
log('reloaded');
var heldNotes = [];
function note(inNote, inVelo, _stepNum, stepNote, stepVelo, stepProb, absPitch) {
    var outNote = inNote;
    var outVelo = inVelo;
    //log('note ' + JSON.stringify([inNote, inVelo, _stepNum, stepNote, stepVelo, stepProb, absPitch]));
    if (absPitch) {
        outNote = stepNote;
    }
    else {
        outNote += stepNote - 60;
    }
    // Ensure we don't have lingering notes
    if (heldNotes[inNote]) {
        outlet(OUTLET_VELO, 0);
        outlet(OUTLET_NOTE, heldNotes[inNote]);
        heldNotes[inNote] = null;
    }
    if (inVelo > 0) {
        outVelo += stepVelo - 63;
        if (stepProb / 100 < Math.random()) {
            outVelo = 0;
        }
        heldNotes[inNote] = outNote;
    }
    outNote = Math.min(127, Math.max(0, outNote));
    outVelo = Math.min(127, Math.max(0, outVelo));
    outlet(OUTLET_VELO, outVelo);
    outlet(OUTLET_NOTE, outNote);
}
// NOTE: This section must appear in any .ts file that is directuly used by a
// [js] or [jsui] object so that tsc generates valid JS for Max.
var module = {};
module.exports = {};
