#!/usr/bin/env gjs

imports.searchPath.unshift(".");
const Gio = imports.gi.Gio;
const $ = imports.simpleunittest.SimpleUnitTest;
const Effect = imports.effect.Effect;
const Database = imports.db.Database;

const DBNAME = "test";

function post(){
    let file = Gio.File.new_for_path(DBNAME + ".db");
    if(file.query_exists(null)){
        file.delete(null);
    }
}

const id = 1;
const position = 1;
const text = "Efecto 1";
const fileSound = "/datos/Sync/atareao.es/presentaciones/esLibre21Taller/app/sounds/efecto1.mp3";
const fileImage = "/datos/Sync/atareao.es/presentaciones/esLibre21Taller/app/images/efecto1.png";
const effect = new Effect(id, position, text, fileSound, fileImage);


$.run({
    "connection": ()=>{
        const file = Gio.File.new_for_path(DBNAME + ".db");
        try{
            $.assertFalse(file.query_exists(null));
            const db = new Database(".", DBNAME);
            $.assertTrue(file.query_exists(null));
        }catch(e){
            $.fail(e);
        }finally{
            post();
        }
    },
    "insert": ()=>{
        try{
            const db = new Database(".", DBNAME);
            const effect = new Effect(0, position, text, fileSound, fileImage);
            $.assertTrue(db.insert(effect));
            const results = db.getAll();
            $.assertEquals(1, results.length);
            $.assertEquals(position, results[0].getPosition());
            $.assertEquals(text, results[0].getText());
        }catch(e){
            $.fail(e);
        }finally{
            post();
        }
    },
    "getMax": ()=>{
        try{
            const db = new Database(".", DBNAME);
            const effect = new Effect(0, position, text, fileSound, fileImage);
            $.assertTrue(db.insert(effect));
            const results = db.getAll();
            $.assertEquals(1, results.length);
            $.assertEquals(position, results[0].getPosition());
            $.assertEquals(text, results[0].getText());
            $.assertEquals(position, db.getMaxPosition());
        }catch(e){
            $.fail(e);
        }finally{
            post();
        }
    }
});
