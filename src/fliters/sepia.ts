
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
  r =  r || 1
  let matrix = [
    r*0.393, r*0.7689999, r*0.18899999, 0, 0,
    r*0.349, r*0.6859999, r*0.16799999, 0, 0,
    r*0.272, r*0.5339999, r*0.13099999, 0, 0,
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