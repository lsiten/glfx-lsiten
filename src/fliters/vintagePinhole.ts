import {
  shaderSource,
  shaderTypes
} from '../webgl'
import colorShader from '../shaders/colorMatrix'
export default (fragment:string, vertex:string, options: number) => {
  let matrix = [
    0.6279345635605994,0.3202183420819367,-0.03965408211312453,0,9.651285835294123,
    0.02578397704808868,0.6441188644374771,0.03259127616149294,0,7.462829176470591,
    0.0466055556782719,-0.0851232987247891,0.5241648018700465,0,5.159190588235296,
    0,0,0,1,0
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