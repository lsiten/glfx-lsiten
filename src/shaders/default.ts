const fragment = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D texture;

  void main(void) {
    gl_FragColor = texture2D(texture, vUv);
  }
`

const vertex = `
  precision highp float;
  attribute vec2 pos;
  attribute vec2 uv;
  varying vec2 vUv;
  uniform float flipY;

  void main(void) {
    vUv = uv;
    gl_Position = vec4(pos.x, pos.y*flipY, 0.0, 1.);
  }
`

export default {
  fragment,
  vertex
}
