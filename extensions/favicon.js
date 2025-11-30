(async function(Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) throw new Error("needs unsandboxed");

  class CustomFavicon {
    getInfo() {
      return {
        id: 'customfavicon',
        name: 'Custom Favicon',
        color1: '#9b59b6',
        blocks: [{
          opcode: 'set',
          blockType: Scratch.BlockType.COMMAND,
          text: 'set tab icon to [URL]',
          arguments: {
            URL: { type: Scratch.ArgumentType.STRING, defaultValue: 'https://penguinmod.com/penguin.png' }
          }
        }]
      };
    }
    set(args) {
      let link = document.querySelector("link[rel='icon']") || document.createElement('link');
      link.rel = 'icon';
      link.href = args.URL;
      document.head.appendChild(link);
    }
  }

  Scratch.extensions.register(new CustomFavicon());
})(Scratch);
