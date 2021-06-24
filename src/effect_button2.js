#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0'
imports.gi.versions.Gio = '2.0'
imports.gi.versions.GdkPixbuf = '2.0'

const {Gtk, GObject, Gio, GdkPixbuf} = imports.gi;

var EffectButton = GObject.registerClass(
    class EffectButton extends Gtk.Button{
        _init(effect){
            super._init();
            this._effect = effect;

            const box = new Gtk.Box({
                spacing: 5,
                orientation: Gtk.Orientation.VERTICAL
            });
            const pixbuf = GdkPixbuf.Pixbuf.new_from_file_at_size(
                this._effect.getImageFile(), 64, 64);
            const image = Gtk.Image.new_from_pixbuf(pixbuf);
            box.pack_start(image, true, true, 0);

            if(effect.getText() != ""){
                const label = new Gtk.Label({
                    label: effect.getText()
                });
                box.pack_start(label, true, true, 0);
            }
            this.add(box);

            this.connect("clicked", ()=>{
                this.play();
            });
        }

        play(){
            try{
                const filename = this._effect.getSoundFile();
                print(`Playing ${filename}`);
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
);
