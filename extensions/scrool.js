(async function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension needs to be run unsandboxed");
  }

  class CustomScrollbar {
    getInfo() {
      return {
        id: 'customscrollbar',
        name: 'Custom Scrollbar',
        color1: '#ff5555',
        blocks: [{
          opcode: 'set',
          blockType: Scratch.BlockType.COMMAND,
          text: 'set scrollbar color [COLOR] width [WIDTH]px',
          arguments: {
            COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: '#ff5555' },
            WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 16 }
          }
        }]
      };
    }

    set(args) {
      const css = `* { scrollbar-color: ${args.COLOR} transparent !important; }
                   ::-webkit-scrollbar { width: ${args.WIDTH}px !important; background: transparent !important; }
                   ::-webkit-scrollbar-thumb { background: ${args.COLOR} !important; border-radius: 99px !important; }`;

      let style = document.getElementById('my-custom-scrollbar');
      if (!style) {
        style = document.createElement('style');
        style.id = 'my-custom-scrollbar';
        document.head.appendChild(style);
      }
      style.textContent = css;
    }
  }

  Scratch.extensions.register(new CustomScrollbar());
})(Scratch);
