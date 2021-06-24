#!/usr/bin/env gjs

imports.gi.versions.Gio = '2.0';

const {Gio} = imports.gi;

var Player = class Player{
    static play(filename){
        try{
            log(`Playing ${filename}`);
            const command = ['mpg123', filename];
            const proc = Gio.Subprocess.new(
                command,
                Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE
            );
            proc.communicate_utf8_async(null, null, (proc, res) => {
                try{
                    const [, stdout, stderr] = proc.communicate_utf8_finish(res);
                    log(stdout);
                    log(stderr);
                }catch(e){
                    log(e);
                }
            });
        }catch(e){
            log(e);
        }
    }
}

const fileSound = '/datos/Sync/atareao.es/presentaciones/esLibre21Taller/app/step03/campana.mp3';
Player.play(fileSound);
