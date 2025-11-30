(async function(Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) throw new Error("needs unsandboxed");

  const particles = [];

  class EpicRendering {
    getInfo() {
      return {
        id: 'epicrender',
        name: 'Particles & Trails',
        color1: '#ff3333',
        blocks: [
          { opcode: 'trailsOn',  blockType: Scratch.BlockType.COMMAND, text: 'enable trails' },
          { opcode: 'trailsOff', blockType: Scratch.BlockType.COMMAND, text: 'disable trails' },
          { opcode: 'clearT',    blockType: Scratch.BlockType.COMMAND, text: 'clear trails' },
          '---',
          {
            opcode: 'burst',
            blockType: Scratch.BlockType.COMMAND,
            text: 'burst [N] particles color [C] size [S]',
            arguments: {
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 40 },
              C: { type: Scratch.ArgumentType.COLOR,   defaultValue: '#ff0088' },
              S: { type: Scratch.ArgumentType.NUMBER, defaultValue: 12 }
            }
          },
          {
            opcode: 'shake',
            blockType: Scratch.BlockType.COMMAND,
            text: 'shake screen [POWER] for [TIME] frames',
            arguments: {
              POWER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              TIME:  { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 }
            }
          }
        ]
      };
    }
    trailsOn()  { Scratch.vm.renderer.drawTrails = true; }
    trailsOff() { Scratch.vm.renderer.drawTrails = false; }
    clearT()    { Scratch.vm.renderer.clearTrails?.(); }

    burst(args, util) {
      const x = util.target.x;
      const y = util.target.y;
      for (let i = 0; i < args.N; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particles.push({x, y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, c: args.C, s: args.S, life: 60});
      }
    }

    shake(args) {
      const stage = document.querySelector('[class*="stage-wrapper"]') || document.body;
      stage.style.transition = `transform ${args.TIME/60}s`;
      stage.style.transform = `translate(${Math.random()*args.POWER*2-args.POWER}px, ${Math.random()*args.POWER*2-args.POWER}px)`;
      setTimeout(() => stage.style.transform = '', args.TIME*16.66);
    }
  }

  // draw particles every frame
  const oldStep = Scratch.vm.runtime._step;
  Scratch.vm.runtime._step = function() {
    oldStep.call(this);
    const ctx = Scratch.renderer.canvas?.getContext('2d');
    if (!ctx) return;
    for (let i = particles.length-1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.life--;
      if (p.life <= 0) { particles.splice(i,1); continue; }
      ctx.globalAlpha = p.life/60;
      ctx.fillStyle = p.c;
      ctx.fillRect(p.x-p.s/2, -p.y-p.s/2, p.s, p.s);
    }
    ctx.globalAlpha = 1;
  };

  Scratch.extensions.register(new EpicRendering());
})(Scratch);
