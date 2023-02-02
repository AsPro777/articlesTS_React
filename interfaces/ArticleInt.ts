

export default interface ArticleProp {
  id? : number,
  category: string,
  type: string,
  difficulty? : string,
  question: string,
  correct_answer? : string,
  incorrect_answers? :  {
    0: string,
    1: string,
    2: string
  }

}  
