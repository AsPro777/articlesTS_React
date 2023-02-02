import * as React from "react";
import { useState , useEffect,useMemo } from 'react';
import { MouseEventHandler , ChangeEventHandler } from "react";
import '../App.css';
import ArticleProp from "../interfaces/ArticleInt";

type FuncChange = (x: string)=> void

export default function inputValues(title:string , newValue: string , funcChangeValue: FuncChange): JSX.Element {
    const funcChange : ChangeEventHandler = (event)=> {
        const input=event.target as HTMLInputElement;
        let value = '';
        if(input != null) value = input.value;
        else value = '';
  
        funcChangeValue(value);
      } 

     return( 
    <label className='addNewsLab'>{title} -
        <input type='text'
              value={newValue}
           onChange={funcChange}/>
    </label>)
} 

