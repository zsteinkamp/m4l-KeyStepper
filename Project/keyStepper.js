"use strict";
autowatch = 1;
inlets = 1;
outlets = 2;
var utils_1 = require("./utils");
var config = {
    outputLogs: true,
};
var log = (0, utils_1.logFactory)(config);
var OUTLET_NOTE = 0;
var OUTLET_VELO = 1;
setoutletassist(OUTLET_NOTE, "Note Number (0-127)");
setoutletassist(OUTLET_VELO, "Velocity (0-127)");
log("reloaded");
var heldNotes = [];
var watchers = {
    root: null,
    int: null,
    mode: null,
};
var state = {
    scale_root: 0,
    scale_intervals: [],
    scale_mode: 0,
    scale_name: "",
    scale_notes: [],
};
function updateScales() {
    if (!watchers.root) {
        //log("early");
        return;
    }
    var api = new LiveAPI(function () { }, "live_set");
    state.scale_root = api.get("root_note");
    state.scale_intervals = api.get("scale_intervals");
    state.scale_mode = api.get("scale_mode");
    state.scale_name = api.get("scale_name");
    state.scale_notes = [];
    var root_note = state.scale_root - 12;
    var note = root_note;
    while (note <= 127) {
        var useIntervalIdx = 0;
        var nextSemi = state.scale_intervals[useIntervalIdx + 1];
        for (var semi = 0; semi < 12; semi++) {
            if (semi >= nextSemi && useIntervalIdx < state.scale_intervals.length - 1) {
                useIntervalIdx += 1;
                nextSemi = state.scale_intervals[useIntervalIdx];
                if (nextSemi < semi) {
                    log("ERROR HERE DERP");
                }
            }
            var useSemi = state.scale_intervals[useIntervalIdx];
            note = root_note + useSemi;
            //log(
            //  "OUT " +
            //    JSON.stringify({ semi, useSemi, note, useIntervalIdx, len: state.scale_intervals.length })
            //);
            if (note >= 0 && note <= 127) {
                state.scale_notes.push(note);
            }
        }
        root_note += 12;
        note = root_note;
    }
    //log(
    //  "ROOT=" +
    //    state.scale_root +
    //    " INT=" +
    //    state.scale_intervals +
    //    " MODE=" +
    //    state.scale_mode +
    //    " NAME=" +
    //    state.scale_name +
    //    " AWARE=" +
    //    JSON.stringify(state.scale_notes)
    //);
}
function init() {
    watchers.root = new LiveAPI(updateScales, "live_set");
    watchers.root.property = "root_note";
    watchers.int = new LiveAPI(updateScales, "live_set");
    watchers.int.property = "scale_intervals";
    watchers.mode = new LiveAPI(updateScales, "live_set");
    watchers.mode.property = "scale_mode";
    updateScales();
}
function note(inNote, inVelo, _stepNum, stepNote, stepVelo, stepProb, absPitch, absVelo, scaleAware) {
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
        if (absVelo) {
            outVelo = stepVelo;
        }
        else {
            outVelo += stepVelo - 63;
        }
        if (stepProb / 100 < Math.random()) {
            outVelo = 0;
        }
    }
    outNote = Math.min(127, Math.max(0, outNote));
    if (scaleAware) {
        //log("SCALE NOTES " + state.scale_notes);
        //log("IN HERE " + outNote + " => " + state.scale_notes[outNote]);
        outNote = state.scale_notes[outNote];
    }
    outVelo = Math.min(127, Math.max(0, outVelo));
    outlet(OUTLET_VELO, outVelo);
    heldNotes[inNote] = outNote;
    outlet(OUTLET_NOTE, outNote);
}
// NOTE: This section must appear in any .ts file that is directuly used by a
// [js] or [jsui] object so that tsc generates valid JS for Max.
var module = {};
module.exports = {};
