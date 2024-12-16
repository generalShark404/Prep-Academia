import Notes from "./Note";
import { useParams } from "react-router-dom";

export default function SendNotes(){
   return{
    chapter_id: useParams().chapter_id,
    note_id: useParams().note_id
   }
}