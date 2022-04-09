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
            this.set_always_show_image(true);
            if(effect.getText() != ""){
                this.set_label(effect.getText());
            }
            this._isPlaying = false;
            const pixbuf = GdkPixbuf.Pixbuf.new_from_file_at_size(
                this._effect.getImageFile(), 64, 64);
            const image = Gtk.Image.new_from_pixbuf(pixbuf);
            this.set_image(image);
            this.connect("clicked", ()=>{
                this.play();
            });
        }
        stop(){
            try{
                if(this._proc){
                    this._proc.force_exit();
                    this._proc = null;
                }
            }catch(e){
                log(e);
            }
        }
        play(){
            try{
                const filename = this._effect.getSoundFile();
                print(`Playing ${filename}`);
                log(`Playing ${filename}`);
                const command = ['mpg123', filename];
                this._isPlaying = true;
                this._proc = Gio.Subprocess.new(
                    command,
                    Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE
                );
                this._proc.communicate_utf8_async(null, null, (proc, res) => {
                    try{
                        const [, stdout, stderr] = proc.communicate_utf8_finish(res);
                        log(stdout);
                        log(stderr);
                        log(this._proc)
                        this._isPlaying = false;
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
