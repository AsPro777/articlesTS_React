import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import * as React from "react";
import { useState , useEffect,useMemo } from 'react';
import { MouseEventHandler , ChangeEventHandler } from "react";
import '../App.css';
import ArticleProp from "../interfaces/ArticleInt";
import inputValues from "./InputValues";

export default function FormAddNews(showForm: boolean , 
                          funcChangeShowForm: React.Dispatch<React.SetStateAction<boolean>>,
                          funcChangeNewTitle: React.Dispatch<React.SetStateAction<string>>,
                          newTitle:string,
                          funcChangeNewQuest :React.Dispatch<React.SetStateAction<string>>,
                          newQuestion:string,
                          funcChangeNewType: React.Dispatch<React.SetStateAction<string>>,
                          newType:string,
                          oldArt: ArticleProp[],
                          funcAddNewNews: React.Dispatch<React.SetStateAction<ArticleProp[]>>,
                          funcChangeCount: React.Dispatch<React.SetStateAction<number>>,
                          count:number): JSX.Element 
{

    /*добавление новой статьи по клику */     
    const addNewBut: MouseEventHandler = (event) => {
        const obj=setNewObj();
        funcAddNewNews([...oldArt,obj]);
        funcChangeShowForm(false);
        funcChangeNewQuest('');
        funcChangeNewType('');
        funcChangeShowForm(false);
        funcChangeCount(count+1);

    }  

    /*формирование нового объекта для списка статей */
    function setNewObj(): ArticleProp{
      let newObj:ArticleProp
        newObj={
        'category': newTitle,
        /*'correct_answer': 'some',
        'difficulty': 'some',
        'incorrect_answers': {
          0: 'eeeee',
          1: 'rrrrrr',
          2: 'ttttttt'
        },*/
        'question': newQuestion,
        'type': newType
       
      }
      return newObj;
    }  

/*поля для ввода данных для новой статьи */ 
    const memoInputTheme = inputValues('Название темы',newTitle,funcChangeNewTitle);
    const memoInputQuest = inputValues('Вопрос',newQuestion,funcChangeNewQuest);
    const memoInputType = inputValues('Тип',newType,funcChangeNewType);

    if(showForm==false) return <div></div>
    else 
       return (<form>
                 <div className='formAdd'>
                  {memoInputTheme}
                  {memoInputQuest}
                  {memoInputType}
                  <button className='addNewsBut' 
                               onClick={addNewBut}>Принять</button>
                 </div>
            </form>)
    
  }
