export class Note {
    id!:number;
    title!:string; //brief description
    body!:string; //object context
    media!:string; //optional associated media with the note such as images or video.
    status!:string; //marked as done if set otherwise marked as “todo”
    created!:string; //ISO 8601 date of creation
    edited!:string; //ISO 8601 date of edition if applicable
    deleted!:boolean; //status field which signifies wether note has been deleted
    list!:string;
    owner!:number; //object creator
}
