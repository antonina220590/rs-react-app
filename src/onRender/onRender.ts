import { ProfilerOnRenderCallback } from 'react';

const onRenderCallback: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  console.log(`id: ${id}`);
  console.log(`phase: ${phase}`);
  console.log(`actualDuration: ${actualDuration}`);
  console.log(`baseDuration: ${baseDuration}`);
  console.log(`startTime: ${startTime}`);
  console.log(`commitTime: ${commitTime}`);
};

export default onRenderCallback;
