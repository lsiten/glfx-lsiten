
import {
  shaderSource,
  shaderTypes
} from '../webgl'
import colorShader from '../shaders/colorMatrix'
export default (fragment:string, vertex:string, options: number) => {
  let x = Number(options)
  if (x === NaN) {
    return false
  }
  x =  (x || 0) * 2/3 + 1
  let y = ((x-1) *-0.5)
  let matrix = [
    x, y, y, 0, 0,
    y, x, y, 0, 0,
    y, y, x, 0, 0,
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