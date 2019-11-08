
import Webgl from './WebglProgram'
const canvas = <HTMLCanvasElement>document.getElementById('lsiten-app')

const ctx = canvas.getContext('2d');
ctx.textAlign = 'center';
ctx.fillStyle = '#000';
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.fillStyle = '#fff';
ctx.fillText("Loading...", canvas.width/2, canvas.height/2);

let img = new Image();
img.crossOrigin = "anonymous";
img.src = 'http://5b0988e595225.cdn.sohucs.com/images/20190525/6eb123e0f5b544fe8f6c04e91959f0d6.jpeg';
// img.src = '/static/ry.jpg';

let gl:Webgl

try {
  gl = new Webgl({})
} catch( err ) {
  console.log(err)
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.fillText("This browser doesn't support WebGL", canvas.width/2, canvas.height/2)
}
img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  // gl.addShader({
  //   name: 'brownie',
  //   params: 2
  // })
  // gl.addShader({
  //   name: 'detectEdges',
  //   params: {
  //     ratio: 20,
  //     width: 800,
  //     height: 600
  //   }
  // })
  // gl.addShader({
  //   name: 'emboss',
  //   params: {
  //     size: 10,
  //     width: 100,
  //     height: 200
  //   }
  // })
  // gl.addShader({
  //   name: 'blur',
  //   params: {
  //     size: 2,
  //     width: 200,
  //     height: 200
  //   }
  // })

  // gl.addShader({
  //   name: 'hue',
  //   params: 30
  // })

  // gl.addShader({
  //   name: 'kodachrome',
  //   params: 2
  // })

  // gl.addShader({
  //   name: 'saturation',
  //   params: 20
  // })

  // gl.addShader({
  //   name: 'sepia',
  //   params: 2
  // })

  // gl.addShader({
  //   name: 'sharpen',
  //   params: {
  //     size: 20,
  //     width: 200,
  //     height: 200
  //   }
  // })

  // gl.addShader({
  //   name: 'technicolor',
  //   params: 3
  // })

  // gl.addShader({
  //   name: 'vintagePinhole'
  // })

  // gl.addShader({
  //   name: 'desaturateLuminance'
  // })

  gl.addShader({
    name: 'negative',
    params: 10
  })
  const filteredImage = gl.apply(img)
  // Draw the filtered image into our 2D Canvas
  ctx.drawImage(filteredImage, 0, 0);
}

