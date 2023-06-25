import React, {Component} from "react";
import PostService from "./PostService";

import "../styles/Post.css";

const postService = new PostService(); //Интерфейс запросов и ответов для сервера

export default class Posts extends Component {
    
    // конструктор 
    constructor(props) {
        super(props)
        this.state = {
            data: [],      // В поле data будем подгружать посты.
            inputValue: ''  // В поле inputValue будем хранить введенный пост.
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //событие, выполняющееся, когда изменили поле ввода.
    handleChange(event) {
        this.setState({ inputValue: event.target.value });
    }

    //событие нажатия на клавишу подтверждения отправки поста
    // handleSubmit(event) {
    // 	postService.createPost({'text' : this.state.inputValue});
    // 	this.getData()
    //     this.setState({ inputValue: '' })
    // }
    
    handleSubmit(event) {
        // event.preventDefault(); // предотвращаем обновление страницы по умолчанию
        postService.createPost({ text: this.state.inputValue })
            .then(() => {
                this.getData();
                this.setState({ inputValue: '' });
            })
            .catch((error) => {
            });
    }
    
    // метод класса для получения данных с сервера, обработка события подключения компонента, в котором сразу и выполняем функцию загрузки данных
    getData() {
        postService.getPosts().then(result => {
            this.setState({ data: result.data })
            // this.setState({ data: result.results })
            // console.log('data:', result.results)
        })
    }
    
    componentDidMount() {
        this.getData()
        
    }

    //функция для лайка
    setLike(post) {
        postService.setLikePost(post.id)
        post.likesCount += 1
        this.forceUpdate()
    }

    //функция для delete post
    // deletePost(post) {
    //     postService.deletePost(post.id)
    //     this.forceUpdate()    
    // }

    deletePost(post) {
        postService.deletePost(post.id)
            .then(() => {
                this.getData();
            })
            .catch((error) => {
            });
    }

    // Циклично загружаем все посты, попутно добавляя функции по нажатию кнопок Like, передавая в качестве аргумента итерируемый объект post. Еще сразу добавляем прописанные события по вводу нового поста.
    // Если поля ввода меняется, сразу присваиваем его inputValue. По нажатию подтверждения отправляем inputValue в функцию createPost(). Подгружаем посты заново и ставим поле ввода пустым.

    render() {
        return (
            <div id="posts" className="messenger-container">
                <div className="message-list">
                    {this.state.data.map((post) => (
                        <div key={post.id} id={"post_" + post.id} className="message-item">
                            <p className="message-text">{post.text}</p>
                            <div className="message-meta">
                                <span className="message-date">{new Date(post.date).toLocaleTimeString()} {new Date(post.date).toLocaleDateString()}</span>
                                {/* new Date(createTime).toLocaleString() */}
                                {/* <span className="message-date">
                                {new Intl.DateTimeFormat('ru-RU', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                }).format(new Date(post.date))}
                                </span> */}
                                <button className="message-like-btn" onClick={() => this.setLike(post)}>
                                    <i className="fa fa-thumbs-up"></i> 🤙 {post.likesCount}
                                </button>

                            </div>
                            <button className="message-delete-btn" onClick={() => this.deletePost(post)}>
                                    <i className="fa fa-trash"></i> Delete post
                            </button>
                        </div>
                    ))}
                </div>
                <div className="message-input-container">
                    <input
                        type="text"
                        className="message-input"
                        placeholder="Type your message..."
                        onChange={this.handleChange}
                        value={this.state.inputValue}
                    />
                    <button className="send-btn" onClick={this.handleSubmit}>
                        Send
                    </button>
                </div>
            </div>
        );
    }
}