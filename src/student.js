#!/usr/bin/env gjs

var Student=
class Student{
    constructor(name, surname, phone, photo){
        this._name = name;
        this._surname = surname;
        this._phone = phone;
        this._photo = photo;
    }
    setName(name){
        this._name = name;
    }
    getName(name){
        return this._name;
    }
    setSurName(surname){
        this._surname = surname;
    }
    getSurName(surname){
        return this._surname;
    }
    setPhone(phone){
        this._phone = phone;
    }
    getPhone(phone){
        return this._phone;
    }
    setPhoto(photo){
        this._photo = photo;
    }
    getPhoto(photo){
        return this._photo;
    }
    toString(){
        return `Name: ${this._name}, Surname: ${this._surname}, Phone: ${this._phone}`;
    }
}

