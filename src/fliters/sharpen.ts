
import {
  shaderSource,
  shaderTypes
} from '../webgl'
import convolutionShader from '../shaders/convolution'
export default (fragment:string, vertex:string, {amount, width = 1, height = 1}: {amount: number, width?:number, height?:number}) => {

  let a = Number(amount)
  if (a === NaN) {
    return false
  }
  a = a || 1
  let matrix = [
    0, -1*a, 0,
    -1*a, 1 + 4*a, -1*a,
    0, -1*a, 0
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