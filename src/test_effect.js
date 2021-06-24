#!/usr/bin/env gjs

imports.searchPath.unshift(".");
const $ = imports.simpleunittest.SimpleUnitTest;
const Effect = imports.effect.Effect;

const id = 1;
const order = 1;
const text = "Efecto 1";
const fileSound = "/datos/Sync/atareao.es/presentaciones/esLibre21Taller/app/sounds/efecto1.mp3";
const fileImage = "/datos/Sync/atareao.es/presentaciones/esLibre21Taller/app/images/efecto1.png";
const effect = new Effect(id, order, text, fileSound, fileImage);

print("==========================");
print("Printing an effect");
print(effect.toString());
print("==========================");
print("Tests");
$.run({
    "assertEquals - Id": ()=>{
        $.assertEquals(id, effect.getId());
    },
    "assertEquals - Order": ()=>{
        $.assertEquals(order, effect.getPosition());
    },
    "assertEquals - Text": ()=>{
        $.assertEquals(text, effect.getText());
    },
    "assertEquals - FileSound": ()=>{
        $.assertEquals(fileSound, effect.getSoundFile());
    },
    "assertEquals - FileImage": ()=>{
        $.assertEquals(fileImage, effect.getImageFile());
    }
});
