https://jsfiddle.net/vy0we5wb/4
https://github.com/brianxu/GPUPicker

```
const vertexShader = `attribute vec3 center; varying vec3 vCenter; void main() { vCenter = center; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }`;
    const fragmentShader = `varying vec3 vCenter; uniform float lineWidth;
    float edgeFactorTri() {
      vec3 d = fwidth( vCenter.xyz );
      vec3 a3 = smoothstep( vec3( 0.0 ), d * lineWidth, vCenter.xyz );
      return min( min( a3.x, a3.y ), a3.z );
    }
    void main() {
      float factor = edgeFactorTri();
      if ( factor > 0.8 ) discard;
      gl_FragColor.rgb = mix( vec3(1.0 ), vec3( 0.2 ), factor);
      gl_FragColor.a = 1.0;
    }
    `;
    const lineMaterial = new ShaderMaterial({
      uniforms: {
        lineWidth: {
          value: 10,
        },
      },
      vertexShader,
      fragmentShader,
      side: DoubleSide,
    });
```
