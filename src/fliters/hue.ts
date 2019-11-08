
import {
  shaderSource,
  shaderTypes
} from '../webgl'
import colorShader from '../shaders/colorMatrix'
export default (fragment:string, vertex:string, options: number) => {
  let rotation = Number(options)
  if (rotation === NaN) {
    return false
  }

  rotation = (rotation || 0)/180 * Math.PI
  let cos = Math.cos(rotation)
  let sin = Math.sin(rotation)
  let lumR = 0.213
  let lumG = 0.715
  let lumB = 0.072
  let matrix = [
    lumR+cos*(1-lumR)+sin*(-lumR),lumG+cos*(-lumG)+sin*(-lumG),lumB+cos*(-lumB)+sin*(1-lumB),0,0,
    lumR+cos*(-lumR)+sin*(0.143),lumG+cos*(1-lumG)+sin*(0.140),lumB+cos*(-lumB)+sin*(-0.283),0,0,
    lumR+cos*(-lumR)+sin*(-(1-lumR)),lumG+cos*(-lumG)+sin*(lumG),lumB+cos*(1-lumB)+sin*(lumB),0,0,
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