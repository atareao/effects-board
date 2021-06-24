#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0'
const {Gtk, GObject} = imports.gi;

Gtk.init(null);

var Dialog = GObject.registerClass(
    class Dialog extends Gtk.Dialog{
        _init(){
            super._init({
                title: "Register",
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

            const label_name = Gtk.Label.new("Name:");
            label_name.set_alignment(0, 0.5);
            layout.attach(label_name, 0, 0, 1, 1);
            this._entry_name = Gtk.Entry.new();
            layout.attach(this._entry_name, 1, 0, 1, 1);

            const label_surname = Gtk.Label.new("Surname:");
            label_surname.set_alignment(0, 0.5);
            layout.attach(label_surname, 0, 1, 1, 1);
            this._entry_surname = Gtk.Entry.new();
            layout.attach(this._entry_surname, 1, 1, 1, 1);

            const label_phone = Gtk.Label.new("Phone:");
            label_phone.set_alignment(0, 0.5);
            layout.attach(label_phone, 0, 2, 1, 1);
            this._entry_phone = Gtk.Entry.new();
            layout.attach(this._entry_phone, 1, 2, 1, 1);

            this.get_content_area().add(layout);
            this.show_all();
        }
    }
);

const dialog = new Dialog();
dialog.run();


