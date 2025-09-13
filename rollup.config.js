import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/ha-makeskyblue-mppt-card.ts',
  output: {
    file: 'dist/ha-makeskyblue-mppt-card.js',
    format: 'es',
    sourcemap: true,
  },
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
  plugins: [
    nodeResolve(),
    typescript(),
    terser({
      output: {
        comments: false,
      },
    }),
  ],
};
