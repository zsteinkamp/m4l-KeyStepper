# m4l-KeyStepper
## A manually-advanced variable-length step sequencer.

![KeyStepper](images/KeyStepper.gif)

This is a Max For Live step sequencer that advances on note-on events and supports loop lengths of 1 to 32 steps. This gives you the ability to easily create polyrhythms and interesting time-shifting variations. Each step can hold a pitch (relative or absolute), velocity, and note probability. This allows you to really go hog on generative music.

### Changelog

Direct download links below.
* [DOWNLOAD v3](https://github.com/zsteinkamp/m4l-KeyStepper/raw/main/frozen/KeyStepper-v3.amxd) - 2024-02-05 - Fixed problem with multiple instances in one set. Thanks @Michaelknubben!
* [v2](https://github.com/zsteinkamp/m4l-KeyStepper/raw/main/frozen/KeyStepper-v2.amxd) - 2023-10-21 - Fixed undo buffer pollution bug. Rookie move.
* [v1](https://github.com/zsteinkamp/m4l-KeyStepper/raw/main/frozen/KeyStepper-v1.amxd) - 2023-09-09 - Initial release.

## Installation / Setup

If you just want to download and install the device, then go to the [frozen/](https://github.com/zsteinkamp/m4l-KeyStepper/tree/main/frozen) directory and download the newest .zip file there. You can also download it directly via the links in [*Changelog*](#changelog).

## Usage

Add the device to an instrument or MIDI track. Each note you send to the KeyStepper will advance its step.

### Steps
Use the `Steps` dial to control the number of steps in your pattern.

### Reset
Press the `Reset` button to return to the first step in the pattern.

### Pitch Mode
You can toggle between `Relative` and `Absolute` pitch mode. In `Relative` mode, the incoming note is shifted by the distance that the step's note is from middle C. In `Absolute` mode, the note that is emitted is the step's note.

### Note Velocity
The velocity slider in the device controls how much to shift the velocity of the
outgoing note, positive or negative. With the velocity sliders in the middle of
their travel, the incoming velocity will not be affected.

### Note Probability
Each step in the pattern can have a probability of playing a note. This allows you to create ever-different patterns that still have a structure. Set the probability to zero to disable a step entirely.

## Common Problems

#### ...
...

## TODOs
* ...

