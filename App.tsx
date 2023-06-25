import React, { SetStateAction } from 'react';
import logo from './logo.svg';
import './App.css';

import ArticleProp from './interfaces/ArticleInt';
import FormAddNews from './components/NewForm';
import { MouseEventHandler , ChangeEventHandler } from "react";

import { useState , useEffect, useMemo } from 'react';

function App() {

  const [art, setArt] = useState<ArticleProp[]>([]);
 const [count , setCount] = useState(0);
 const [showForm,setShowForm] = useState(true);
 const [newTitle , setNewTitle] = useState('');
 const [newQuestion , setNewQuestion] = useState('');
 const [newType , setNewType] = useState('');


 useEffect(()=>{
  fetch('https://opentdb.com/api.php?amount=5').then(res=>res.json()).then(
    (result)=> {  setArt(result.results); setCount(result.results.length)  }
  )
 },[])

 /*удаление вопроса по клику */
const clickDel : MouseEventHandler = (event)=> {
  let atrId=event.currentTarget.getAttribute('data-id');
  setArt([...del(atrId,art)]);
  setCount(count-1);
  return;
 }

 /*формирование нового массива в atr */
 function del (id: string | null , arr:  ArticleProp[]):ArticleProp[]  {
     let arr1 : ArticleProp[] = [];
     let id1 : number = Number(id);
      arr.splice(id1,1);
      arr1=arr;
      return arr1;
 }

/*строки каждого вопроса */
function ArticleItem({ category, question ,type,id }: ArticleProp): JSX.Element 
{
    return (
      <div>
        <div>
          <h1 className='head'>{category}</h1>
         <div className='head'>{question} </div>
         <div className='head'>{type}</div>
         <div className='line'></div>
        </div>
        <div>
         <button data-id={id} onClick={ clickDel } >Удалить</button>
        </div>
      </div>
    )
  }

/*все вопросы */
function article(child: ArticleProp[] ): JSX.Element | JSX.Element[] 
{
    const newsItems : JSX.Element[] =[];

    child.map(
        (str,id) => {
            newsItems.push(<ArticleItem key={id.toString()}
                                        id={id}
                                        category= {str.category}
                                        question={str.question}
                                        type={str.type}
                                        />)
          }
    )
    return newsItems;
    
  }

  return (
    <div className="App">
       {
        ((art!==null) && (art!==undefined) && (JSON.stringify(art)!=='{}')) ? 
        <>
           {FormAddNews(showForm,
                        setShowForm,
                        setNewTitle,
                        newTitle,
                        setNewQuestion,
                        newQuestion,
                        setNewType,
                        newType,
                        art,
                        setArt,
                        setCount,
                        count)}
           {article(art)}
           {count}
        </>:
        <></>
      }
    </div>
  );
}

export default App;
