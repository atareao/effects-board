#!/usr/bin/env gjs

const {Gda, Gio} = imports.gi;
imports.searchPath.unshift(".");
var Effect = imports.effect.Effect;

var Database =
class Database{
    constructor(dirname, filename){
        this._filename = filename;
        if(!dirname.endsWith("/")){
            dirname += "/";
        }
        this._dirname = dirname;
        this._connection = new Gda.Connection({
            provider: Gda.Config.get_provider("SQLite"),
            cnc_string: `DB_DIR=${dirname};DB_NAME=${filename}`
        });
        this.init();
    }

    init(){
        this._connection.open();
        const sql = `CREATE TABLE IF NOT EXISTS effects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER,
            text VARCHAR,
            soundfile VARCHAR,
            imagefile VARCHAR);`;
        this._connection.execute_non_select_command(sql);
        this._connection.close();
    }

    remove_database(){

        let file = Gio.File.new_for_path(this._dirname + this._filename + ".db");
        if(file.query_exists(null)){
            return file.delete(null);
        }
        return false;
    }

    insert(aneffect){
        this._connection.open();
        const position = aneffect.getPosition();
        const text = aneffect.getText();
        const soundfile = aneffect.getSoundFile();
        const imagefile = aneffect.getImageFile();
        const sql = `INSERT INTO effects (
            position, text, soundfile, imagefile
        ) VALUES (
            '${position}', '${text}', '${soundfile}', '${imagefile}');`;
        const row = this._connection.execute_non_select_command(sql);
        this._connection.close();
        return row > 0;
    }

    update(aneffect){
        this._connection.open();
        const id = aneffect.getId();
        const position = aneffect.getPosition();
        const text = aneffect.getText();
        const soundfile = aneffect.getSoundFile();
        const imagefile = aneffect.getImageFile();
        const sql = `UPDATE effects SET
            position=${position}, text='${text}',
            filesound='${soundfile}', fileimage='${imagefile}'
            WHERE id='${id}'`;
        const row = this._connection.execute_non_select_command(sql);
        this._connection.close();
        return row > 0;
    }

    delete(aneffect){
        this._connection.open();
        const id = aneffect.getId();
        const sql = `DELETE FROM effects WHERE id=${id}`;
        const row = this._connection.execute_non_select_command(sql);
        this._connection.close();
        return row > 0;
    }

    getAll(){
        const effects = [];
        this._connection.open();
        const sql = `SELECT id, position, text, soundfile, imagefile
            FROM effects`;
        const dataModel = this._connection.execute_select_command(sql);
        const iter = dataModel.create_iter();
        while(iter.move_next()){
            const new_effect = new Effect(iter.get_value_at(0),
                                          iter.get_value_at(1),
                                          iter.get_value_at(2),
                                          iter.get_value_at(3),
                                          iter.get_value_at(4));
            effects.push(new_effect);
        }
        this._connection.close();
        return effects;
    }

    get(id){
        this._connection.open();
        const sql = `SELECT id, position, text, soundfile, imagefile
            FROM effects WHERE id=${id}`;
        const dataModel = this._connection.execute_select_command(sql);
        const iter = dataModel.create_iter();
        iter.move_next();
        const effect = new Effect(iter.get_value_at(0),
                                  iter.get_value_at(1),
                                  iter.get_value_at(2),
                                  iter.get_value_at(3),
                                  iter.get_value_at(4));
        this._connection.close();
        return effect;
    }

    getMaxPosition(){
        this._connection.open();
        const sql = "SELECT MAX(position) FROM effects";
        const dataModel = this._connection.execute_select_command(sql);
        const iter = dataModel.create_iter();
        iter.move_next();
        const value = iter.get_value_at(0)?iter.get_value_at(0):0;
        this._connection.close();
        return value;
    }

    remove(id){
        const sql = `DELETE FROM effects WHERE id=${id};`;
        this._connection.open();
        const row = this._connection.execute_non_select_command(sql);
        this._connection.close();
    }
    removeAll(){
        const sql = "DELETE FROM effects";
        this._connection.open();
        const row = this._connection.execute_non_select_command(sql);
        this._connection.close();
    }

    exists(id){
        const effects = this.get(id);
        return effects.length > 0;
    }
}
