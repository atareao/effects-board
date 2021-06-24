#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0'
imports.gi.versions.GObject = '2.0'
imports.gi.versions.GdkPixbuf = '2.0'
imports.gi.versions.GdkPixbuf = '2.0'
const {Gtk, GObject, GdkPixbuf, Gio} = imports.gi;

imports.searchPath.unshift(".");
const Effect = imports.effect.Effect;
const EffectButton = imports.effect_button2.EffectButton;
const DialogEffect = imports.dialog_effect.DialogEffect;
const Database = imports.db.Database;

Gtk.init(null);

const DBDIR = "/home/lorenzo/.config/effects-board/";
const DBFILE = "database";

var Dialog = GObject.registerClass(
    class Dialog extends Gtk.Dialog{
        _init(){
            super._init({
                title: "Register",
                useHeaderBar: true,
                defaultWidth:200,
                defaultHeight: 200,
                modal: true,
                decorated: true,
            });
            this.set_keep_above(true);
            this._selected = null;

            const header = new Gtk.HeaderBar({
                title: "Effects Board"
            });
            this.set_titlebar(header);

            const button_add = new Gtk.Button({
                label: "Añadir"
            });
            button_add.connect("clicked", this.add_effect.bind(this));
            header.pack_start(button_add);

            const button_remove = new Gtk.Button({
                label: "Eliminar"
            });
            button_remove.connect("clicked", ()=>{
                if (this._selected){
                    this._db.remove(this._selected.getId());
                    this._flowBox.get_children().forEach((item)=>{
                        this._flowBox.remove(item);
                    });
                    this.load();
                }
            });
            header.pack_start(button_remove);

            const button_exit = new Gtk.Button({
                label: "Salir"
            });
            button_exit.connect("clicked", ()=>{
                this.destroy();
            });
            header.pack_end(button_exit);

            this._flowBox = new Gtk.FlowBox({
                valign: Gtk.Align.START,
                maxChildrenPerLine: 30,
                minChildrenPerLine: 4,
                selectionMode: Gtk.SelectionMode.NONE
            });
            this.get_content_area().add(this._flowBox);
            /*
            this._flowBox.set_valign(Gtk.Align.START);
            this._flowBox.set_max_children_per_line(30);
            this._flowBox.set_selection_mode(Gtk.Selection.NONE);
            */

            this._flowBox.set_margin_top(10);
            this._flowBox.set_margin_bottom(10);
            this._flowBox.set_margin_start(10);
            this._flowBox.set_margin_end(10);
            this._flowBox.set_column_spacing(10);
            this._flowBox.set_row_spacing(10);

            this.init();

            this.show_all();
        }
        add_effect(){
            const dialogEffect = new DialogEffect();
            if(dialogEffect.run() == Gtk.ResponseType.YES){
                const text = dialogEffect.getText();
                const soundFile = dialogEffect.getSoundFile();
                const imageFile = dialogEffect.getImageFile();
                const position = this._db.getMaxPosition() + 1;
                const effect = new Effect(
                    0, position, text, soundFile, imageFile);
                this._db.insert(effect);
                const button_effect = new EffectButton(effect);
                button_effect.connect("clicked", ()=>{
                    this._selected = effect;
                    print(this._selected);
                    print("================");
                });
                this._flowBox.add(button_effect);
                this._flowBox.show_all();
            }
            dialogEffect.destroy();
        }

        init(){
            const dbdir = Gio.File.new_for_path(DBDIR);
            if(!dbdir.query_exists(null)){
                dbdir.make_directory_with_parents(null);
            }
            this._db = new Database(DBDIR, DBFILE);
            this.load();
        }

        load(){
            const effects = this._db.getAll();
            effects.forEach((effect)=>{
                const button_effect = new EffectButton(effect);
                button_effect.connect("clicked", ()=>{
                    this._selected = effect;
                });
                this._flowBox.add(button_effect);
            });
            this._flowBox.show_all();
        }
    }
);

const dialog = new Dialog();
dialog.run();


