import { cac } from 'cac';
import color from 'picocolors';

const cli = cac('stereopasa');
cli
  .command('init <dir>', 'initialise project')
  .example('init --pnpm --ts --prettier --eslint directory-name')
  .option('--pnpm', 'project managed by PNPM')
  .option('--npm', 'project managed by NPM')
  .option('--prettier', 'with prettier')
  .action(async (dirName, options) => {
    try {
      // await indexFiles(postsDir);
    } catch (err: any) {
      console.error(color.red(err.message));
      process.exit(1);
    }
  });

cli.command('', '').action(() => {
  cli.outputHelp();
});

cli.help();

try {
  cli.parse(process.argv, { run: false });
  cli.runMatchedCommand();
} catch (error: any) {
  if (error.name === 'CACError') {
    console.error(error.message + '\n');
    cli.outputHelp();
  } else {
    console.error(error.stack);
  }
  process.exit(1);
}
