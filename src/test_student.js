#!/usr/bin/env gjs

imports.searchPath.unshift(".");
const $ = imports.simpleunittest.SimpleUnitTest;
const Student = imports.student.Student;

const name = "Lorenzo";
const surname = "Carbonell";
const phone = "12345678";
const photo = "/datos/Sync/atareao.es/presentaciones/esLibre21Taller/app/images/icono-lorenzo-640x640.png"
const student = new Student(name, surname, phone, photo);

print("==========================");
print("Printing an student");
print(student.toString());
print("==========================");
print("Tests");
$.run({
    "assertEquals - Name": ()=>{
        $.assertEquals(name, student.getName());
    },
    "assertEquals - Surname": ()=>{
        $.assertEquals(surname, student.getSurName());
    },
    "assertEquals - Phone": ()=>{
        $.assertEquals(phone, student.getPhone());
    },
    "assertEquals - Photo": ()=>{
        $.assertEquals(photo, student.getPhoto());
    }
});
