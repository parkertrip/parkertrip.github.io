(async function(Scratch) {
  'use strict';
  const key = 'pm-local-files';
  let files = JSON.parse(localStorage.getItem(key) || '{}');

  class RealFiles {
    getInfo() {
      return {
        id: 'realfiles',
        name: 'Real Files',
        color1: '#00cc88',
        blocks: [
          { opcode: 'save', blockType: Scratch.BlockType.COMMAND, text: 'save [TEXT] as [NAME]', arguments: {TEXT:{type:Scratch.ArgumentType.STRING,defaultValue:'hello'}, NAME:{type:Scratch.ArgumentType.STRING,defaultValue:'save.txt'}} },
          { opcode: 'load', blockType: Scratch.BlockType.REPORTER, text: 'load file [NAME]', arguments: {NAME:{type:Scratch.ArgumentType.STRING,defaultValue:'save.txt'}} },
          { opcode: 'del',  blockType: Scratch.BlockType.COMMAND, text: 'delete file [NAME]', arguments: {NAME:{type:Scratch.ArgumentType.STRING,defaultValue:'save.txt'}} },
          { opcode: 'list', blockType: Scratch.BlockType.REPORTER, text: 'list of all filenames', disableMonitor: true }
        ]
      };
    }
    save(args) { files[args.NAME] = args.TEXT; localStorage.setItem(key, JSON.stringify(files)); }
    load(args) { return files[args.NAME] || ''; }
    del(args)  { delete files[args.NAME]; localStorage.setItem(key, JSON.stringify(files)); }
    list()    { return Object.keys(files).join(','); }
  }

  Scratch.extensions.register(new RealFiles());
})(Scratch);
