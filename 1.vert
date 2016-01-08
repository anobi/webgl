varying vec3 vPos;
varying vec3 vNormal;
void main() {
    vNormal = normal;
    vPos = position;
    gl_Position = projectionMatrix *
        modelViewMatrix *
        vec4(position, 1.0);
}
