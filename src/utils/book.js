let url = 'https://www.googleapis.com/books/v1';
let apiKey="AIzaSyDNK3unc0jh-OEpvYgxWqneSyD3mXI455U";


/// get initial or default list of books


export function initialBookList(){
    return fetch("https://www.googleapis.com/books/v1/volumes?q=flo",{
        method:"GET",
        headers:{'Content-Type': 'application/json',
        'Accept': 'application/json'}
    }
    ).then(res=>{
        return res.json();
    });
}


/// search a particular book you want by title

export function searchBook(searchBook){
    return fetch(url+"/volumes?q="+searchBook+"+intitle&key="+apiKey,{
        method:"GET",
        headers:{'content-type': 'application/json;charset=UTF-8'}
    }).then(res=>{
        return res.json();
    });
}


/// get full details of a book


export function getBookDetails(id,books){


    return books.filter(function (b) {
        return b.id == id;
      });
}



