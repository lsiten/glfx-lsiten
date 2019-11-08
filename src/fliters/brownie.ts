
import {
  shaderSource,
  shaderTypes
} from '../webgl'
import colorShader from '../shaders/colorMatrix'
export default (fragment:string, vertex:string, options: number) => {
  let r = Number(options)
  if (r === NaN) {
    return false
  }
  r = r || 1
  let matrix = [
    r*0.5997023498159715,r*0.34553243048391263,r*-0.2708298674538042,0,r*47.43192855600873,
    r*-0.037703249837783157,r*0.8609577587992641,r*0.15059552388459913,0,r*-36.96841498319127,
    r*0.24113635128153335,r*-0.07441037908422492,r*0.44972182064877153,0,r*-7.562075277591283,
    0,0,0,r*1,0
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