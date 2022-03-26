import {
    addTodoLoading,
    addTodoSuccess,
    getTodoLoading,
    getTodoSuccess, 
    delTodo
} from "../redux/actions"

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
import "./todo.css"
import { Table } from "./Table";

export const Todo =()=>{
  const { loading, data, error } = useSelector((store)=> store.todos); 
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [startDate, setStartDate] = useState(null)

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    dispatch(getTodoLoading());
    axios
      .get("http://localhost:3001/todos")
      .then(({ data }) => {
        dispatch(getTodoSuccess(data));
      })
      .catch(() => {
        dispatch(error)
      });
  };

  const handleAddTodo =()=>{
    let selectDate = new Date(startDate);
    selectDate= `${selectDate.getDate()}-${selectDate.getMonth()+1}-${selectDate.getFullYear()} ${selectDate.getHours()}:${selectDate.getMinutes()}`

    dispatch(addTodoLoading());
    axios
    .post("http://localhost:3001/todos", {
      title: text,
      date: selectDate,
      status: false,
      id: Date.now()
    })
    .then(() => {
      // console.log(text)
        setText("")
        setStartDate(null)
        dispatch(addTodoSuccess());
        getTodos();
    })
    .catch(() => {
      dispatch(error)
    });
  }
  
  const handleDelete =(id)=>{
  axios
    .delete(`http://localhost:3001/todos/${id}`, {
      title: text,
      status: true,
      id: Date.now()
    })
    .then(() => {
      dispatch(delTodo(id));
      getTodos();
    })
    .catch(() => {
      dispatch(error)
    });
 }

  return loading ? (
    "Loading...."
  ) : (
    <>
    <input placeholder="Add Todo" value={text} type="text" onChange={(e)=>{setText(e.target.value)}} />
      <DatePicker
      placeholderText="Enter Date"
      selected={startDate}
      onChange={date=> setStartDate(date)}
      showTimeSelect
      showTimeInput
      dateFormat="dd/MM/yyyy"
      />
      <button disabled={!text || !startDate}
        onClick={handleAddTodo}>Add todo</button>
     
        {data.map((e) => (
          <Table key={e.id}>
          <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Mark</th>
              </tr>
              </thead>
              <tbody>
              <tr>
              <td>{e.title}</td>
              <td>{e.date}</td>
              <td><button onClick={()=>{handleDelete(e.id)}}>Mark as done</button></td>
               </tr>
              </tbody>
          </Table>
        ))}
    </>
  );
}