#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0'
const {Gtk, GObject} = imports.gi;

Gtk.init(null);

var DialogEffect = GObject.registerClass(
    class DialogEffect extends Gtk.Dialog{
        _init(){
            super._init({
                title: "Effect",
                defaultWidth:200,
                defaultHeight: 200
            });
            this.add_button("Ok", Gtk.ResponseType.YES);
            this.add_button("Cancel", Gtk.ResponseType.CANCEL);
            const layout = new Gtk.Grid();
            layout.set_margin_top(10);
            layout.set_margin_bottom(10);
            layout.set_margin_start(10);
            layout.set_margin_end(10);
            layout.set_column_spacing(10);
            layout.set_row_spacing(10);

            const label_text = Gtk.Label.new("Text:");
            label_text.set_alignment(0, 0.5);
            layout.attach(label_text, 0, 0, 1, 1);
            this._entry_text = new Gtk.Entry();
            layout.attach(this._entry_text, 1, 0, 2, 1);

            const label_imageFile = Gtk.Label.new("Select image:");
            label_imageFile.set_alignment(0, 0.5);
            layout.attach(label_imageFile, 0, 1, 1, 1);
            this._entry_imageFile = new Gtk.Entry({
                sensitive: false
            });
            layout.attach(this._entry_imageFile, 1, 1, 1, 1);
            const button_imageFile = new Gtk.Button();
            const icon_imageFile = Gtk.Image.new_from_icon_name(
                "emblem-art", Gtk.IconSize.BUTTON);
            button_imageFile.set_image(icon_imageFile);
            button_imageFile.connect("clicked", ()=>{
                const filter = new Gtk.FileFilter();
                filter.add_mime_type('image/png');
                const dialog = new Gtk.FileChooserDialog({
                    title: "Selecciona imagen",
                    action: Gtk.FileChooserAction.OPEN,
                    filter: filter,
                    select_multiple: false
                });
                dialog.add_button("Si", Gtk.ResponseType.YES);
                dialog.add_button("No", Gtk.ResponseType.NO);
                if (dialog.run() == Gtk.ResponseType.YES){
                    this._entry_imageFile.set_text(dialog.get_filename());
                }
                dialog.destroy();
            });
            layout.attach(button_imageFile, 2, 1, 1, 1);

            const label_soundFile = Gtk.Label.new("Select sound:");
            label_soundFile.set_alignment(0, 0.5);
            layout.attach(label_soundFile, 0, 2, 1, 1);
            this._entry_soundFile = new Gtk.Entry({
                sensitive: false
            });
            layout.attach(this._entry_soundFile, 1, 2, 1, 1);
            const button_soundFile = new Gtk.Button();
            const icon_soundFile = Gtk.Image.new_from_icon_name(
                "emblem-sound", Gtk.IconSize.BUTTON);
            button_soundFile.set_image(icon_soundFile);
            button_soundFile.connect("clicked", ()=>{
                const filter = new Gtk.FileFilter();
                filter.add_mime_type('audio/mpeg');
                const dialog = new Gtk.FileChooserDialog({
                    title: "Selecciona sonido",
                    action: Gtk.FileChooserAction.OPEN,
                    filter: filter,
                    select_multiple: false
                });
                dialog.add_button("Si", Gtk.ResponseType.YES);
                dialog.add_button("No", Gtk.ResponseType.NO);
                if (dialog.run() == Gtk.ResponseType.YES){
                    this._entry_soundFile.set_text(dialog.get_filename());
                }
                dialog.destroy();
            });
            layout.attach(button_soundFile, 2, 2, 1, 1);


            this.get_content_area().add(layout);
            this.show_all();
        }

        getText(){
            return this._entry_text.get_text();
        }

        getSoundFile(){
            return this._entry_soundFile.get_text();
        }

        getImageFile(){
            return this._entry_imageFile.get_text();
        }
    }
);
