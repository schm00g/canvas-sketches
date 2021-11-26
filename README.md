# canvas-sketches

This repo uses [canvas-sketch](https://github.com/mattdesl/canvas-sketch/) toolset

## To run sketches

On command line simply run:

```sh
canvas-sketch sketch-01.js
```

For hot reloading:

```sh
canvas-sketch sketch-01.js --hot
```

## To export sketches as GIFs

```sh
# Save animations to MP4 file
canvas-sketch animation.js --output=tmp --stream

# Save animations to GIF file instead
canvas-sketch animation.js --output=tmp --stream=gif

# Save animations to GIF but scale it down to 512 px wide
canvas-sketch animation.js --output=tmp --stream [ gif --scale=512:-1 ]
```

Once animation is running in the browser hit `Cmd + Shift + S` or `Ctrl + Shift + S` to export file.