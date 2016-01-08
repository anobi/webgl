precision highp float;

varying vec3 vPos;
varying vec3 vNormal;

uniform vec3 pointLightColor[MAX_POINT_LIGHTS];
uniform vec3 pointLightPosition[MAX_POINT_LIGHTS];

void main()
{
    vec4 lightVal = vec4(0.0, 0.0, 0.0, 1.0);
    for(int i = 0; i < MAX_POINT_LIGHTS; i++)
    {
        vec3 lightDirection = normalize(vPos - pointLightPosition[i]);
        lightVal.rgb += clamp(dot(-lightDirection, vNormal), 0.0, 1.0)
            * pointLightColor[i];
    }
    gl_FragColor = vec4(0.8, 0.8, 0.8, 1.0) * lightVal;
}
