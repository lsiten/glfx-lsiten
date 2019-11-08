
import {
  shaderSource,
  shaderTypes
} from '../webgl'
import convolutionShader from '../shaders/convolution'
export default (fragment:string, vertex:string, {size, width = 1, height = 1}: {size: number, width?:number, height?:number}) => {

  let s = Number(size)
  if (s === NaN) {
    return false
  }
  s = s || 1
  let matrix = [
    -2*s, -1*s, 0,
    -1*s, 1, 1*s,
    0, 1*s, 2*s
  ]
  let shaders:shaderSource [] = []
  shaders.push({
    type: shaderTypes.FRAGMENT_SHADER,
    source: convolutionShader
  })
  shaders.push({
      type: shaderTypes.VERTEX_SHADER,
      source: vertex
  })
  
  return {shaders: shaders, cb: (gl:any, program:any) => {
    let m = new Float32Array(matrix)
    let pixelSizeX = 1 / width
    let pixelSizeY = 1 / height
    gl.uniform1fv(program.uniform.m, m)
    gl.uniform2f(program.uniform.px, pixelSizeX, pixelSizeY)
  }}
}