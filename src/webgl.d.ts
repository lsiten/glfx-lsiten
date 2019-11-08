export type shader = {
  name: string,
  params?: any
}
export type options = {
  shaders?: (shader | shader[])
}

// 着色器类型
export const enum shaderTypes {
  FRAGMENT_SHADER, // 片元着色器
  VERTEX_SHADER // 顶点着色器
}

export type shaderSource = {
  type: shaderTypes,
  source: string
}