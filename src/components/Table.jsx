import styled from "styled-components"

export const Table = styled.table`
border:3px solid black;
width:50%;
margin:auto;
margin-top:10px;
margin-bottom:10px;
font-weight:400;
/* border-collapse: collapse; */


& thead > tr > th{
    padding: 5px 0;
    color:white;
    background:black;
}

& thead > tr > th:nth-child(3){
    width: 10%
}
& thead > tr > th:nth-child(2){
    width: 23%
}

& tbody > tr > td{
    text-align: center;
    background: #00203b;
    color: white;
}

& tbody > tr:hover{
    font-weight:bold;
}

`