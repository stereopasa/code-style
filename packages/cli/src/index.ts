import { cac } from 'cac';

const cli = cac();
cli
  .command('[...files]', 'list files')
  .option('--flag', 'test flag')
  .action((files, options) => {
    console.log(files);
    console.log(options);
  });

cli.help();
cli.parse();
