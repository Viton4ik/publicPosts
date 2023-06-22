import React, {Component} from "react";
import PostService from "./PostService";

const postService = new PostService(); //Интерфейс запросов и ответов для сервера

export default class Posts extends Component {
    /* eslint-disable */
    
    // конструктор 
    constructor(props){
        super(props)
        this.state = {
            data : [],      // В поле data будем подгружать посты.
            inputValue: ''  // В поле inputValue будем хранить введенный пост.
        }
    
        this.handleChange = this.handleChange.bind(this);  
        this.handleSubmit = this.handleSubmit.bind(this);  
    }

    //событие, выполняющееся, когда изменили поле ввода.
    handleChange(event) {
    	this.setState({inputValue: event.target.value});
	}

    //событие нажатия на клавишу подтверждения отправки поста
	handleSubmit(event) {
    	postService.createPost({'text' : this.state.inputValue});
    	this.getData()
    	this.setState({inputValue : ''})
    }
    
    // метод класса для получения данных с сервера, обработка события подключения компонента, в котором сразу и выполняем функцию загрузки данных
    getData(){
        postService.getPosts().then(result => {
            this.setState({data: result.data})
            })
    }
    
    componentDidMount(){
        this.getData()
    }

    //функция для лайка
    setLike(post) {
        postService.setLikePost(post.id)
        post.likesCount += 1
        this.forceUpdate()    
    }

    // Циклично загружаем все посты, попутно добавляя функции по нажатию кнопок Like, передавая в качестве аргумента итерируемый объект post. Еще сразу добавляем прописанные события по вводу нового поста.
    // Если поля ввода меняется, сразу присваиваем его inputValue. По нажатию подтверждения отправляем inputValue в функцию createPost(). Подгружаем посты заново и ставим поле ввода пустым.
    render() {
        return (
            <div id = 'posts'>
            {this.state.data.map(post =>
                <div id = {'post_' + post.id}>
                    <p> {post.text} </p>
                    <button onClick={() => this.setLike(post)}>  {post.likesCount}</button>
                    <p> Date : {post.date}</p>
                    <hr/>
                </div>
            )}
            <input type='text' onChange={this.handleChange} value={this.state.inputValue}></input><button onClick={this.handleSubmit}>Send</button>
            </div>
            )
    }

}