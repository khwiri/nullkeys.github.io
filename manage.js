const path = require('path');
const { spawnSync } = require('child_process');


const site  = path.resolve('./src');
const theme = path.resolve('./src/themes/tranquilpeak');


/**
 * Helper for spawning processes with some helpful defaults.
 * @see {@link https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options}
 * @param {string} command A string containing the full command to execute, including arguments.
 * @param {object} options An object containing options that will be passed to the spawned process.
 */
function spawn(command, options) {
    const [cmd, ...args]    = command.split(' ');
    const stdio             = ['ignore', 'inherit', 'inherit'];

    spawnSync(cmd, args, {stdio: stdio, ...options});
}


/**
 * This installs site dependencies and rebuilds themes.
 */
function build() {
    spawn('npm install',    { cwd: site  });
    spawn('npm install',    { cwd: theme });
    spawn('npm run prod',   { cwd: theme });
}


/**
 * This generates static files ready to be published.
 */
function publish() {
    spawn('hexo generate', { cwd: site });
}


/**
 * This creates a new post.
 * @param {string} title The title of the new post.
 */
function create_post(title) {
    spawn(`hexo new ${title}`, { cwd: site });
}


/**
 * Starts a local hexo server on port 4000.
 */
function server() {
    spawn('hexo server', { cwd: site });
}


module.exports.build        = build;
module.exports.publish      = publish;
module.exports.create_post  = create_post;
module.exports.server	    = server;


require('make-runnable/custom')({
    printOutputFrame: false,
});
