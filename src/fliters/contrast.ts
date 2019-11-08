

import {
  shaderSource,
  shaderTypes
} from '../webgl'
import colorShader from '../shaders/colorMatrix'
export default (fragment:string, vertex:string, options: number) => {
  let v = Number(options)
  if (v === NaN) {
    return false
  }
  v = (v || 0) + 1
  let o = -128 * (v - 1)
  let matrix = [
    v, 0, 0, 0, o,
    0, v, 0, 0, o,
    0, 0, v, 0, o,
    0, 0, 0, 1, 0
  ]
  let shaders:shaderSource [] = []
  shaders.push({
    type: shaderTypes.FRAGMENT_SHADER,
    source: colorShader(matrix)
  })
  shaders.push({
      type: shaderTypes.VERTEX_SHADER,
      source: vertex
  })
  
  return {shaders: shaders, cb: (gl:any, program:any) => {
    let m = new Float32Array(matrix)
    m[4] /= 255
    m[9] /= 255
    m[14] /= 255
    m[19] /= 255
    gl.uniform1fv(program.uniform.m, m)
  }}
}