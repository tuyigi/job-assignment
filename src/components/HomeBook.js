import React,{useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles,useTheme } from '@material-ui/core/styles';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';


import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import load from "../images/loader.gif";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as book from "../utils/book";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    paperSearch:{
      padding: '2px 4px',
      display: 'flex',
      marginTop:'20px',
      alignItems: 'center',
      width: '100%',
    },input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    card: {
      display: 'flex',
    }, details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },


    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    item:{
      float:"left",
    },
    dividerH: {
      height: 1,
      margin: 4,
    },
  }));


function HomeBook(){
  const theme = useTheme();
    const classes = useStyles();
    const [books,setBooks]=useState([]);

    /// get initial or defaulty book 
const [isLoading,setIsLoading]=useState(false);
    useEffect(()=>{
      setIsLoading(true);
      book.initialBookList().then(response=>{


        console.log(response['items'][0]['volumeInfo']);


        // set result from api to our book state 
        setIsLoading(false);
        setBooks(response['items']);
        
      });
    },[]);

    // get details of a book
    const [title,setTitle]=useState("");
    const [authors,setAuthor]=useState([]);
    const [publishedDate,setPublisheddate]=useState(0);
    const [category,setCategory]=useState([]);
    const [version,setVersion]=useState("");
    const [thumbnail,setThumbnail]=useState("");
    const [publisher,setPublisher]=useState("");
    const [description,setDescription]=useState("");
    const [language,setLanguage]=useState("");




    const getDetails=(id)=>{
      
      // filter a specific book and assign it to the state 
      var b=book.getBookDetails(id,books);
      console.log(b);

      b.map((book)=>{
        setTitle(book['volumeInfo']['title']);
        setAuthor(book['volumeInfo']['authors']);
        setPublisher(book['volumeInfo']['publisher'])
        setPublisheddate(book['volumeInfo']);
        setDescription(book['volumeInfo']['description']);
        setCategory(book['volumeInfo']['categories']);
        setLanguage(book['volumeInfo']['language']);
        setVersion(book['volumeInfo']['contentVersion']);
        setThumbnail(book['volumeInfo']['imageLinks']['thumbnail']);
      });
      

      

      // pop up

      setDialogstatus(true);

    };
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [dialogStatus,setDialogstatus]=useState(false);
    const cancelDialog=()=>{
      setDialogstatus(false);
    }

    const [expanded, setExpanded] =useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };


    //// search book 

    const [searchBook,setSearchbook]=useState("");

    const search=()=>{
      setIsLoading(true);
      book.searchBook(searchBook).then(response=>{
        
        setBooks([]);
      // set result from search to state 

      
      setBooks(response['items']);
      setIsLoading(false);
      console.log(response);
      })
    }



    return(
<div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         <MenuBookIcon /> 
          <Typography  variant="h6" noWrap>
            Book Library
          </Typography>
          
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        
        {/* search input field */}

     <center>
        <div className="col-md-6">
        <Paper component="form" className={classes.paperSearch}>
      
      <InputBase
      onChange={(e)=>{setSearchbook(e.target.value)}}
        className={classes.input}
        placeholder="Search a book"
      />
      <IconButton onClick={()=>{search()}} type="button" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
        </div>

{/* end of search input */}

<br/>

{/* defaulty list of books */}

     <div className="col-md-6">
{isLoading?<center><img src={load} width="80px" height="80px"/></center>:
<div>{
books.map((d)=>{
return (
<div onClick={()=>{getDetails(d['id'])}}>
  <table width="100%">
    <tr>
      <td rowspan="3" width="10%">
      <img  src={d['volumeInfo']['imageLinks']['smallThumbnail']} width="50" heigh="120px" />
      </td>
      <td style={{float:"left"}} width="90%">
      <font color="grey" style={{fontSize:"14px"}}>{d['volumeInfo']['title']}</font>
      </td>
    </tr>
    <tr><td><div style={{float:"left"}}><font style={{fontSize:"12px"}}>Company: {d['volumeInfo']['publisher']}</font></div></td></tr>
    <tr><td><font style={{fontSize:"12px"}}>Author:{d['volumeInfo']['authors']?d['volumeInfo']['authors'].map((a)=>{ return (<font>{a}</font>)}):null}</font></td></tr>
  </table>

      <Divider className={classes.dividerH} orientation="horizontal" />

</div>);
})
} </div>}

    </div>   
        


      </center>




  {/* dialog to display all info of a book */}


  <Dialog 
  
      open={dialogStatus} 
      TransitionComponent={Transition}
      keepMounted

      fullScreen={fullScreen}
      onClose={cancelDialog} 
      aria-labelledby="form-dialog-title">

{dialogStatus?(
  <div style={{backgroundColor:"#E6E8F5"}}>
<DialogTitle id="form-dialog-title"><h6 style={{color:"#202A59"}}>Book details</h6></DialogTitle>
            
          <DialogContent>
          <table width="100%">
    <tr>
      <td rowspan="3" width="10%">
      <img  src={thumbnail} width="50" heigh="120px" />
      </td>
      <td style={{float:"left"}} width="90%">
      <font color="grey" style={{fontSize:"14px"}}>{title}</font>
      </td>
    </tr>
    <tr><td><div style={{float:"left"}}><font style={{fontSize:"12px"}}>Company: {publisher}</font></div></td></tr>
    <tr><td><font style={{fontSize:"12px"}}>Author:{authors?<font>{authors.map((a)=>{ return (<font>{a},</font>)})}</font>:null}</font></td></tr>
  </table>
  <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Language</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {language}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Category</Typography>
         
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
{category.map((c)=>{return(<font>{c}</font>)})}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Version</Typography>
         
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
           {version}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Description</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
           {description}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
          </DialogContent> 
          </div>  
          
          ):null}

</Dialog>
       
      </div>
      </div>

    );
}
export default HomeBook